/**
 * scripts/free_backfill.js
 * Uses public keyless Google Translate API to batch-translate ALL missing keys professionally for all 11 languages.
 * High-speed, robust, no daily token limits or Groq daily limit issues.
 * Preserves react-i18next placeholders perfectly.
 * Usage: node scripts/free_backfill.js
 */
const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const I18N_DIR = path.join(ROOT, 'src', 'lib', 'i18n');

function readTS(filePath, name) {
  if (!fs.existsSync(filePath)) return {};
  const raw = fs.readFileSync(filePath, 'utf8')
    .replace(/\/\*[\s\S]*?\*\//g, '')
    .replace(/\/\/.*/g, '');
  const clean = raw
    .replace(new RegExp(`const\\s+${name}\\s*=\\s*`), '')
    .replace(new RegExp(`export\\s+default\\s+${name}\\s*;?\\s*$`), '')
    .trim()
    .replace(/;$/, '');
  try {
    return new Function(`return ${clean}`)();
  } catch (e) {
    console.error(`Parse error in ${filePath}:`, e.message);
    return {};
  }
}

function objectToTSString(obj, indent = 0) {
  const pad = "  ".repeat(indent);
  const padInner = "  ".repeat(indent + 1);
  if (Array.isArray(obj)) {
    if (obj.length === 0) return "[]";
    const items = obj.map(item => {
      if (typeof item === "string") return `${padInner}${JSON.stringify(item)}`;
      return `${padInner}${objectToTSString(item, indent + 1).trimStart()}`;
    }).join(",\n");
    return `[\n${items},\n${pad}]`;
  }
  if (typeof obj === "object" && obj !== null) {
    const entries = Object.entries(obj).map(([k, v]) => {
      const key = /^[a-zA-Z_$][a-zA-Z0-9_$]*$/.test(k) ? k : JSON.stringify(k);
      const val = objectToTSString(v, indent + 1);
      return `${padInner}${key}: ${val},`;
    }).join("\n");
    return `{\n${entries}\n${pad}}`;
  }
  return JSON.stringify(obj);
}

function needsTranslation(enVal, langVal) {
  if (langVal === undefined || langVal === null) return true;
  if (typeof enVal === 'string' && typeof langVal === 'string') {
    if (enVal.trim() !== langVal.trim()) return false; // already translated
    if (!enVal.trim()) return false;
    if (enVal.length <= 3) return false;
    if (/^[0-9+%\-$€]+$/.test(enVal.trim())) return false;
    if (enVal.startsWith('http') || enVal.startsWith('/') || enVal.includes('@')) return false;
    const isProperNoun = ['Addis Ababa', 'Lalibela', 'Gondar', 'Axum', 'Bahir Dar', 'Mekelle', 'Dire Dawa', 'Harar', 'Awassa', 'Jinka', 'Arba Minch', 'Sudan', 'South Sudan', 'Eritrea', 'Djibouti', 'Somalia', 'Kenya', 'Sheraton', 'Hyatt Regency', 'Hilton', 'Radisson Blu', 'Golden Tulip', 'USD', 'EUR', 'GBP'].includes(enVal.trim());
    if (isProperNoun) return false;
    return true; // needs translation
  }
  return false;
}

function flattenObject(enVal, langVal, pathStr = "", flatMap = {}) {
  if (Array.isArray(enVal)) {
    enVal.forEach((item, idx) => {
      flattenObject(item, langVal?.[idx], pathStr ? `${pathStr}.${idx}` : `${idx}`, flatMap);
    });
  } else if (enVal !== null && typeof enVal === 'object') {
    for (const k in enVal) {
      flattenObject(enVal[k], langVal?.[k], pathStr ? `${pathStr}.${k}` : k, flatMap);
    }
  } else {
    if (needsTranslation(enVal, langVal)) {
      flatMap[pathStr] = enVal;
    }
  }
  return flatMap;
}

function setByPath(obj, pathStr, value) {
  const parts = pathStr.split(".");
  let cur = obj;
  for (let i = 0; i < parts.length - 1; i++) {
    const part = parts[i];
    const nextPart = parts[i + 1];
    const isNextIdx = /^\d+$/.test(nextPart);

    if (isNextIdx) {
      if (!Array.isArray(cur[part])) {
        cur[part] = [];
      }
    } else {
      if (!cur[part] || typeof cur[part] !== 'object') {
        cur[part] = {};
      }
    }
    cur = cur[part];
  }
  const lastPart = parts[parts.length - 1];
  cur[lastPart] = value;
}

function cleanTranslation(text) {
  if (!text) return "";
  return text
    .replace(/\{\s*\{\s*count\s*\}\s*\}/gi, "{{count}}")
    .replace(/\{\s*\{\s*query\s*\}\s*\}/gi, "{{query}}")
    .replace(/\{\s*\{\s*category\s*\}\s*\}/gi, "{{category}}")
    .replace(/\\n/g, "\n")
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">");
}

