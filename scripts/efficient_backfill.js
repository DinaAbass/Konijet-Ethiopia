/**
 * scripts/efficient_backfill.js
 * Batches and translates all missing keys professionally for all 11 languages (no skipping of non-Latin long keys).
 * Uses llama-3.1-8b-instant for fast, high-rate-limit execution.
 * Wraps JSON in <json>...</json> tags to bypass Groq API's strict JSON mode validation issues.
 * If a batch fails, it falls back to translating keys individually to ensure maximum completion.
 * Saves progress after each success.
 */
const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const I18N_DIR = path.join(ROOT, 'src', 'lib', 'i18n');
const GROQ_KEY = "gsk_YOUR_GROQ_API_KEY_HERE";
const MODEL_NAME = "llama-3.1-8b-instant";

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

async function groqTranslate(chunkObj, targetLang, targetLangName) {
  const systemPrompt = `You are a professional travel and tourism translator. Translate the JSON values (not keys) from English to ${targetLangName}.
Preserve all placeholders like {{count}}, {{query}}, {{category}}, \\n\\n, and bullet points (•) exactly.
Translate all text accurately and professionally.
Return ONLY valid JSON wrapped in <json> and </json> tags, for example:
<json>
{
  "key": "translated value"
}
</json>
Do not include any other conversational text or explanations.`;

  const body = JSON.stringify({
    model: MODEL_NAME,
    temperature: 0.15,
    max_tokens: 3000,
    messages: [
      { role: "system", content: systemPrompt },
      { role: "user", content: `Translate to ${targetLangName} (${targetLang}):\n${JSON.stringify(chunkObj, null, 2)}` }
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
      if (res.status === 429) {
        const retryAfter = res.headers.get("retry-after") || "10";
        const waitSecs = parseInt(retryAfter, 10) + 3;
        console.warn(`    ⏳ Rate limit 429. Sleeping ${waitSecs}s...`);
        await new Promise(r => setTimeout(r, waitSecs * 1000));
        continue;
      }
      if (!res.ok) {
        const errText = await res.text();
        throw new Error(`Groq API error ${res.status}: ${errText}`);
      }
      const data = await res.json();
      return data.choices[0].message.content.trim();
    } catch (e) {
      retries--;
      console.error(`    ✗ Error (${retries} retries left):`, e.message);
      if (retries > 0) {
        await new Promise(r => setTimeout(r, 4000));
      }
    }
  }
  return null;
}

function parseGroqResponse(raw) {
  if (!raw) return null;
  
  // Try extracting from <json> tags first
  const match = raw.match(/<json>([\s\S]*?)<\/json>/i);
  let jsonText = match ? match[1].trim() : raw.trim();

  // Strip markdown code fences if present
  jsonText = jsonText.replace(/^```(?:json)?\s*/i, "").replace(/\s*```\s*$/, "").trim();

  try {
    return JSON.parse(jsonText);
  } catch (e) {
    // Attempt fallback to find any valid JSON block
    const fallbackMatch = jsonText.match(/\{[\s\S]*\}/);
    if (fallbackMatch) {
      try { return JSON.parse(fallbackMatch[0]); } catch {}
    }
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

    // Group keys into batches dynamically:
    // Limit: Max 12 keys OR Max 1500 chars (highly stable)
    const batches = [];
    let currentBatch = {};
    let currentLen = 0;

    for (const key of keysToTranslate) {
      const val = flatMap[key];
      const valLen = val.length;

      if (Object.keys(currentBatch).length >= 8 || currentLen + valLen > 1000) {
        batches.push(currentBatch);
        currentBatch = {};
        currentLen = 0;
      }
      currentBatch[key] = val;
      currentLen += valLen;
    }
    if (Object.keys(currentBatch).length > 0) {
      batches.push(currentBatch);
    }

    console.log(`  Divided into ${batches.length} batches.`);

    let completed = 0;
    for (let i = 0; i < batches.length; i++) {
      const batch = batches[i];
      const keys = Object.keys(batch);
      
      console.log(`  [${code}] Batch ${i + 1}/${batches.length} (${keys.length} keys)...`);
      
      const start = Date.now();
      const raw = await groqTranslate(batch, code, name);
      let parsed = parseGroqResponse(raw);

      if (!parsed) {
        console.warn(`    ⚠️ Batch failed parsing. Falling back to individual key translation...`);
        parsed = {};
        for (const key of keys) {
          const singleKeyVal = batch[key];
          console.log(`      Translating single key [${key}]...`);
          const singleRaw = await groqTranslate({ [key]: singleKeyVal }, code, name);
          const singleParsed = parseGroqResponse(singleRaw);
          if (singleParsed && singleParsed[key]) {
            parsed[key] = singleParsed[key];
            await new Promise(r => setTimeout(r, 3000));
          } else {
            console.warn(`      ✗ Failed key: ${key}`);
          }
        }
      }

      if (Object.keys(parsed).length > 0) {
        for (const [key, translatedVal] of Object.entries(parsed)) {
          if (translatedVal && typeof translatedVal === 'string' && translatedVal.trim()) {
            setByPath(langObj, key, translatedVal);
            completed++;
          }
        }
        
        // Save progress immediately
        const tsContent = `const ${code} = ${objectToTSString(langObj, 0)};\n\nexport default ${code};\n`;
        fs.writeFileSync(langPath, tsContent, "utf8");
        const elapsed = ((Date.now() - start) / 1000).toFixed(1);
        console.log(`    ✓ Saved ${Object.keys(parsed).length} keys (elapsed: ${elapsed}s).`);
      } else {
        console.warn(`    ✗ Failed all keys in batch ${i + 1}.`);
      }

      // Respect Groq rate limits (30 RPM and 30k TPM. Use 3.5s delay to be extremely safe)
      await new Promise(r => setTimeout(r, 3500));
    }

    console.log(`  ✓ Finished ${name} (${code}). Successfully updated: ${completed}/${keysToTranslate.length} keys.`);
  }

  console.log("\n=== ALL TRANSLATIONS COMPLETED ===\n");
}

main().catch(e => {
  console.error("Fatal error:", e);
  process.exit(1);
});
