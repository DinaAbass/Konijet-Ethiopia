const fs = require('fs');
const path = require('path');

// 1. Read Markdown headings
const mdPath = 'c:\\Users\\Sara\\OneDrive\\Documents\\Konijet_Ethiopia\\##ADDIS ABABA CITY TOURS & DAY TRIP.md';
const content = fs.readFileSync(mdPath, 'utf8');
const lines = content.split(/\r?\n/);

const mdSlugs = new Set();
lines.forEach(line => {
  if (line.includes('**#')) {
    const match = line.match(/\*\*#([a-zA-Z0-9_-]+)/);
    if (match) {
      mdSlugs.add(match[1]);
    }
  }
});

console.log(`Unique slugs in Markdown: ${mdSlugs.size}`);

// 2. Read tours.ts TOURS
const toursTSContent = fs.readFileSync('c:\\Users\\Sara\\OneDrive\\Documents\\Konijet_Ethiopia\\src\\data\\tours.ts', 'utf8');

// Find all slug: "..." in tours.ts
const tsSlugs = new Set();
const regex = /slug:\s*["']([a-zA-Z0-9_-]+)["']/g;
let match;
while ((match = regex.exec(toursTSContent)) !== null) {
  tsSlugs.add(match[1]);
}

console.log(`Unique slugs in tours.ts: ${tsSlugs.size}`);

// 3. Find differences
const missingInTS = [...mdSlugs].filter(s => !tsSlugs.has(s));
console.log('Slugs in Markdown but missing in tours.ts:', missingInTS.length);
console.log(missingInTS);

const extraInTS = [...tsSlugs].filter(s => !mdSlugs.has(s));
console.log('Slugs in tours.ts but missing in Markdown:', extraInTS.length);
console.log(extraInTS);
