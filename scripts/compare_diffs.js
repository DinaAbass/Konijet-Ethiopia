const fs = require('fs');
const path = require('path');

const getObjectKeys = (obj, prefix = '') => {
  let keys = [];
  for (const k in obj) {
    if (typeof obj[k] === 'object' && obj[k] !== null && !Array.isArray(obj[k])) {
      keys = keys.concat(getObjectKeys(obj[k], `${prefix}${k}.`));
    } else {
      keys.push(`${prefix}${k}`);
    }
  }
  return keys;
};

const readTranslationFile = (filePath) => {
  const content = fs.readFileSync(filePath, 'utf8');
  const clean = content
    .replace(/const\s+\w+\s*=\s*/, '')
    .replace(/export\s+default\s+\w+\s*;?\s*$/, '')
    .trim()
    .replace(/;$/, '');
  
  try {
    return new Function(`return ${clean}`)();
  } catch (e) {
    console.error(`Error parsing ${filePath}:`, e.message);
    return null;
  }
};

const enObj = readTranslationFile('c:\\Users\\Sara\\OneDrive\\Documents\\Konijet_Ethiopia\\src\\lib\\i18n\\en.ts');
const zhObj = readTranslationFile('c:\\Users\\Sara\\OneDrive\\Documents\\Konijet_Ethiopia\\src\\lib\\i18n\\zh.ts');

const enKeys = getObjectKeys(enObj);
const zhKeys = getObjectKeys(zhObj);

const extraInZh = zhKeys.filter(k => !enKeys.includes(k));
console.log('Extra in zh:', extraInZh.length);
console.log(extraInZh);

const extraInEn = enKeys.filter(k => !zhKeys.includes(k));
console.log('Extra in en:', extraInEn.length);
console.log(extraInEn);