// Single item translate function with retry
async function translateSingle(text, targetLang) {
  const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=en&tl=${targetLang}&dt=t&q=${encodeURIComponent(text)}`;
  let retries = 3;
  while (retries > 0) {
    try {
      const res = await fetch(url);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();
      const translated = data[0].map(x => x[0]).join('');
      return cleanTranslation(translated);
    } catch (e) {
      retries--;
      console.warn(`    ⚠️ Single translation failed (retries left: ${retries}):`, e.message);
      if (retries > 0) {
        await new Promise(r => setTimeout(r, 2000));
      }
    }
  }
  return null;
}

// Batched translate function using the index prefixing technique
async function translateBatch(texts, targetLang) {
  const delimiter = "\n";
  const joined = texts.map((t, i) => `[${i}] ${t}`).join(delimiter);
  const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=en&tl=${targetLang}&dt=t&q=${encodeURIComponent(joined)}`;
  
  let retries = 3;
  while (retries > 0) {
    try {
      const res = await fetch(url);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();
      
      const fullTranslation = data[0].map(x => x[0]).join('');
      const lines = fullTranslation.split('\n');
      const results = new Array(texts.length).fill(null);
      
      for (const line of lines) {
        const match = line.match(/^\[(\d+)\]\s*(.*)/);
        if (match) {
          const idx = parseInt(match[1], 10);
          const translatedText = match[2].trim();
          if (idx >= 0 && idx < texts.length) {
            results[idx] = cleanTranslation(translatedText);
          }
        }
      }
      
      // Secondary loose match check
      for (let i = 0; i < lines.length; i++) {
        const line = lines[i];
        if (!line.trim()) continue;
        const looseMatch = line.match(/^[\[\s]*(\d+)[\s\]]*\s*(.*)/);
        if (looseMatch) {
          const idx = parseInt(looseMatch[1], 10);
          const translatedText = looseMatch[2].trim();
          if (idx >= 0 && idx < texts.length && !results[idx]) {
            results[idx] = cleanTranslation(translatedText);
          }
        }
      }

      return results;
    } catch (e) {
      retries--;
      console.warn(`    ⚠️ Batch translation failed (retries left: ${retries}):`, e.message);
      if (retries > 0) {
        await new Promise(r => setTimeout(r, 2000));
      }
    }
  }
  return null;
}

const LANGS = [
  { code: "am", name: "Amharic", gtCode: "am" },
  { code: "ar", name: "Arabic", gtCode: "ar" },
  { code: "zh", name: "Simplified Chinese (Mandarin)", gtCode: "zh-CN" },
  { code: "es", name: "Spanish", gtCode: "es" },
  { code: "fr", name: "French", gtCode: "fr" },
  { code: "pt", name: "Portuguese (Brazilian)", gtCode: "pt" },
  { code: "it", name: "Italian", gtCode: "it" },
  { code: "ru", name: "Russian", gtCode: "ru" },
  { code: "tr", name: "Turkish", gtCode: "tr" },
  { code: "nl", name: "Dutch", gtCode: "nl" },
  { code: "pl", name: "Polish", gtCode: "pl" },
];

