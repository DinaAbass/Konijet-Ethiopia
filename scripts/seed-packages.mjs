import { Client, Databases, ID, Query } from "node-appwrite";
import "dotenv/config";

const client = new Client();
client
  .setEndpoint(process.env.APPWRITE_ENDPOINT)
  .setProject(process.env.APPWRITE_PROJECT_ID)
  .setKey(process.env.APPWRITE_API_KEY);

const db = new Databases(client);
const DB_ID = process.env.APPWRITE_DATABASE_ID;
const DEST_COL = process.env.APPWRITE_DESTINATIONS_COLLECTION_ID;
const PKG_COL = process.env.APPWRITE_PACKAGES_COLLECTION_ID;

const DESTINATIONS = [
  {
    slug: "lalibela",
    name: "Lalibela",
    region: "Amhara",
    lat: 12.0319,
    lng: 39.0473,
    description: "Rock-hewn churches carved from living stone — a living UNESCO marvel and Ethiopia's holiest city.",
    tagline: "The Jerusalem of Africa",
  },
  {
    slug: "axum",
    name: "Axum",
    region: "Tigray",
    lat: 14.1212,
    lng: 38.7239,
    description: "Ancient stelae and the legendary home of the Ark of the Covenant — seat of the Axumite Empire.",
    tagline: "Cradle of Ethiopian civilization",
  },
  {
    slug: "danakil",
    name: "Danakil Depression",
    region: "Afar",
    lat: 14.2417,
    lng: 40.3,
    description: "Otherworldly sulfur springs, active lava lakes and the lowest, hottest place on Earth.",
    tagline: "The hottest place on Earth",
  },
  {
    slug: "omo",
    name: "Omo Valley",
    region: "SNNPR",
    lat: 5.5,
    lng: 36.0,
    description: "Home to ancient cultures and timeless traditions of southern Ethiopia — a living anthropological treasure.",
    tagline: "Where ancient traditions live on",
  },
  {
    slug: "simien",
    name: "Simien Mountains",
    region: "Amhara",
    lat: 13.1833,
    lng: 38.0667,
    description: "Jagged peaks, deep gorges, and gelada baboons in the Roof of Africa — a UNESCO World Heritage park.",
    tagline: "The Roof of Africa",
  },
  {
    slug: "bale",
    name: "Bale Mountains",
    region: "Oromia",
    lat: 6.8333,
    lng: 39.75,
    description: "Afroalpine plateaus, Harenna cloud forest and the rare Ethiopian wolf — a biodiversity hotspot.",
    tagline: "Land of the Ethiopian wolf",
  },
];

