import { Client, Databases } from "appwrite";

// Public/anon client config — replace via env when wired to a real Appwrite project.
const endpoint = import.meta.env.VITE_APPWRITE_ENDPOINT || "https://cloud.appwrite.io/v1";
const projectId = import.meta.env.VITE_APPWRITE_PROJECT_ID || "";
export const APPWRITE_DB_ID = import.meta.env.VITE_APPWRITE_DB_ID || "konijet";
export const COLLECTIONS = {
  destinations: import.meta.env.VITE_APPWRITE_DESTINATIONS || "destinations",
  packages: import.meta.env.VITE_APPWRITE_PACKAGES || "packages",
};

export const client = new Client();
if (projectId) client.setEndpoint(endpoint).setProject(projectId);
export const databases = new Databases(client);

export type Destination = {
  id: string;
  slug: string;
  name: string;
  region: string;
  lat: number;
  lng: number;
  blurb: string;
  image: string;
};

export type TourPackage = {
  id: string;
  destinationSlug: string;
  name: string;
  durationDays: number;
  priceUSD: number;
  description: string;
  image: string;
  highlights: string[];
};

import lalibela from "@/assets/dest-lalibela.jpg";
import danakil from "@/assets/dest-danakil.jpg";
import omo from "@/assets/dest-omo.jpg";
import axum from "@/assets/dest-axum.jpg";
import bale from "@/assets/dest-bale.jpg";
import simien from "@/assets/hero-ethiopia.jpg";

// Local fallback so the site is fully populated until Appwrite collections exist.
const FALLBACK_DESTINATIONS: Destination[] = [
  { id: "1", slug: "lalibela", name: "Lalibela", region: "Amhara", lat: 12.0319, lng: 39.0473, blurb: "Rock-hewn churches carved from living stone — a living UNESCO marvel.", image: lalibela },
  { id: "2", slug: "axum", name: "Axum", region: "Tigray", lat: 14.1212, lng: 38.7239, blurb: "Ancient stelae and the legendary home of the Ark of the Covenant.", image: axum },
  { id: "3", slug: "danakil", name: "Danakil Depression", region: "Afar", lat: 14.2417, lng: 40.3000, blurb: "Otherworldly sulfur springs and the lowest, hottest place on Earth.", image: danakil },
  { id: "4", slug: "omo", name: "Omo Valley", region: "SNNPR", lat: 5.5000, lng: 36.0000, blurb: "Home to ancient cultures and timeless traditions of southern Ethiopia.", image: omo },
  { id: "5", slug: "simien", name: "Simien Mountains", region: "Amhara", lat: 13.1833, lng: 38.0667, blurb: "Jagged peaks, deep gorges, and gelada baboons in the Roof of Africa.", image: simien },
  { id: "6", slug: "bale", name: "Bale Mountains", region: "Oromia", lat: 6.8333, lng: 39.7500, blurb: "Afroalpine plateaus and the rare Ethiopian wolf.", image: bale },
];

const FALLBACK_PACKAGES: TourPackage[] = [
  { id: "p1", destinationSlug: "lalibela", name: "Lalibela Pilgrim Trail", durationDays: 4, priceUSD: 890, description: "Explore all 11 rock-hewn churches with an Orthodox scholar guide.", image: lalibela, highlights: ["Bete Giyorgis at sunrise", "Asheton Maryam hike", "Traditional tej tasting"] },
  { id: "p2", destinationSlug: "axum", name: "Northern Historic Circuit", durationDays: 7, priceUSD: 1640, description: "Axum, Gondar and Lalibela — the heart of Ethiopia's Christian heritage.", image: axum, highlights: ["Stelae field", "Queen of Sheba's bath", "Royal castles of Gondar"] },
  { id: "p3", destinationSlug: "danakil", name: "Danakil Expedition", durationDays: 4, priceUSD: 1290, description: "Camp under the stars beside Erta Ale's lava lake and the salt flats.", image: danakil, highlights: ["Erta Ale volcano", "Dallol sulfur springs", "Salt caravan crossing"] },
  { id: "p4", destinationSlug: "omo", name: "Omo Valley Cultural Journey", durationDays: 8, priceUSD: 1980, description: "Meet the Mursi, Hamar and Karo communities with respectful local hosts.", image: omo, highlights: ["Hamar bull-jumping", "Key Afer market", "Mago National Park"] },
  { id: "p5", destinationSlug: "simien", name: "Simien Trekking Adventure", durationDays: 6, priceUSD: 1450, description: "Trek the Roof of Africa among gelada troops and 1000m cliffs.", image: simien, highlights: ["Imet Gogo viewpoint", "Gelada encounters", "Camp at Chennek"] },
  { id: "p6", destinationSlug: "bale", name: "Bale Wildlife Safari", durationDays: 5, priceUSD: 1180, description: "Search for the elusive Ethiopian wolf on the Sanetti Plateau.", image: bale, highlights: ["Sanetti Plateau drive", "Harenna cloud forest", "Endemic birding"] },
];

export async function getDestinations(): Promise<Destination[]> {
  if (!projectId) return FALLBACK_DESTINATIONS;
  try {
    const res = await databases.listDocuments(APPWRITE_DB_ID, COLLECTIONS.destinations);
    return res.documents.map((d: any) => ({ ...d, id: d.$id }));
  } catch {
    return FALLBACK_DESTINATIONS;
  }
}

export async function getPackages(destinationSlug?: string): Promise<TourPackage[]> {
  if (!projectId) {
    return destinationSlug ? FALLBACK_PACKAGES.filter(p => p.destinationSlug === destinationSlug) : FALLBACK_PACKAGES;
  }
  try {
    const res = await databases.listDocuments(APPWRITE_DB_ID, COLLECTIONS.packages);
    const all = res.documents.map((d: any) => ({ ...d, id: d.$id })) as TourPackage[];
    return destinationSlug ? all.filter(p => p.destinationSlug === destinationSlug) : all;
  } catch {
    return destinationSlug ? FALLBACK_PACKAGES.filter(p => p.destinationSlug === destinationSlug) : FALLBACK_PACKAGES;
  }
}