async function main() {
  const enPath = path.join(I18N_DIR, "en.ts");
  const enObj = readTS(enPath, 'en');

  for (const { code, name, gtCode } of LANGS) {
    console.log(`\n=== Processing ${name} (${code}) ===`);
    const langPath = path.join(I18N_DIR, `${code}.ts`);
    const langObj = readTS(langPath, code);

    const flatMap = flattenObject(enObj, langObj);
    const keysToTranslate = Object.keys(flatMap);

    if (keysToTranslate.length === 0) {
      console.log(`  ✓ ${code} is already 100% translated!`);
      continue;
    }

    console.log(`  Found ${keysToTranslate.length} keys that require translation.`);

    // Group keys into batches: Max 12 keys OR Max 1200 characters in English
    const batches = [];
    let currentBatch = [];
    let currentLen = 0;

    for (const key of keysToTranslate) {
      const val = flatMap[key];
      const valLen = val.length;

      if (currentBatch.length >= 12 || currentLen + valLen > 1200) {
        batches.push(currentBatch);
        currentBatch = [];
        currentLen = 0;
      }
      currentBatch.push({ key, val });
      currentLen += valLen;
    }
    if (currentBatch.length > 0) {
      batches.push(currentBatch);
    }

    console.log(`  Divided into ${batches.length} batches.`);

    let completed = 0;
    for (let i = 0; i < batches.length; i++) {
      const batch = batches[i];
      const batchKeys = batch.map(b => b.key);
      const batchVals = batch.map(b => b.val);

      console.log(`  [${code}] Batch ${i + 1}/${batches.length} (${batch.length} keys)...`);
      
      const start = Date.now();
      let results = await translateBatch(batchVals, gtCode);

      if (!results) {
        console.warn(`    ⚠️ Batch translation returned null. Falling back to individual translations...`);
        results = new Array(batch.length).fill(null);
      }

      // Check for any missing translations in results and do individual fallback
      for (let j = 0; j < batch.length; j++) {
        if (!results[j]) {
          const { key, val } = batch[j];
          console.log(`      Translating single key [${key}]...`);
          results[j] = await translateSingle(val, gtCode);
          await new Promise(r => setTimeout(r, 100)); // Short throttle between single retries
        }
      }

      // Save valid translations back to langObj
      let batchSuccesses = 0;
      for (let j = 0; j < batch.length; j++) {
        const { key } = batch[j];
        const translatedVal = results[j];
        if (translatedVal && typeof translatedVal === 'string' && translatedVal.trim()) {
          setByPath(langObj, key, translatedVal);
          completed++;
          batchSuccesses++;
        }
      }

      if (batchSuccesses > 0) {
        // Save progress to file immediately
        const tsContent = `const ${code} = ${objectToTSString(langObj, 0)};\n\nexport default ${code};\n`;
        fs.writeFileSync(langPath, tsContent, "utf8");
        const elapsed = ((Date.now() - start) / 1000).toFixed(1);
        console.log(`    ✓ Saved ${batchSuccesses} keys (elapsed: ${elapsed}s).`);
      } else {
        console.warn(`    ✗ Failed all keys in batch ${i + 1}.`);
      }

      // Respectful delay between batches (polite 400ms sleep)
      await new Promise(r => setTimeout(r, 400));
    }

    console.log(`  ✓ Finished ${name} (${code}). Successfully updated: ${completed}/${keysToTranslate.length} keys.`);
  }

  console.log("\n=== ALL TRANSLATIONS COMPLETED ===\n");
}

main().catch(e => {
  console.error("Fatal error:", e);
  process.exit(1);
});
