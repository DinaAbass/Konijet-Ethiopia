const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const I18N_DIR = path.join(ROOT, 'src', 'lib', 'i18n');
const GROQ_KEY = "gsk_YOUR_GROQ_API_KEY_HERE";

// Two model tiers: fast 8b for short, 70b for complex
const MODEL_SHORT = "llama-3.1-8b-instant";
const MODEL_LONG  = "llama-3.3-70b-versatile";

// Non-Latin scripts expand heavily - skip long prose to avoid token overflow
// i18next fallbackLng:"en" means missing keys show English automatically
const NON_LATIN = new Set(["am", "ar", "zh", "ru"]);

// Keys whose values tend to be very long paragraphs (> 200 chars in English)
const LONG_KEY_PATTERNS = [
  /\.longDescription$/,
  /\.itinerary\.\d+\.details$/,
  /about\.story\.content$/,
  /privacy\.content$/,
  /terms\.content$/,
  /privacy\.sections\.\d+\.content$/,
  /terms\.sections\.\d+\.content$/,
  /about\.whyEthiopia\.content$/,
  /about\.mission\.content$/,
  /about\.values\.v\d+\.content$/,
];

function isLongKey(key) {
  return LONG_KEY_PATTERNS.some(p => p.test(key));
}

function readTS(filePath, name) {
  if (!fs.existsSync(filePath)) return {};
  const raw = fs.readFileSync(filePath, 'utf8');
  const clean = raw
    .replace(new RegExp(`const\\s+${name}\\s*=\\s*`), '')
    .replace(new RegExp(`export\\s+default\\s+${name}\\s*;?\\s*$`), '')
    .trim()
    .replace(/;$/, '');
  try { return new Function(`return ${clean}`)(); }
  catch (e) { console.error(`Parse error in ${filePath}:`, e.message); return {}; }
}

function objectToTSString(obj, indent = 0) {
  const pad = "  ".repeat(indent);
  const padInner = "  ".repeat(indent + 1);
  if (Array.isArray(obj)) {
    if (obj.length === 0) return "[]";
    const items = obj.map(item => {
      if (typeof item === "string") return `${padInner}${JSON.stringify(item)}`;
      if (typeof item === "object" && item !== null) {
        const inner = Object.entries(item).map(([k,v]) => {
          const key = /^[a-zA-Z_$][a-zA-Z0-9_$]*$/.test(k) ? k : JSON.stringify(k);
          return `${padInner}  ${key}: ${JSON.stringify(v)},`;
        }).join("\n");
        return `${padInner}{\n${inner}\n${padInner}}`;
      }
      return `${padInner}${JSON.stringify(item)}`;
    }).join(",\n");
    return `[\n${items},\n${pad}]`;
  }
  if (typeof obj === "object" && obj !== null) {
    const entries = Object.entries(obj).map(([k, v]) => {
      const key = /^[a-zA-Z_$][a-zA-Z0-9_$]*$/.test(k) ? k : JSON.stringify(k);
      return `${padInner}${key}: ${objectToTSString(v, indent + 1)},`;
    }).join("\n");
    return `{\n${entries}\n${pad}}`;
  }
  return JSON.stringify(obj);
}

function needsTranslation(enVal, langVal, pathStr) {
  if (langVal === undefined) return true;
  if (typeof enVal === 'string' && typeof langVal === 'string') {
    if (enVal.trim() === langVal.trim()) {
      const hasLetters   = /[a-zA-Z]/.test(enVal);
      const isShort      = enVal.length <= 4 && !/\s/.test(enVal);
      const isEmail      = enVal.includes('@');
      const isUrl        = enVal.startsWith('http') || enVal.startsWith('/');
      const isNum        = /^[0-9+%\-]+$/.test(enVal.trim());
      const isProperNoun = ['Addis Ababa','Lalibela','Gondar','Axum','Bahir Dar','Mekelle',
        'Dire Dawa','Harar','Awassa','Jinka','Arba Minch','Sudan','South Sudan','Eritrea',
        'Djibouti','Somalia','Kenya','Sheraton','Hyatt Regency','Hilton','Radisson Blu',
        'Golden Tulip','USD','EUR','GBP'].includes(enVal.trim());
      if (hasLetters && !isShort && !isEmail && !isUrl && !isNum && !isProperNoun) return true;
    }
  }
  return false;
}

function flattenObject(enVal, langVal, pathStr = "", out = {}) {
  if (Array.isArray(enVal)) {
    enVal.forEach((item, idx) =>
      flattenObject(item, langVal?.[idx], pathStr ? `${pathStr}.${idx}` : `${idx}`, out));
  } else if (enVal !== null && typeof enVal === 'object') {
    for (const k in enVal)
      flattenObject(enVal[k], langVal?.[k], pathStr ? `${pathStr}.${k}` : k, out);
  } else {
    if (needsTranslation(enVal, langVal, pathStr)) out[pathStr] = enVal;
  }
  return out;
}

function setByPath(obj, pathStr, value) {
  const parts = pathStr.split(".");
  let cur = obj;
  for (let i = 0; i < parts.length - 1; i++) {
    const p = parts[i], next = parts[i+1];
    if (/^\d+$/.test(next)) {
      if (!Array.isArray(cur[p])) cur[p] = [];
    } else {
      if (!cur[p] || typeof cur[p] !== 'object') cur[p] = {};
    }
    cur = cur[p];
  }
  cur[parts[parts.length - 1]] = value;
}