const TOURS = [
  {
    slug: "4-days-chebera-churchura",
    title: "4 Days Chebera-Churchura National Park Wildlife Safari",
    categories: ["adventure-safari"],
    durationDays: 4,
    durationLabel: "4 Days",
    priceUSD: 920,
    available: true,
    region: "SNNPR",
  },
  {
    slug: "3-days-bale-mountains",
    title: "3 Days Bale Mountains Tour from Addis Ababa",
    categories: ["adventure-safari"],
    durationDays: 3,
    durationLabel: "3 Days",
    priceUSD: 690,
    available: true,
    region: "Oromia",
  },
  {
    slug: "3-days-erta-ale-danakil",
    title: "3 Days Erta Ale Volcano & Danakil Depression Tour",
    categories: ["adventure-safari"],
    durationDays: 3,
    durationLabel: "3 days",
    priceUSD: 1190,
    available: true,
    region: "Afar",
  },
  {
    slug: "6-days-danakil-lalibela",
    title: "6 Days / 5 Nights – Danakil Depression & Lalibela Highlights Tour",
    categories: ["adventure-safari", "historical"],
    durationDays: 6,
    durationLabel: "6 Days / 5 Nights",
    priceUSD: 1780,
    available: true,
    region: "Afar / Amhara",
  },
  {
    slug: "7-day-danakil-gheralta",
    title: "7-Day Adventure: Danakil Depression & Gheralta Churches",
    categories: ["adventure-safari", "historical"],
    durationDays: 7,
    durationLabel: "7-Days",
    priceUSD: 1990,
    available: true,
    region: "Afar / Tigray",
  },
  {
    slug: "10-day-danakil-lalibela-omo",
    title: "10-Day Tour: Danakil Depression, Lalibela & Omo Valley Culture",
    categories: ["adventure-safari", "cultural", "combined"],
    durationDays: 10,
    durationLabel: "10 Days",
    priceUSD: 2890,
    available: true,
    region: "Multi-region",
  },
  {
    slug: "16-days-grand-cultural-wildlife",
    title: "16 Days Ethiopia Grand Cultural, Wildlife & Community Experience Tour",
    categories: ["adventure-safari", "combined", "cultural", "historical"],
    durationDays: 16,
    durationLabel: "16-Days",
    priceUSD: 4290,
    available: true,
    region: "Multi-region",
  },
  {
    slug: "16-days-bird-watching",
    title: "16 Days Bird Watching Tour",
    categories: ["birding"],
    durationDays: 16,
    durationLabel: "16 Days",
    priceUSD: 4180,
    available: true,
    region: "Multi-region",
  },
  {
    slug: "2-day-awash-safari",
    title: "2-Day Awash National Park Safari from Addis Ababa",
    categories: ["city-day-trips"],
    durationDays: 2,
    durationLabel: "2 Days",
    priceUSD: 399,
    oldPriceUSD: 499,
    available: true,
    region: "Afar",
  },
  {
    slug: "food-tour-addis",
    title: "Half Day Group Tour – Food Tour in Addis Ababa",
    categories: ["city-day-trips"],
    durationDays: 1,
    durationLabel: "Half day",
    priceUSD: 75,
    oldPriceUSD: 85,
    available: true,
    region: "Addis Ababa",
  },
  {
    slug: "debre-zeyit-day-trip",
    title: "Debre Zeyit (Bishoftu) Relaxing Day Trip",
    categories: ["city-day-trips"],
    durationDays: 1,
    durationLabel: "8 Hours",
    priceUSD: 95,
    available: true,
    region: "Oromia",
  },
  {
    slug: "ethiopian-cooking-class",
    title: "Ethiopian Cooking Class: Flavors of Ethiopia",
    categories: ["city-day-trips"],
    durationDays: 1,
    durationLabel: "3 Hours",
    priceUSD: 65,
    available: true,
    region: "Addis Ababa",
  },
  {
    slug: "addis-nightlife-pub-crawl",
    title: "Addis Ababa Nightlife Tour & Pub Crawl",
    categories: ["city-day-trips"],
    durationDays: 1,
    durationLabel: "5 Hours",
    priceUSD: 55,
    available: true,
    region: "Addis Ababa",
  },
  {
    slug: "wenchi-crater-lake",
    title: "Day Trip to Wenchi Crater Lake",
    categories: ["city-day-trips"],
    durationDays: 1,
    durationLabel: "9 Hours",
    priceUSD: 130,
    oldPriceUSD: 160,
    available: true,
    region: "Oromia",
  },
  {
    slug: "debre-libanos-portuguese-bridge",
    title: "Day Trip to Debre Libanos Monastery & Portuguese Bridge",
    categories: ["city-day-trips"],
    durationDays: 1,
    durationLabel: "8 Hours",
    priceUSD: 120,
    available: true,
    region: "Oromia",
  },
  {
    slug: "half-day-addis-city",
    title: "A Half Day Addis Ababa City Tour",
    categories: ["city-day-trips"],
    durationDays: 1,
    durationLabel: "5 Hours",
    priceUSD: 45,
    available: true,
    region: "Addis Ababa",
  },
  {
    slug: "addis-surrounding",
    title: "Addis Ababa City Tours & Surrounding",
    categories: ["city-day-trips"],
    durationDays: 7,
    durationLabel: "7 Days",
    priceUSD: 980,
    available: true,
    region: "Addis Ababa",
  },
  {
    slug: "full-day-addis",
    title: "Full-Day Addis Ababa City Tour",
    categories: ["city-day-trips"],
    durationDays: 1,
    durationLabel: "8 Hours",
    priceUSD: 80,
    available: true,
    region: "Addis Ababa",
  },
  {
    slug: "addis-food-tasting",
    title: "Addis Ababa Food Tasting Tour",
    categories: ["city-day-trips"],
    durationDays: 1,
    durationLabel: "4 Hours",
    priceUSD: 60,
    available: true,
    region: "Addis Ababa",
  },
  {
    slug: "ethiopian-coffee-heritage-day",
    title: "Delve into Ethiopian Coffee Heritage & Urban Culture in a Single Day",
    categories: ["coffee", "city-day-trips"],
    durationDays: 1,
    durationLabel: "1 Day",
    priceUSD: 90,
    available: true,
    region: "Addis Ababa",
  },
  {
    slug: "3-day-yirgalem-coffee",
    title: "3-Day Yirgalem Coffee Tour",
    categories: ["coffee"],
    durationDays: 3,
    durationLabel: "3 Days",
    priceUSD: 590,
    available: true,
    region: "Sidama",
  },
  {
    slug: "6-day-sidama-yirgacheffe",
    title: "6-Day Sidama & Yirgacheffe Coffee & Culture Tour from Addis Ababa",
    categories: ["coffee"],
    durationDays: 6,
    durationLabel: "6 days",
    priceUSD: 1290,
    available: true,
    region: "Sidama / SNNPR",
  },
  {
    slug: "14-days-danakil-lalibela-omo",
    title: "14 Days Ethiopia Tour – Danakil Depression, Lalibela and Omo Valley Cultural Experience",
    categories: ["combined", "adventure-safari", "cultural", "historical"],
    durationDays: 14,
    durationLabel: "14-Days",
    priceUSD: 3890,
    available: true,
    region: "Multi-region",
  },
  {
    slug: "15-days-historical-cultural-omo",
    title: "15 days Historical, Cultural and Omo Valley Tour",
    categories: ["combined", "cultural", "historical"],
    durationDays: 15,
    durationLabel: "15 Days",
    priceUSD: 4090,
    available: true,
    region: "Multi-region",
  },
  {
    slug: "21-days-historical-cultural",
    title: "21 Days Historical & Cultural Tour",
    categories: ["combined", "cultural", "historical"],
    durationDays: 21,
    durationLabel: "21 days",
    priceUSD: 5790,
    available: true,
    region: "Multi-region",
  },
  {
    slug: "3-day-south-omo-group",
    title: "3 Day Guided Group Tour of South Omo, Ethiopia",
    categories: ["cultural"],
    durationDays: 3,
    durationLabel: "3 days",
    priceUSD: 690,
    available: true,
    region: "SNNPR",
  },
  {
    slug: "4-day-omo-cultural",
    title: "4-Day Omo Valley Cultural Tour from Addis Ababa",
    categories: ["cultural"],
    durationDays: 4,
    durationLabel: "4 Days / 3 Nights",
    priceUSD: 990,
    available: true,
    region: "SNNPR",
  },
  {
    slug: "8-day-omo-tribes",
    title: "8 Days Omo Valley Tribes Tour",
    categories: ["cultural"],
    durationDays: 8,
    durationLabel: "8 days / 7 nights",
    priceUSD: 2190,
    available: true,
    region: "SNNPR",
  },
  {
    slug: "10-day-omo-tribes-2",
    title: "10 Days Omo Valley Tribes Tour",
    categories: ["cultural"],
    durationDays: 10,
    durationLabel: "10 days / 9 nights",
    priceUSD: 2690,
    available: true,
    region: "SNNPR",
  },
  {
    slug: "12-day-south-omo-1",
    title: "12 Days South Omo & Danakil Depression Tour",
    categories: ["cultural", "adventure-safari"],
    durationDays: 12,
    durationLabel: "12 days / 11 nights",
    priceUSD: 3290,
    available: true,
    region: "SNNPR",
  },
  {
    slug: "8-day-genna",
    title: "8 Days Genna (Ethiopian Christmas) Festival Tour",
    categories: ["festival"],
    durationDays: 8,
    durationLabel: "8 days / 7 nights",
    priceUSD: 2290,
    available: true,
    region: "Amhara",
  },
  {
    slug: "8-day-temeket",
    title: "8 Days Timkat (Epiphany) Festival Tour",
    categories: ["festival"],
    durationDays: 8,
    durationLabel: "8 days / 7 nights",
    priceUSD: 2290,
    available: true,
    region: "Amhara",
  },
  {
    slug: "7-day-meskel",
    title: "7 Days Meskel Festival Tour",
    categories: ["festival"],
    durationDays: 7,
    durationLabel: "7 days / 6 nights",
    priceUSD: 1890,
    available: true,
    region: "Addis Ababa / Amhara",
  },
  {
    slug: "tiya-adadi-mariam",
    title: "Day Trip to Tiya UNESCO Stelae & Adadi Mariam Rock Church",
    categories: ["city-day-trips", "historical"],
    durationDays: 1,
    durationLabel: "8 Hours",
    priceUSD: 110,
    available: true,
    region: "SNNPR",
  },
  {
    slug: "2-day-lalibela",
    title: "2 Days Lalibela Rock Churches Tour",
    categories: ["historical"],
    durationDays: 2,
    durationLabel: "2 Days / 1 Night",
    priceUSD: 590,
    available: true,
    region: "Amhara",
  },
  {
    slug: "5-days-awash-harar",
    title: "5 Days Awash Park & Harar Historic City Tour",
    categories: ["historical", "adventure-safari"],
    durationDays: 5,
    durationLabel: "5 Days / 4 Nights",
    priceUSD: 1390,
    available: true,
    region: "Afar / Harari",
  },
  {
    slug: "6-days-northern-classic",
    title: "6 Days Northern Classic Tour – Bahir Dar, Gondar & Lalibela",
    categories: ["historical"],
    durationDays: 6,
    durationLabel: "6 Days / 5 Nights",
    priceUSD: 1690,
    available: true,
    region: "Amhara",
  },
  {
    slug: "7-days-lalibela-omo",
    title: "7 Days Lalibela & Omo Valley Combined Tour",
    categories: ["historical", "cultural"],
    durationDays: 7,
    durationLabel: "7 Days / 6 Nights",
    priceUSD: 1990,
    available: true,
    region: "Amhara / SNNPR",
  },
  {
    slug: "14-days-cultural-tour",
    title: "14 Days Cultural & Historical Tour of Ethiopia",
    categories: ["cultural", "historical"],
    durationDays: 14,
    durationLabel: "14 Days",
    priceUSD: 3890,
    available: true,
    region: "Multi-region",
  },
  {
    slug: "historical-tour-iii",
    title: "Historical Tour III – Axum, Gondar, Lalibela & Harar",
    categories: ["historical"],
    durationDays: 12,
    durationLabel: "12 Days / 11 Nights",
    priceUSD: 3190,
    available: true,
    region: "Multi-region",
  },
  {
    slug: "historical-tour-ii",
    title: "Historical Tour II – Gondar, Lalibela & Axum",
    categories: ["historical"],
    durationDays: 8,
    durationLabel: "8 Days / 7 Nights",
    priceUSD: 2190,
    available: true,
    region: "Amhara / Tigray",
  },
  {
    slug: "historical-tour-i",
    title: "Historical Tour I – Bahir Dar, Gondar & Lalibela",
    categories: ["historical"],
    durationDays: 5,
    durationLabel: "5 Days / 4 Nights",
    priceUSD: 1390,
    available: true,
    region: "Amhara",
  },
  {
    slug: "historical-harar",
    title: "4 Days Harar Historic City Tour",
    categories: ["historical"],
    durationDays: 4,
    durationLabel: "4 Days / 3 Nights",
    priceUSD: 1090,
    available: true,
    region: "Harari",
  },
  {
    slug: "5-days-awash-park-harar",
    title: "5 Days Awash Park & Harar City Tour",
    categories: ["historical", "adventure-safari"],
    durationDays: 5,
    durationLabel: "5 Days / 4 Nights",
    priceUSD: 1390,
    available: true,
    region: "Afar / Harari",
  },
  {
    slug: "3-day-tigray-trekking",
    title: "3 Days Tigray Rock Churches Trekking Tour",
    categories: ["trekking"],
    durationDays: 3,
    durationLabel: "3 Days / 2 Nights",
    priceUSD: 790,
    available: true,
    region: "Tigray",
  },
  {
    slug: "8-days-bale-trekking",
    title: "8 Days Bale Mountains Trekking Tour",
    categories: ["trekking"],
    durationDays: 8,
    durationLabel: "8 Days / 7 Nights",
    priceUSD: 2190,
    available: true,
    region: "Oromia",
  },
  {
    slug: "9-days-simien-trekking",
    title: "9 Days Simien Mountains Trekking Tour",
    categories: ["trekking"],
    durationDays: 9,
    durationLabel: "9 Days / 8 Nights",
    priceUSD: 2490,
    available: true,
    region: "Amhara",
  },
  {
    slug: "4-days-rock-tigray",
    title: "4 Days Rock Churches of Tigray Tour",
    categories: ["trekking", "historical"],
    durationDays: 4,
    durationLabel: "4 Days / 3 Nights",
    priceUSD: 1090,
    available: true,
    region: "Tigray",
  },
  {
    slug: "explore-addis-ababa-city-tours",
    title: "3 Days Explore Addis Ababa City & Surroundings Tour",
    categories: ["city-day-trips"],
    durationDays: 3,
    durationLabel: "3 Days",
    priceUSD: 290,
    oldPriceUSD: 350,
    available: true,
    region: "Addis Ababa / Oromia",
  },
];

