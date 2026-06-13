/**
 * Konijet Ethiopia — Full Translation Backfill Script
 * Uses Groq API (llama-3.3-70b-versatile) to fill missing keys in 9 language files.
 * Run: node scripts/translate-backfill.mjs
 */

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const I18N_DIR = path.join(ROOT, "src", "lib", "i18n");
const GROQ_KEY = "gsk_YOUR_GROQ_API_KEY_HERE";

// ---------- Helpers ----------
function readTS(filePath) {
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
    return null;
  }
}

function deepKeys(obj, prefix = "") {
  let keys = [];
  for (const k in obj) {
    const val = obj[k];
    if (Array.isArray(val)) {
      keys.push(`${prefix}${k}`); // treat arrays as leaf values
    } else if (val !== null && typeof val === "object") {
      keys = keys.concat(deepKeys(val, `${prefix}${k}.`));
    } else {
      keys.push(`${prefix}${k}`);
    }
  }
  return keys;
}

function getByPath(obj, path) {
  return path.split(".").reduce((acc, k) => acc?.[k], obj);
}

function setByPath(obj, pathStr, value) {
  const parts = pathStr.split(".");
  let cur = obj;
  for (let i = 0; i < parts.length - 1; i++) {
    if (!cur[parts[i]] || typeof cur[parts[i]] !== "object") cur[parts[i]] = {};
    cur = cur[parts[i]];
  }
  cur[parts[parts.length - 1]] = value;
}

function extractMissingSubtree(enObj, langObj, prefix = "") {
  const missing = {};
  for (const k in enObj) {
    const fullKey = prefix ? `${prefix}.${k}` : k;
    const enVal = enObj[k];
    const langVal = langObj?.[k];
    if (Array.isArray(enVal)) {
      if (langVal === undefined) missing[k] = enVal; // whole array missing
    } else if (enVal !== null && typeof enVal === "object") {
      const sub = extractMissingSubtree(enVal, langVal ?? {}, fullKey);
      if (Object.keys(sub).length > 0) missing[k] = sub;
    } else {
      if (langVal === undefined) missing[k] = enVal;
    }
  }
  return missing;
}

async function groqTranslate(textJson, targetLang, targetLangName) {
  const systemPrompt = `You are a professional travel & tourism translator. Translate the JSON values (not keys) from English to ${targetLangName}. Preserve all placeholders like {{count}}, {{query}}, {{category}}, \\n\\n, and bullet points (•). Return ONLY valid JSON, nothing else. Do not add any commentary. The JSON may contain nested objects and arrays.`;

  const body = JSON.stringify({
    model: "llama-3.3-70b-versatile",
    temperature: 0.3,
    max_tokens: 16000,
    messages: [
      { role: "system", content: systemPrompt },
      { role: "user", content: `Target language: ${targetLangName} (code: ${targetLang})\n\nTranslate these English values:\n${textJson}` }
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
      if (retries > 0) await new Promise(r => setTimeout(r, 3000));
    }
  }
  return null;
}

function parseGroqResponse(raw) {
  if (!raw) return null;
  // Strip markdown code fences if present
  let cleaned = raw.replace(/^```(?:json)?\s*/i, "").replace(/\s*```\s*$/, "").trim();
  try {
    return JSON.parse(cleaned);
  } catch (e) {
    // Try to find JSON object in the response
    const match = cleaned.match(/\{[\s\S]*\}/);
    if (match) {
      try { return JSON.parse(match[0]); } catch {}
    }
    console.error("  Failed to parse Groq response:", cleaned.slice(0, 200));
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
      if (typeof item === "object" && item !== null) return `${padInner}{\n${Object.entries(item).map(([k,v]) => `${padInner}  ${JSON.stringify(k)}: ${JSON.stringify(v)},`).join("\n")}\n${padInner}}`;
      return `${padInner}${JSON.stringify(item)}`;
    }).join(",\n");
    return `[\n${items},\n${pad}]`;
  }
  if (typeof obj === "object" && obj !== null) {
    const entries = Object.entries(obj).map(([k, v]) => {
      const key = /^[\w-]+$/.test(k) ? k : JSON.stringify(k);
      const val = objectToTSString(v, indent + 1);
      return `${padInner}${key}: ${val},`;
    }).join("\n");
    return `{\n${entries}\n${pad}}`;
  }
  return JSON.stringify(obj);
}

function deepMerge(base, overlay) {
  const result = { ...base };
  for (const k in overlay) {
    if (
      overlay[k] !== null &&
      typeof overlay[k] === "object" &&
      !Array.isArray(overlay[k]) &&
      typeof base[k] === "object" &&
      !Array.isArray(base[k])
    ) {
      result[k] = deepMerge(base[k] ?? {}, overlay[k]);
    } else {
      result[k] = overlay[k];
    }
  }
  return result;
}

// ---------- Language configs ----------
const LANGS = [
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

// ---------- Main ----------
async function main() {
  const enPath = path.join(I18N_DIR, "en.ts");
  const enObj = readTS(enPath);
  if (!enObj) { console.error("Failed to read en.ts"); process.exit(1); }

  console.log(`English keys total: ${deepKeys(enObj).length}`);

  for (const { code, name } of LANGS) {
    console.log(`\n=== Processing ${name} (${code}) ===`);
    const langPath = path.join(I18N_DIR, `${code}.ts`);

    let langObj = {};
    if (fs.existsSync(langPath)) {
      langObj = readTS(langPath) ?? {};
    }

    // Find missing sub-tree
    const missingTree = extractMissingSubtree(enObj, langObj);
    const missingKeys = deepKeys(missingTree);

    if (missingKeys.length === 0) {
      console.log(`  ✓ ${code} is complete — nothing to do.`);
      continue;
    }
    console.log(`  Missing ${missingKeys.length} keys. Translating in chunks...`);

    // Split into chunks of ~4000 chars to avoid context limit
    const TOP_LEVEL_MISSING = Object.keys(missingTree);
    const CHUNK_SIZE = 6; // process N top-level sections at a time

    let translated = {};
    for (let i = 0; i < TOP_LEVEL_MISSING.length; i += CHUNK_SIZE) {
      const chunk = TOP_LEVEL_MISSING.slice(i, i + CHUNK_SIZE);
      const chunkObj = {};
      for (const k of chunk) chunkObj[k] = missingTree[k];

      const jsonInput = JSON.stringify(chunkObj, null, 2);
      console.log(`  Chunk ${Math.floor(i/CHUNK_SIZE)+1}: sections [${chunk.join(", ")}] (${jsonInput.length} chars)`);

      const raw = await groqTranslate(jsonInput, code, name);
      const parsed = parseGroqResponse(raw);

      if (parsed) {
        Object.assign(translated, parsed);
        console.log(`    ✓ Got ${Object.keys(parsed).length} sections back`);
      } else {
        console.warn(`    ✗ Translation failed for chunk, using English fallback`);
        Object.assign(translated, chunkObj);
      }

      // Small delay to avoid rate limits
      await new Promise(r => setTimeout(r, 500));
    }

    // Merge into existing lang object
    const merged = deepMerge(langObj, translated);

    // Write back to file
    const varName = code;
    const tsContent = `const ${varName} = ${objectToTSString(merged, 0)};\n\nexport default ${varName};\n`;

    fs.writeFileSync(langPath, tsContent, "utf8");
    console.log(`  ✓ Wrote ${langPath}`);
  }

  console.log("\n✅ All languages processed!");
}

main().catch(e => { console.error("Fatal:", e); process.exit(1); });