async function groqTranslate(chunkObj, langCode, langName, isLong) {
  const model    = isLong ? MODEL_LONG : MODEL_SHORT;
  const maxTok   = isLong ? 4000 : 1200;
  const system = `You are a professional travel & tourism translator. Translate the JSON values (not keys) from English to ${langName}.
Preserve all placeholders like {{count}}, {{query}}, \\n\\n, and bullet points (•) exactly.
Return ONLY valid JSON, no markdown fences, no explanations.`;

  const body = JSON.stringify({
    model, temperature: 0.15, max_tokens: maxTok,
    response_format: { type: "json_object" },
    messages: [
      { role: "system", content: system },
      { role: "user", content: `Translate to ${langName} (${langCode}):\n${JSON.stringify(chunkObj, null, 2)}` }
    ]
  });

  let retries = 4;
  while (retries-- > 0) {
    try {
      const res = await fetch("https://api.groq.com/openai/v1/chat/completions", {
        method: "POST",
        headers: { "Content-Type": "application/json", "Authorization": `Bearer ${GROQ_KEY}` },
        body
      });
      if (res.status === 429) {
        console.error(`  ✗ Rate limit 429 (${retries} left). Sleeping 20s...`);
        await sleep(20000);
        continue;
      }
      if (!res.ok) throw new Error(`Groq ${res.status}: ${await res.text()}`);
      const data = await res.json();
      return data.choices[0].message.content.trim();
    } catch (e) {
      console.error(`  ✗ Error (${retries} left): ${e.message.slice(0, 120)}`);
      if (retries > 0) await sleep(8000);
    }
  }
  return null;
}

function parseGroq(raw) {
  if (!raw) return null;
  const cleaned = raw.replace(/^```(?:json)?\s*/i, "").replace(/\s*```\s*$/, "").trim();
  try { return JSON.parse(cleaned); } catch {}
  const m = cleaned.match(/\{[\s\S]*\}/);
  if (m) { try { return JSON.parse(m[0]); } catch {} }
  return null;
}

const sleep = ms => new Promise(r => setTimeout(r, ms));

const LANGS = [
  { code: "am", name: "Amharic" },
  { code: "ar", name: "Arabic" },
  { code: "zh", name: "Simplified Chinese (Mandarin)" },
  { code: "ru", name: "Russian" },
  { code: "es", name: "Spanish" },
  { code: "fr", name: "French" },
  { code: "pt", name: "Portuguese (Brazilian)" },
  { code: "it", name: "Italian" },
  { code: "tr", name: "Turkish" },
  { code: "nl", name: "Dutch" },
  { code: "pl", name: "Polish" },
];

async function main() {
  const enObj = readTS(path.join(I18N_DIR, "en.ts"), 'en');

  for (const { code, name } of LANGS) {
    console.log(`\n=== ${name} (${code}) ===`);
    const langPath = path.join(I18N_DIR, `${code}.ts`);
    const langObj  = readTS(langPath, code);

    const allFlat  = flattenObject(enObj, langObj);
    const isNonLatin = NON_LATIN.has(code);

    // Tier 1: short/essential keys (always translate)
    // Tier 2: long prose keys (only for Latin-script languages)
    const shortKeys = Object.keys(allFlat).filter(k => !isLongKey(k));
    const longKeys  = isNonLatin ? [] : Object.keys(allFlat).filter(k => isLongKey(k));

    const skipped = isNonLatin ? Object.keys(allFlat).filter(k => isLongKey(k)).length : 0;
    console.log(`  Short: ${shortKeys.length} | Long: ${longKeys.length} | Skipped (EN fallback): ${skipped}`);

    if (shortKeys.length === 0 && longKeys.length === 0) {
      console.log(`  ✓ Already complete!`); continue;
    }

    // Build batches: 10 keys for short, 1 key for long
    const batches = [];
    let cur = {}, curLen = 0;
    for (const k of shortKeys) {
      const v = allFlat[k];
      if (Object.keys(cur).length >= 10 || curLen + v.length > 600) {
        if (Object.keys(cur).length) batches.push({ keys: cur, isLong: false });
        cur = {}; curLen = 0;
      }
      cur[k] = v; curLen += v.length;
    }
    if (Object.keys(cur).length) batches.push({ keys: cur, isLong: false });

    for (const k of longKeys) {
      batches.push({ keys: { [k]: allFlat[k] }, isLong: true });
    }

    console.log(`  ${batches.length} batches to process...`);
    let done = 0;

    for (let i = 0; i < batches.length; i++) {
      const { keys, isLong } = batches[i];
      const keyList = Object.keys(keys);
      process.stdout.write(`  [${code}] ${i+1}/${batches.length} (${keyList.length} keys)... `);

      const raw    = await groqTranslate(keys, code, name, isLong);
      const parsed = parseGroq(raw);

      if (parsed) {
        for (const [k, v] of Object.entries(parsed)) setByPath(langObj, k, v);
        done += keyList.length;
        console.log(`✓`);
      } else {
        // English fallback for failed batches
        for (const [k, v] of Object.entries(keys)) setByPath(langObj, k, v);
        console.log(`✗ (EN fallback)`);
      }

      // Save progress after every batch
      fs.writeFileSync(langPath, `const ${code} = ${objectToTSString(langObj, 0)};\n\nexport default ${code};\n`, "utf8");

      // Rate limit: 3s for short batches, 5s for long
      await sleep(isLong ? 5000 : 3000);
    }

    console.log(`  ✓ Done ${name}: ${done} translated, ${skipped} fell back to English.`);
  }

  console.log("\n=== ALL TRANSLATIONS COMPLETE ===");
}

main().catch(e => { console.error("Fatal:", e); process.exit(1); });