const REGION_TO_DESTINATION_SLUG = {
  Amhara: "lalibela",
  Tigray: "axum",
  Afar: "danakil",
  "Afar / Amhara": "danakil",
  "Afar / Tigray": "danakil",
  "Afar / Harari": "danakil",
  SNNPR: "omo",
  Sidama: "omo",
  "Sidama / SNNPR": "omo",
  Oromia: "bale",
  "Addis Ababa": "lalibela",
  "Addis Ababa / Amhara": "lalibela",
  "Addis Ababa / Oromia": "lalibela",
  "Amhara / Tigray": "axum",
  "Amhara / SNNPR": "lalibela",
  Harari: "axum",
  "Multi-region": "lalibela",
};

function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

async function seedDestinations() {
  console.log("Step 1: Seeding destinations...\n");

  let existing = [];
  try {
    const res = await db.listDocuments(DB_ID, DEST_COL, [Query.limit(100)]);
    existing = res.documents;
    console.log(`  Found ${existing.length} existing destinations.`);
  } catch (err) {
    console.error("  Failed to fetch destinations:", err.message);
  }

  const existingSlugs = new Set(existing.map((d) => d.slug));
  const slugToId = {};
  existing.forEach((d) => {
    slugToId[d.slug] = d.$id;
  });

  let created = 0;
  for (const dest of DESTINATIONS) {
    if (existingSlugs.has(dest.slug)) {
      console.log(`  ⏭  Destination "${dest.slug}" already exists [ID: ${slugToId[dest.slug]}]`);
      continue;
    }

    try {
      const doc = await db.createDocument(DB_ID, DEST_COL, ID.unique(), {
        name: dest.name,
        slug: dest.slug,
        region: dest.region,
        lat: dest.lat,
        lng: dest.lng,
        description: dest.description,
        coverImageID: "",
        tagline: dest.tagline || "",
        isActive: true,
      });
      slugToId[dest.slug] = doc.$id;
      console.log(`  ✅ Created destination "${dest.slug}" [ID: ${doc.$id}]`);
      created++;
      await sleep(500);
    } catch (err) {
      console.error(`  ❌ Failed to create destination "${dest.slug}": ${err.message}`);
    }
  }

  console.log(`\n  Destinations seeded: ${created} created, ${DESTINATIONS.length - created} already existed.\n`);
  return slugToId;
}

