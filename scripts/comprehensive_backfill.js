/**
 * comprehensive_backfill.js
 * Translates ALL missing keys for every language. Saves after each batch.
 * Usage: node scripts/comprehensive_backfill.js
 */
const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const I18N_DIR = path.join(ROOT, 'src', 'lib', 'i18n');
const GROQ_KEY = "gsk_YOUR_GROQ_API_KEY_HERE";

const MODEL_FAST = "llama-3.1-8b-instant";
const MODEL_STRONG = "llama-3.3-70b-versatile";

// Non-Latin scripts - skip very long prose (use EN fallback, i18next handles it)
const NON_LATIN = new Set(["am", "ar", "zh", "ru"]);

// Keys too long for non-Latin (prose paragraphs)
const SKIP_FOR_NON_LATIN = [
  /\.longDescription$/,
  /\.itinerary\.\d+\.details$/,
  /about\.story\.content$/,
  /about\.mission\.content$/,
  /about\.values\.v\d+\.content$/,
  /about\.whyEthiopia\.content$/,
  /privacy\.(content|sections\.\d+\.content)$/,
  /terms\.(content|sections\.\d+\.content)$/,
];

function isSkippableForNonLatin(key) {
  return SKIP_FOR_NON_LATIN.some(p => p.test(key));
}

