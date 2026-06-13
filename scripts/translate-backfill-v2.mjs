import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const I18N_DIR = path.join(ROOT, "src", "lib", "i18n");
const GROQ_KEY = "gsk_YOUR_GROQ_API_KEY_HERE";

// ---------- Helpers ----------
function readTS(filePath) {
  if (!fs.existsSync(filePath)) return {};
  const raw = fs.readFileSync(filePath, "utf8");
  const clean = raw
    .replace(/const\s+\w+\s*=\s*/, "")
    .replace(/export\s+default\s+\w+\s*;?\s*$/, "")
    .trim()
    .replace(/;$/, "");
  try {
    return new Function(`return ${clean}`)();
  } catch (e) {
    console.error("Parse error:", filePath, e.message);
    return {};
  }
}

function needsTranslation(enVal, langVal, path) {
  if (langVal === undefined) return true;
  if (typeof enVal === 'string' && typeof langVal === 'string') {
    // If identical to English
    if (enVal.trim() === langVal.trim()) {
      // Check if it's something that actually needs translation
      const hasLetters = /[a-zA-Z]/.test(enVal);
      const isShortSymbol = enVal.length <= 4 && !/\s/.test(enVal);
      const isEmail = enVal.includes('@');
      const isUrl = enVal.startsWith('http') || enVal.startsWith('/');
      const isPlaceholderOnly = /^[{}_\s\d\W]+$/.test(enVal);

      if (hasLetters && !isShortSymbol && !isEmail && !isUrl && !isPlaceholderOnly) {
        return true;
      }
    }
  }
  return false;
}

function flattenObject(enVal, langVal, path = "", flatMap = {}) {
  if (Array.isArray(enVal)) {
    enVal.forEach((item, idx) => {
      flattenObject(item, langVal?.[idx], path ? `${path}.${idx}` : `${idx}`, flatMap);
    });
  } else if (enVal !== null && typeof enVal === 'object') {
    for (const k in enVal) {
      flattenObject(enVal[k], langVal?.[k], path ? `${path}.${k}` : k, flatMap);
    }
  } else {
    if (needsTranslation(enVal, langVal, path)) {
      flatMap[path] = enVal;
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
    model: "llama-3.1-8b-instant",
    temperature: 0.2,
    max_tokens: 8000,
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
      console.error(`  Error (${retries} retries left):`, e.message);
      if (retries > 0) await new Promise(r => setTimeout(r, 4000));
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

function objectToTSString(obj, indent = 0) {
  const pad = "  ".repeat(indent);
  const padInner = "  ".repeat(indent + 1);
  if (Array.isArray(obj)) {
    if (obj.length === 0) return "[]";
    const items = obj.map(item => {
      if (typeof item === "string") return `${padInner}${JSON.stringify(item)}`;
      if (typeof item === "object" && item !== null) {
        return `${padInner}{\n${Object.entries(item).map(([k,v]) => `${padInner}  ${JSON.stringify(k)}: ${JSON.stringify(v)},`).join("\n")}\n${padInner}}`;
      }
      return `${padInner}${JSON.stringify(item)}`;
    }).join(",\n");
    return `[\n${items},\n${pad}]`;
  }
  if (typeof obj === "object" && obj !== null) {
    const entries = Object.entries(obj).map(([k, v]) => {
      // ONLY allow unquoted valid JS identifier keys
      const key = /^[a-zA-Z_$][a-zA-Z0-9_$]*$/.test(k) ? k : JSON.stringify(k);
      const val = objectToTSString(v, indent + 1);
      return `${padInner}${key}: ${val},`;
    }).join("\n");
    return `{\n${entries}\n${pad}}`;
  }
  return JSON.stringify(obj);
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
  const enObj = readTS(enPath);

  for (const { code, name } of LANGS) {
    console.log(`\n=== Processing ${name} (${code}) ===`);
    const langPath = path.join(I18N_DIR, `${code}.ts`);
    const langObj = readTS(langPath);

    // Get flat map of keys needing translation
    const flatMap = flattenObject(enObj, langObj);
    const keysToTranslate = Object.keys(flatMap);

    if (keysToTranslate.length === 0) {
      console.log(`  ✓ ${code} is fully translated!`);
      continue;
    }

    console.log(`  Found ${keysToTranslate.length} keys that require translation.`);

    // Chunk into max 2000 characters to prevent Groq 413 and rate limits
    const chunks = [];
    let currentChunk = {};
    let currentLen = 0;
    for (const key of keysToTranslate) {
      const val = flatMap[key];
      const entryLen = key.length + String(val).length + 20;
      if (currentLen + entryLen > 1800 && Object.keys(currentChunk).length > 0) {
        chunks.push(currentChunk);
        currentChunk = {};
        currentLen = 0;
      }
      currentChunk[key] = val;
      currentLen += entryLen;
    }
    if (Object.keys(currentChunk).length > 0) {
      chunks.push(currentChunk);
    }

    console.log(`  Divided into ${chunks.length} chunks.`);

    let completedCount = 0;
    for (let i = 0; i < chunks.length; i++) {
      const chunk = chunks[i];
      console.log(`  Translating chunk ${i + 1}/${chunks.length} (${Object.keys(chunk).length} keys)...`);
      const raw = await groqTranslate(chunk, code, name);
      const parsed = parseGroqResponse(raw);

      if (parsed) {
        for (const [key, translatedVal] of Object.entries(parsed)) {
          setByPath(langObj, key, translatedVal);
        }
        completedCount += Object.keys(parsed).length;
        console.log(`    ✓ Translated ${Object.keys(parsed).length} keys successfully.`);
      } else {
        console.warn(`    ✗ Failed to translate chunk ${i + 1}. Keeping English fallbacks.`);
        // Set English values to avoid undefined
        for (const [key, enVal] of Object.entries(chunk)) {
          setByPath(langObj, key, enVal);
        }
      }
      
      // Wait to avoid rate limits
      await new Promise(r => setTimeout(r, 3000));
    }

    // Save TS file
    const tsContent = `const ${code} = ${objectToTSString(langObj, 0)};\n\nexport default ${code};\n`;
    fs.writeFileSync(langPath, tsContent, "utf8");
    console.log(`  ✓ Saved ${langPath} (added/updated ${completedCount} keys)`);
  }

  console.log("\n=== ALL TRANSLATIONS COMPLETED ===\n");
}

main().catch(e => {
  console.error("Fatal error:", e);
  process.exit(1);
});
