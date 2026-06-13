/**
 * audit_missing.js — Compares all lang files to en.ts and reports missing keys by namespace.
 * Usage: node scripts/audit_missing.js
 */
const fs = require('fs');
const path = require('path');

const I18N_DIR = path.resolve(__dirname, '../src/lib/i18n');

function readTSFile(filePath, varName) {
  if (!fs.existsSync(filePath)) return null;
  let raw = fs.readFileSync(filePath, 'utf8');
  // Remove TypeScript-specific syntax and comments
  raw = raw.replace(/\/\*[\s\S]*?\*\//g, '').replace(/\/\/.*/g, '');
  // Strip "const X =" at start and "export default X;" at end
  raw = raw.replace(new RegExp(`^\\s*const\\s+${varName}\\s*=\\s*`), '').trim();
  raw = raw.replace(new RegExp(`\\s*export\\s+default\\s+${varName}\\s*;?\\s*$`), '').trim();
  if (raw.endsWith(';')) raw = raw.slice(0, -1);
  try {
    return new Function('return ' + raw)();
  } catch (e) {
    console.error(`  ✗ Parse error in ${path.basename(filePath)}: ${e.message.slice(0, 80)}`);
    return null;
  }
}

function flattenLeaves(obj, prefix = '', out = new Set()) {
  if (Array.isArray(obj)) {
    obj.forEach((v, i) => flattenLeaves(v, `${prefix}.${i}`, out));
  } else if (obj !== null && typeof obj === 'object') {
    for (const k of Object.keys(obj)) {
      flattenLeaves(obj[k], prefix ? `${prefix}.${k}` : k, out);
    }
  } else {
    out.add(prefix);
  }
  return out;
}

function groupByNamespace(keys) {
  const ns = {};
  for (const k of keys) {
    const top = k.split('.')[0];
    ns[top] = (ns[top] || 0) + 1;
  }
  return ns;
}

const enObj = readTSFile(path.join(I18N_DIR, 'en.ts'), 'en');
if (!enObj) { console.error('FATAL: Could not parse en.ts'); process.exit(1); }
const enKeys = flattenLeaves(enObj);
console.log(`English keys: ${enKeys.size}`);
console.log('');

const LANGS = ['am','ar','zh','ru','es','fr','pt','it','tr','nl','pl'];

for (const lang of LANGS) {
  const filePath = path.join(I18N_DIR, `${lang}.ts`);
  const langObj = readTSFile(filePath, lang);
  if (!langObj) {
    console.log(`[${lang}] ⚠ Could not parse`);
    continue;
  }
  const langKeys = flattenLeaves(langObj);
  const missing = [...enKeys].filter(k => !langKeys.has(k));
  const extra = [...langKeys].filter(k => !enKeys.has(k));
  const nsMap = groupByNamespace(missing);
  const nsMapSorted = Object.entries(nsMap).sort((a,b) => b[1]-a[1]);
  console.log(`[${lang}] Total en keys: ${enKeys.size} | Lang keys: ${langKeys.size} | Missing: ${missing.length} | Extra: ${extra.length}`);
  if (missing.length > 0) {
    console.log(`  Missing by namespace: ${nsMapSorted.map(([ns,c]) => `${ns}(${c})`).join(', ')}`);
    // Show first 5 missing keys as samples
    const samples = missing.slice(0, 5);
    console.log(`  Sample missing: ${samples.join(', ')}`);
  }
  console.log('');
}