async function seedPackages(slugToDestId) {
  console.log("Step 2: Seeding packages...\n");

  let existingPackages = [];
  try {
    const res = await db.listDocuments(DB_ID, PKG_COL, [Query.limit(500)]);
    existingPackages = res.documents;
    console.log(`  Found ${existingPackages.length} existing packages.`);
  } catch (err) {
    console.error("  Failed to fetch existing packages:", err.message);
  }

  const existingSlugs = new Set(existingPackages.map((p) => p.slug));

  const destIdToName = {};
  for (const [slug, id] of Object.entries(slugToDestId)) {
    destIdToName[id] = DESTINATIONS.find((d) => d.slug === slug)?.name || slug;
  }

  let created = 0;
  let skipped = 0;
  let failed = 0;

  for (let i = 0; i < TOURS.length; i++) {
    const tour = TOURS[i];

    if (existingSlugs.has(tour.slug)) {
      console.log(`  ⏭  [${i + 1}/${TOURS.length}] Skipping "${tour.slug}" — already exists`);
      skipped++;
      continue;
    }

    const destSlug = REGION_TO_DESTINATION_SLUG[tour.region];
    const destId = slugToDestId[destSlug];

    if (!destId) {
      console.warn(
        `  ⚠  [${i + 1}/${TOURS.length}] Skipping "${tour.slug}" — no destination for region "${tour.region}" (mapped: "${destSlug}")`
      );
      skipped++;
      continue;
    }

    const packageData = {
      destinationId: destId,
      name: tour.title,
      slug: tour.slug,
      duration: tour.durationLabel,
      price: tour.priceUSD,
      discountPrice: tour.oldPriceUSD || null,
      maxPersons: 15,
      minPersons: 1,
      imageIds: "",
      description: tour.title,
      inclusions: "Transport, guide, accommodation, meals, entrance fees, water",
      exclusions: "Flights, visa, insurance, personal expenses, tips",
      highlights: tour.categories.join(","),
      isAvailable: tour.available,
      isFeatured: i < 6,
      order: i + 1,
    };

    try {
      const doc = await db.createDocument(DB_ID, PKG_COL, ID.unique(), packageData);
      console.log(
        `  ✅ [${i + 1}/${TOURS.length}] "${tour.slug}" → ${destIdToName[destId]} ($${tour.priceUSD}) [ID: ${doc.$id}]`
      );
      created++;
    } catch (err) {
      console.error(
        `  ❌ [${i + 1}/${TOURS.length}] Failed "${tour.slug}": ${err.message}`
      );
      failed++;
    }

    if ((i + 1) % 10 === 0) {
      console.log("     ... pausing 2s for rate limit ...");
      await sleep(2000);
    }
  }

  console.log(`\n  Packages: ${created} created, ${skipped} skipped, ${failed} failed (total: ${TOURS.length})\n`);
  return { created, skipped, failed };
}