// --- TS File parser ---
function readTS(filePath, varName) {
  if (!fs.existsSync(filePath)) return {};
  let raw = fs.readFileSync(filePath, 'utf8');
  raw = raw.replace(/\/\*[\s\S]*?\*\//g, '').replace(/\/\/.*/g, '');
  raw = raw.replace(new RegExp(`^\\s*const\\s+${varName}\\s*=\\s*`), '').trim();
  raw = raw.replace(new RegExp(`\\s*export\\s+default\\s+${varName}\\s*;?\\s*$`), '').trim();
  if (raw.endsWith(';')) raw = raw.slice(0, -1);
  try { return new Function('return ' + raw)(); }
  catch (e) { console.error(`  Parse error in ${path.basename(filePath)}: ${e.message.slice(0, 80)}`); return {}; }
}

// --- TS serialiser ---
function toTS(obj, indent = 0) {
  const pad = '  '.repeat(indent);
  const inner = '  '.repeat(indent + 1);
  if (Array.isArray(obj)) {
    if (!obj.length) return '[]';
    const items = obj.map(v => {
      if (typeof v === 'string') return `${inner}${JSON.stringify(v)}`;
      if (typeof v === 'object' && v !== null) {
        const fields = Object.entries(v).map(([k, val]) => {
          const key = /^[a-zA-Z_$][a-zA-Z0-9_$]*$/.test(k) ? k : JSON.stringify(k);
          return `${inner}  ${key}: ${JSON.stringify(val)},`;
        }).join('\n');
        return `${inner}{\n${fields}\n${inner}}`;
      }
      return `${inner}${JSON.stringify(v)}`;
    }).join(',\n');
    return `[\n${items},\n${pad}]`;
  }
  if (obj !== null && typeof obj === 'object') {
    const entries = Object.entries(obj).map(([k, v]) => {
      const key = /^[a-zA-Z_$][a-zA-Z0-9_$]*$/.test(k) ? k : JSON.stringify(k);
      return `${inner}${key}: ${toTS(v, indent + 1)},`;
    }).join('\n');
    return `{\n${entries}\n${pad}}`;
  }
  return JSON.stringify(obj);
}

// --- Flatten to leaf key→value ---
function flatten(obj, prefix = '', out = {}) {
  if (Array.isArray(obj)) {
    obj.forEach((v, i) => flatten(v, `${prefix}.${i}`, out));
  } else if (obj !== null && typeof obj === 'object') {
    for (const k of Object.keys(obj)) flatten(obj[k], prefix ? `${prefix}.${k}` : k, out);
  } else {
    out[prefix] = obj;
  }
  return out;
}

// --- Set by dotted path ---
function setPath(obj, dotPath, value) {
  const parts = dotPath.split('.');
  let cur = obj;
  for (let i = 0; i < parts.length - 1; i++) {
    const p = parts[i];
    const next = parts[i + 1];
    if (/^\d+$/.test(next)) {
      if (!Array.isArray(cur[p])) cur[p] = [];
    } else {
      if (typeof cur[p] !== 'object' || cur[p] === null) cur[p] = {};
    }
    cur = cur[p];
  }
  cur[parts[parts.length - 1]] = value;
}

// --- Find keys that need translation ---
function needsTranslation(enVal, langVal) {
  if (langVal === undefined || langVal === null) return true;
  if (typeof enVal === 'string' && typeof langVal === 'string') {
    if (enVal.trim() !== langVal.trim()) return false; // already translated
    // Same as EN — check if it should be different
    if (!enVal.trim()) return false;
    if (enVal.length <= 3) return false;
    if (/^[0-9+%\-$€]+$/.test(enVal.trim())) return false;
    if (enVal.startsWith('http') || enVal.startsWith('/') || enVal.includes('@')) return false;
    return true; // looks like it needs translation
  }
  return false;
}

const sleep = ms => new Promise(r => setTimeout(r, ms));

// --- Groq call with retry ---
async function groqTranslate(chunk, langCode, langName, useLongModel) {
  const model = useLongModel ? MODEL_STRONG : MODEL_FAST;
  const maxTok = useLongModel ? 4096 : 1500;
  const system = `You are a professional travel translator. Translate the JSON values (not keys) from English to ${langName}.
Preserve all placeholders like {{count}}, {{query}}, \\n\\n, and bullet characters (•) exactly.
Return ONLY valid JSON with the same keys, no markdown fences, no explanations.`;

  const body = JSON.stringify({
    model, temperature: 0.1, max_tokens: maxTok,
    response_format: { type: 'json_object' },
    messages: [
      { role: 'system', content: system },
      { role: 'user', content: `Translate ALL values to ${langName} (${langCode}):\n${JSON.stringify(chunk, null, 2)}` }
    ]
  });

  let retries = 4;
  while (retries-- > 0) {
    try {
      const res = await fetch('https://api.groq.com/openai/v1/chat/completions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${GROQ_KEY}` },
        body
      });
      if (res.status === 429) {
        const secs = parseInt(res.headers.get('retry-after') || '25', 10);
        console.log(`    ⏳ Rate limit 429. Sleeping ${secs}s...`);
        await sleep(secs * 1000 + 2000);
        continue;
      }
      if (!res.ok) {
        const text = await res.text();
        throw new Error(`HTTP ${res.status}: ${text.slice(0, 100)}`);
      }
      const data = await res.json();
      const raw = data.choices[0].message.content.trim();
      const cleaned = raw.replace(/^```(?:json)?\s*/i, '').replace(/\s*```\s*$/, '').trim();
      try { return JSON.parse(cleaned); }
      catch {
        const m = cleaned.match(/\{[\s\S]*\}/);
        if (m) { try { return JSON.parse(m[0]); } catch {} }
        throw new Error('Bad JSON response');
      }
    } catch (e) {
      console.log(`    ✗ Error (${retries} retries left): ${e.message.slice(0, 80)}`);
      if (retries > 0) await sleep(6000);
    }
  }
  return null; // Fall back to English
}

// --- Main ---
const LANGS = [
  { code: 'es', name: 'Spanish' },
  { code: 'fr', name: 'French' },
  { code: 'pt', name: 'Portuguese (Brazilian)' },
  { code: 'it', name: 'Italian' },
  { code: 'tr', name: 'Turkish' },
  { code: 'nl', name: 'Dutch' },
  { code: 'pl', name: 'Polish' },
  { code: 'ru', name: 'Russian' },
  { code: 'am', name: 'Amharic' },
  { code: 'ar', name: 'Arabic' },
  { code: 'zh', name: 'Simplified Chinese' },
];

