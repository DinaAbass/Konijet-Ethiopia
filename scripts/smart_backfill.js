const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const I18N_DIR = path.join(ROOT, 'src', 'lib', 'i18n');
const GROQ_KEY = "gsk_YOUR_GROQ_API_KEY_HERE";
const MODEL_NAME = "llama-3.1-8b-instant";

function readTS(filePath, name) {
  if (!fs.existsSync(filePath)) return {};
  const raw = fs.readFileSync(filePath, 'utf8');
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
      if (typeof item === "object" && item !== null) {
        const innerEntries = Object.entries(item).map(([k,v]) => {
          const key = /^[a-zA-Z_$][a-zA-Z0-9_$]*$/.test(k) ? k : JSON.stringify(k);
          return `${padInner}  ${key}: ${JSON.stringify(v)},`;
        }).join("\n");
        return `${padInner}{\n${innerEntries}\n${padInner}}`;
      }
      return `${padInner}${JSON.stringify(item)}`;
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

function needsTranslation(enVal, langVal, pathStr) {
  if (langVal === undefined) return true;
  if (typeof enVal === 'string' && typeof langVal === 'string') {
    if (enVal.trim() === langVal.trim()) {
      const hasLetters = /[a-zA-Z]/.test(enVal);
      const isShortSymbol = enVal.length <= 4 && !/\s/.test(enVal);
      const isEmail = enVal.includes('@');
      const isUrl = enVal.startsWith('http') || enVal.startsWith('/');
      const isPlaceholderOnly = /^[{}_\s\d\W]+$/.test(enVal);
      const isProperNoun = ['Addis Ababa', 'Lalibela', 'Gondar', 'Axum', 'Bahir Dar', 'Mekelle', 'Dire Dawa', 'Harar', 'Awassa', 'Jinka', 'Arba Minch', 'Sudan', 'South Sudan', 'Eritrea', 'Djibouti', 'Somalia', 'Kenya', 'Sheraton', 'Hyatt Regency', 'Hilton', 'Radisson Blu', 'Golden Tulip', 'USD', 'EUR', 'GBP'].includes(enVal.trim());
      const isNumericOrShort = /^[0-9+%-]+$/.test(enVal.trim()) || enVal.trim().length <= 4;

      if (hasLetters && !isShortSymbol && !isEmail && !isUrl && !isPlaceholderOnly && !isProperNoun && !isNumericOrShort) {
        return true;
      }
    }
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
    if (needsTranslation(enVal, langVal, pathStr)) {
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

async function groqTranslate(chunkObj, targetLang, targetLangName) {
  const systemPrompt = `You are an expert professional travel & tourism translator. Translate the JSON values (not keys) from English to ${targetLangName}.
Preserve all placeholders like {{count}}, {{query}}, {{category}}, \\n\\n, and bullet points (•) exactly.
Translate all text accurately and professionally.
Return ONLY valid JSON, nothing else. Do not add any conversational text or markdown code fences.`;

  const body = JSON.stringify({
    model: MODEL_NAME,
    temperature: 0.2,
    max_tokens: 1000,
    response_format: { type: "json_object" },
    messages: [
      { role: "system", content: systemPrompt },
      { role: "user", content: `Target language: ${targetLangName} (code: ${targetLang})\n\nTranslate these English values:\n${JSON.stringify(chunkObj, null, 2)}` }
    ]
  });

  let retries = 3;
  while (retries > 0) {
    try {
      const res = await fetch("https://api.groq.com/openai/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${GROQ_KEY}`
        },
        body
      });
      if (!res.ok) {
        const errText = await res.text();
        throw new Error(`Groq API error ${res.status}: ${errText}`);
      }
      const data = await res.json();
      return data.choices[0].message.content.trim();
    } catch (e) {
      retries--;
      console.error(`  Error in translate (${retries} retries left):`, e.message);
      if (retries > 0) {
        // Wait longer on error
        await new Promise(r => setTimeout(r, 8000));
      }
    }
  }
  return null;
}

function parseGroqResponse(raw) {
  if (!raw) return null;
  let cleaned = raw.replace(/^```(?:json)?\s*/i, "").replace(/\s*```\s*$/, "").trim();
  try {
    return JSON.parse(cleaned);
  } catch (e) {
    const match = cleaned.match(/\{[\s\S]*\}/);
    if (match) {
      try { return JSON.parse(match[0]); } catch {}
    }
    console.error("  Failed to parse response:", cleaned.slice(0, 200));
    return null;
  }
}

const LANGS = [
  { code: "am", name: "Amharic" },
  { code: "ar", name: "Arabic" },
  { code: "zh", name: "Simplified Chinese (Mandarin)" },
  { code: "es", name: "Spanish" },
  { code: "fr", name: "French" },
  { code: "pt", name: "Portuguese (Brazilian)" },
  { code: "it", name: "Italian" },
  { code: "ru", name: "Russian" },
  { code: "tr", name: "Turkish" },
  { code: "nl", name: "Dutch" },
  { code: "pl", name: "Polish" },
];

async function main() {
  const enPath = path.join(I18N_DIR, "en.ts");
  const enObj = readTS(enPath, 'en');

  for (const { code, name } of LANGS) {
    console.log(`\n=== Processing ${name} (${code}) ===`);
    const langPath = path.join(I18N_DIR, `${code}.ts`);
    const langObj = readTS(langPath, code);

    // Get flat map of keys needing translation
    const flatMap = flattenObject(enObj, langObj);
    const keysToTranslate = Object.keys(flatMap);

    if (keysToTranslate.length === 0) {
      console.log(`  ✓ ${code} is already 100% translated!`);
      continue;
    }

    console.log(`  Found ${keysToTranslate.length} keys that require translation.`);

    // Group keys into small batches:
    // - Long keys (> 100 chars or containing newlines) get their own individual batch.
    // - Small keys are batched together up to 5 keys or 500 chars.
    const batches = [];
    let currentBatch = {};
    let currentLen = 0;

    for (const key of keysToTranslate) {
      const val = flatMap[key];
      const isLong = val.length > 100 || val.includes('\n');
      
      if (isLong) {
        // If we have an active small batch, push it first
        if (Object.keys(currentBatch).length > 0) {
          batches.push(currentBatch);
          currentBatch = {};
          currentLen = 0;
        }
        // Add the long key as its own batch
        batches.push({ [key]: val });
      } else {
        if (Object.keys(currentBatch).length >= 5 || currentLen + val.length > 500) {
          batches.push(currentBatch);
          currentBatch = {};
          currentLen = 0;
        }
        currentBatch[key] = val;
        currentLen += val.length;
      }
    }
    if (Object.keys(currentBatch).length > 0) {
      batches.push(currentBatch);
    }

    console.log(`  Divided into ${batches.length} batches.`);

    let completed = 0;
    for (let i = 0; i < batches.length; i++) {
      const batch = batches[i];
      const keys = Object.keys(batch);
      const isLongBatch = keys.length === 1 && (batch[keys[0]].length > 100 || batch[keys[0]].includes('\n'));
      
      console.log(`  [${code}] Batch ${i + 1}/${batches.length} (${keys.length} keys, long=${isLongBatch})...`);
      
      const start = Date.now();
      const raw = await groqTranslate(batch, code, name);
      const parsed = parseGroqResponse(raw);

      if (parsed) {
        for (const [key, translatedVal] of Object.entries(parsed)) {
          setByPath(langObj, key, translatedVal);
        }
        completed += keys.length;
        const elapsed = ((Date.now() - start) / 1000).toFixed(1);
        console.log(`    ✓ Translated successfully in ${elapsed}s. Keys: ${keys.join(', ')}`);
        
        // Immediately save file to persist progress!
        const tsContent = `const ${code} = ${objectToTSString(langObj, 0)};\n\nexport default ${code};\n`;
        fs.writeFileSync(langPath, tsContent, "utf8");
      } else {
        console.warn(`    ✗ Failed to translate batch ${i + 1}. Keeping English fallbacks for now.`);
        // Even if failed, let's write the English values so we don't have gaps or crashes
        for (const [key, enVal] of Object.entries(batch)) {
          setByPath(langObj, key, enVal);
        }
        const tsContent = `const ${code} = ${objectToTSString(langObj, 0)};\n\nexport default ${code};\n`;
        fs.writeFileSync(langPath, tsContent, "utf8");
      }

      // Smart wait to stay within TPM (6,000 limit)
      // Long batch has a lot of tokens, so wait 10 seconds. Small batch wait 5 seconds.
      const delay = isLongBatch ? 10000 : 5000;
      await new Promise(r => setTimeout(r, delay));
    }

    console.log(`  ✓ Finished processing ${name} (${code}). Total added/updated: ${completed} keys.`);
  }

  console.log("\n=== ALL TRANSLATIONS COMPLETED ===\n");
}

main().catch(e => {
  console.error("Fatal error:", e);
  process.exit(1);
});
