const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const EN_I18N_FILE = path.join(ROOT, 'src', 'lib', 'i18n', 'en.ts');

// We can just require the compiled tours.js directly!
const { TOURS } = require('./tours.js');

function objectToTSString(obj, indent = 0) {
  const pad = "  ".repeat(indent);
  const padInner = "  ".repeat(indent + 1);
  if (Array.isArray(obj)) {
    if (obj.length === 0) return "[]";
    const items = obj.map(item => {
      if (typeof item === "string") return `${padInner}${JSON.stringify(item)}`;
      if (typeof item === "object" && item !== null) {
        const innerEntries = Object.entries(item).map(([k,v]) => {
          const key = /^[a-zA-Z_$][a-zA-Z0-9_$]*$/.test(k) ? k : JSON.stringify(k);
          return `${padInner}  ${key}: ${JSON.stringify(v)},`;
        }).join("\n");
        return `${padInner}{\n${innerEntries}\n${padInner}}`;
      }
      return `${padInner}${JSON.stringify(item)}`;
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

function main() {
  console.log(`Loaded ${TOURS.length} tours from compiled tours.js.`);

  // Load existing en.ts i18n file
  const enRaw = fs.readFileSync(EN_I18N_FILE, 'utf8');
  const enClean = enRaw
    .replace(/const\s+en\s*=\s*/, '')
    .replace(/export\s+default\s+en\s*;?\s*$/, '')
    .trim()
    .replace(/;$/, '');
  
  let enObj;
  try {
    enObj = new Function(`return ${enClean}`)();
  } catch (e) {
    console.error('Failed to parse en.ts:', e.message);
    return;
  }

  // Create tours translation object
  const toursTranslations = {};
  TOURS.forEach(tour => {
    toursTranslations[tour.slug] = {
      title: tour.title,
      durationLabel: tour.durationLabel,
      region: tour.region,
      shortDescription: tour.shortDescription,
      longDescription: tour.longDescription,
      highlights: tour.highlights,
      itinerary: tour.itinerary.map(item => ({
        day: item.day,
        title: item.title,
        details: item.details
      })),
      includes: tour.includes,
      excludes: tour.excludes
    };
  });

  // Merge tours translations into enObj
  enObj.tours = toursTranslations;

  // Convert enObj back to TS string
  const output = `const en = ${objectToTSString(enObj, 0)};\n\nexport default en;\n`;
  fs.writeFileSync(EN_I18N_FILE, output, 'utf8');
  console.log(`Successfully injected ${TOURS.length} tours into src/lib/i18n/en.ts!`);
}

main();