async function printSummary() {
  console.log("=== Final Summary ===\n");

  try {
    const destRes = await db.listDocuments(DB_ID, DEST_COL, [Query.limit(100)]);
    console.log(`Destinations (${destRes.documents.length}):\n`);
    destRes.documents.forEach((d) => {
      console.log(`  ${d.$id}  ${d.slug.padEnd(12)} ${d.name}`);
    });
  } catch (err) {
    console.error("Failed to list destinations:", err.message);
  }

  try {
    const pkgRes = await db.listDocuments(DB_ID, PKG_COL, [Query.limit(500)]);
    console.log(`\nPackages (${pkgRes.documents.length}):\n`);
    console.log("  ID                     Slug                                     Price  Avail  Dest");
    console.log("  " + "─".repeat(95));
    pkgRes.documents.forEach((p) => {
      const id = p.$id.padEnd(22);
      const slug = p.slug.padEnd(40);
      const price = ("$" + String(p.price)).padEnd(7);
      const avail = p.isAvailable ? "✅" : "❌";
      const dest = p.destinationId || "—";
      console.log(`  ${id} ${slug} ${price} ${avail}  ${dest}`);
    });
  } catch (err) {
    console.error("Failed to list packages:", err.message);
  }
}

async function main() {
  console.log("╔══════════════════════════════════════════════════════════════╗");
  console.log("║   Konijet Ethiopia — Appwrite Destinations & Package Seeder ║");
  console.log("╚══════════════════════════════════════════════════════════════╝\n");

  const slugToDestId = await seedDestinations();
  await seedPackages(slugToDestId);
  await printSummary();

  console.log("\n✅ Done! Use the package IDs above with Telegram commands:");
  console.log("   /available PACKAGE_ID   /unavailable PACKAGE_ID");
  console.log("   /price PACKAGE_ID 1200  /discount PACKAGE_ID 999");
  console.log("   /cleardiscount PACKAGE_ID");
}

main().catch((err) => {
  console.error("Fatal error:", err);
  process.exit(1);
});