async function main() {
  const enObj = readTS(path.join(I18N_DIR, 'en.ts'), 'en');
  const enFlat = flatten(enObj);
  console.log(`English leaf keys: ${Object.keys(enFlat).length}\n`);

  for (const { code, name } of LANGS) {
    console.log(`\n${'='.repeat(50)}`);
    console.log(`  ${name} (${code})`);
    console.log(`${'='.repeat(50)}`);

    const langPath = path.join(I18N_DIR, `${code}.ts`);
    const langObj = readTS(langPath, code);
    const langFlat = flatten(langObj);

    const isNonLatin = NON_LATIN.has(code);

    // Find all keys that need translation
    const missingKeys = Object.keys(enFlat).filter(k => {
      const enVal = enFlat[k];
      const langVal = langFlat[k];
      if (typeof enVal !== 'string') return false;
      if (isNonLatin && isSkippableForNonLatin(k)) return false;
      return needsTranslation(enVal, langVal);
    });

    const skipped = isNonLatin
      ? Object.keys(enFlat).filter(k => typeof enFlat[k] === 'string' && isSkippableForNonLatin(k)).length
      : 0;

    console.log(`  To translate: ${missingKeys.length} | Skipped (EN fallback): ${skipped}`);
    if (missingKeys.length === 0) { console.log('  ✓ Already complete!'); continue; }

    // Build batches — group by namespace for coherent context
    // Batch sizes: 20 for short keys, 1 for very long prose
    const LONG_PATTERNS = [/\.longDescription$/, /privacy\.sections/, /terms\.sections/, /about\.story/, /about\.mission/, /about\.values/];
    const isLong = k => LONG_PATTERNS.some(p => p.test(k));

    const shortKeys = missingKeys.filter(k => !isLong(k));
    const longKeys = missingKeys.filter(k => isLong(k));

    const batches = [];
    // Short key batches: 20 per batch
    for (let i = 0; i < shortKeys.length; i += 20) {
      const slice = shortKeys.slice(i, i + 20);
      const chunk = {};
      slice.forEach(k => { chunk[k] = enFlat[k]; });
      batches.push({ chunk, isLong: false });
    }
    // Long key batches: 1 per batch
    for (const k of longKeys) {
      batches.push({ chunk: { [k]: enFlat[k] }, isLong: true });
    }

    console.log(`  Batches: ${batches.length} (${shortKeys.length} short + ${longKeys.length} long)\n`);

    let translated = 0;
    let fallbacks = 0;

    for (let i = 0; i < batches.length; i++) {
      const { chunk, isLong: isLongBatch } = batches[i];
      const keyCount = Object.keys(chunk).length;
      process.stdout.write(`  [${code}] Batch ${i + 1}/${batches.length} (${keyCount} keys)... `);

      const result = await groqTranslate(chunk, code, name, isLongBatch);

      if (result) {
        for (const [k, v] of Object.entries(result)) {
          if (typeof v === 'string' && v.trim()) {
            setPath(langObj, k, v);
            translated++;
          }
        }
        process.stdout.write('✓\n');
      } else {
        // English fallback — copy EN values
        for (const [k, v] of Object.entries(chunk)) {
          setPath(langObj, k, v);
          fallbacks++;
        }
        process.stdout.write('✗ (EN fallback)\n');
      }

      // Save after every batch
      fs.writeFileSync(langPath, `const ${code} = ${toTS(langObj, 0)};\n\nexport default ${code};\n`, 'utf8');

      // Pause between batches to respect rate limits
      await sleep(isLongBatch ? 4000 : 2500);
    }

    console.log(`\n  ✓ ${name} done: ${translated} translated, ${fallbacks} fell back to English.`);
  }

  console.log('\n\n=== ALL TRANSLATIONS COMPLETE ===');
  console.log('Run: node scripts/audit_missing.js  — to verify');
}

main().catch(e => { console.error('Fatal:', e); process.exit(1); });
