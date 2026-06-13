const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const SRC_DIR = path.join(ROOT, 'src');

// Walk directory recursively
function walkDir(dir, callback) {
  fs.readdirSync(dir).forEach(f => {
    const dirPath = path.join(dir, f);
    const isDirectory = fs.statSync(dirPath).isDirectory();
    if (isDirectory) {
      walkDir(dirPath, callback);
    } else {
      callback(dirPath);
    }
  });
}

const replacements = [
  // Specific email addresses
  { from: /privacy@konjetethiopia\.com/g, to: 'privacy@konijetethiopia.qzz.io' },
  { from: /privacy@konijet-ethiopia\.com/g, to: 'privacy@konijetethiopia.qzz.io' },
  { from: /legal@konjetethiopia\.com/g, to: 'legal@konijetethiopia.qzz.io' },
  { from: /legal@konijet-ethiopia\.com/g, to: 'legal@konijetethiopia.qzz.io' },
  { from: /bookings@konjetethiopia\.com/g, to: 'booking@konijetethiopia.qzz.io' },
  { from: /booking@konjetethiopia\.com/g, to: 'booking@konijetethiopia.qzz.io' },
  { from: /bookings@konijet-ethiopia\.com/g, to: 'booking@konijetethiopia.qzz.io' },
  { from: /hello@konijet-ethiopia\.com/g, to: 'info@konijetethiopia.qzz.io' },
  { from: /info@konjetethiopia\.com/g, to: 'info@konijetethiopia.qzz.io' },
  { from: /info@konijet-ethiopia\.com/g, to: 'info@konijetethiopia.qzz.io' },
  // General domains
  { from: /konjetethiopia\.com/g, to: 'konijetethiopia.qzz.io' },
  { from: /konijet-ethiopia\.com/g, to: 'konijetethiopia.qzz.io' }
];

let modifiedCount = 0;

walkDir(SRC_DIR, filePath => {
  if (!filePath.endsWith('.ts') && !filePath.endsWith('.tsx')) return;

  let content = fs.readFileSync(filePath, 'utf8');
  let original = content;

  replacements.forEach(r => {
    content = content.replace(r.from, r.to);
  });

  if (content !== original) {
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`Updated: ${path.relative(ROOT, filePath)}`);
    modifiedCount++;
  }
});

console.log(`\nSuccessfully updated ${modifiedCount} files.`);
