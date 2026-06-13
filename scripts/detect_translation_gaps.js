const fs = require('fs');
const path = require('path');

const getPathsWithValues = (obj, prefix = '', res = {}) => {
  for (const key in obj) {
    const newPrefix = prefix ? `${prefix}.${key}` : key;
    if (typeof obj[key] === 'object' && obj[key] !== null && !Array.isArray(obj[key])) {
      getPathsWithValues(obj[key], newPrefix, res);
    } else {
      res[newPrefix] = obj[key];
    }
  }
  return res;
};

const readTranslationFile = (filePath, name) => {
  const content = fs.readFileSync(filePath, 'utf8');
  const clean = content
    .replace(new RegExp(`const\\s+${name}\\s*=\\s*`), '')
    .replace(new RegExp(`export\\s+default\\s+${name}\\s*;?\\s*$`), '')
    .trim()
    .replace(/;$/, '');
  
  try {
    return new Function(`return ${clean}`)();
  } catch (e) {
    console.error(`Error parsing ${filePath}:`, e.message);
    return null;
  }
};

const LANGS = [
  { code: 'en', name: 'English' },
  { code: 'am', name: 'Amharic' },
  { code: 'ar', name: 'Arabic' },
  { code: 'zh', name: 'Chinese' },
  { code: 'es', name: 'Spanish' },
  { code: 'fr', name: 'French' },
  { code: 'pt', name: 'Portuguese' },
  { code: 'it', name: 'Italian' },
  { code: 'ru', name: 'Russian' },
  { code: 'tr', name: 'Turkish' },
  { code: 'nl', name: 'Dutch' },
  { code: 'pl', name: 'Polish' }
];

const I18N_DIR = path.join(__dirname, '..', 'src', 'lib', 'i18n');

const enObj = readTranslationFile(path.join(I18N_DIR, 'en.ts'), 'en');
const enMap = getPathsWithValues(enObj);
const enKeys = Object.keys(enMap);

console.log(`English has ${enKeys.length} total keys.`);

const report = {};

for (const { code, name } of LANGS) {
  if (code === 'en') continue;
  const langObj = readTranslationFile(path.join(I18N_DIR, `${code}.ts`), code);
  if (!langObj) {
    console.log(`Failed to load ${name} (${code})`);
    continue;
  }
  const langMap = getPathsWithValues(langObj);
  const langKeys = Object.keys(langMap);

  const missing = enKeys.filter(k => !langKeys.includes(k));
  const extra = langKeys.filter(k => !enKeys.includes(k));

  // Find English fallbacks
  const englishFallbacks = [];
  for (const k of langKeys) {
    if (enMap[k] !== undefined && langMap[k] === enMap[k]) {
      // Ignore some keys that might naturally be identical (e.g. number/special character only, URLs, email, standard names like Sheraton/Hyatt, etc.)
      const val = String(langMap[k]);
      const hasLetters = /[a-zA-Z]/.test(val);
      const isShortSymbol = val.length <= 4 && !/\s/.test(val);
      const isEmail = val.includes('@');
      const isUrl = val.startsWith('http') || val.startsWith('/');
      const isProperNoun = ['Addis Ababa', 'Lalibela', 'Gondar', 'Axum', 'Bahir Dar', 'Mekelle', 'Dire Dawa', 'Harar', 'Awassa', 'Jinka', 'Arba Minch', 'Sudan', 'South Sudan', 'Eritrea', 'Djibouti', 'Somalia', 'Kenya', 'Sheraton', 'Hyatt Regency', 'Hilton', 'Radisson Blu', 'Golden Tulip', 'USD', 'EUR', 'GBP'].includes(val.trim());
      const isNumericOrShort = /^[0-9+%-]+$/.test(val.trim()) || val.trim().length <= 4;
      
      if (hasLetters && !isShortSymbol && !isEmail && !isUrl && !isProperNoun && !isNumericOrShort) {
        englishFallbacks.push({ key: k, value: val });
      }
    }
  }

  report[code] = {
    name,
    totalKeys: langKeys.length,
    missingCount: missing.length,
    missingKeys: missing,
    extraCount: extra.length,
    extraKeys: extra,
    fallbackCount: englishFallbacks.length,
    fallbacks: englishFallbacks
  };

  console.log(`${name} (${code}): Keys=${langKeys.length}, Missing=${missing.length}, Extra=${extra.length}, Fallbacks=${englishFallbacks.length}`);
}

fs.writeFileSync(path.join(__dirname, 'gap_report.json'), JSON.stringify(report, null, 2), 'utf8');
console.log('Saved report to scripts/gap_report.json');
