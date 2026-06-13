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

const zhObj = readTranslationFile('c:\\Users\\Sara\\OneDrive\\Documents\\Konijet_Ethiopia\\src\\lib\\i18n\\zh.ts');
const amObj = readTranslationFile('c:\\Users\\Sara\\OneDrive\\Documents\\Konijet_Ethiopia\\src\\lib\\i18n\\am.ts');
const arObj = readTranslationFile('c:\\Users\\Sara\\OneDrive\\Documents\\Konijet_Ethiopia\\src\\lib\\i18n\\ar.ts');

const zhKeys = getObjectKeys(zhObj);
const amKeys = getObjectKeys(amObj);
const arKeys = getObjectKeys(arObj);

const missingInAm = zhKeys.filter(k => !amKeys.includes(k));
console.log('Missing in am:', missingInAm.length);
console.log(JSON.stringify(missingInAm, null, 2));

const missingInAr = zhKeys.filter(k => !arKeys.includes(k));
console.log('Missing in ar:', missingInAr.length);
console.log(JSON.stringify(missingInAr, null, 2));
