const fs = require('fs');
const path = require('path');

const files = ['zh.ts', 'es.ts', 'fr.ts', 'pt.ts', 'it.ts', 'ru.ts', 'tr.ts', 'nl.ts', 'pl.ts'];
const dir = path.join(__dirname, '..', 'src', 'lib', 'i18n');

files.forEach(file => {
  const filePath = path.join(dir, file);
  if (!fs.existsSync(filePath)) {
    console.log(`File not found: ${filePath}`);
    return;
  }
  let content = fs.readFileSync(filePath, 'utf8');
  
  // Replace adventure-safari: with "adventure-safari":
  content = content.replace(/\badventure-safari\s*:/g, '"adventure-safari":');
  // Replace city-day-trips: with "city-day-trips":
  content = content.replace(/\bcity-day-trips\s*:/g, '"city-day-trips":');
  
  fs.writeFileSync(filePath, content, 'utf8');
  console.log(`Fixed syntax in ${file}`);
});
