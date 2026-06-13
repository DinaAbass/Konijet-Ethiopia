import { Client, Databases, ID, Query } from "node-appwrite";

export interface Destination {
  $id: string;
  name: string;
  slug: string;
  region: string;
  lat: number;
  lng: number;
  description: string;
  coverImageID: string;
  tagline?: string;
  isActive: boolean;
}

export interface Package {
  $id: string;
  destinationId: string;
  name: string;
  slug: string;
  duration: string;
  price: number;
  discountPrice?: number | null;
  maxPersons: number;
  minPersons: number;
  imageIds: string;
  description: string;
  inclusions: string;
  exclusions: string;
  highlights?: string;
  isAvailable: boolean;
  isFeatured: boolean;
  order?: number;
}

export interface Booking {
  $id?: string;
  packageId: string;
  packageName: string;
  destinationId: string;
  destinationName: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  persons: number;
  travelDate: string;
  message?: string;
  status: "new" | "contacted" | "confirmed" | "cancelled";
  locale: string;
  createdAt: string;
}

export interface Lead {
  $id?: string;
  email: string;
  name?: string;
  phone?: string;
  locale: string;
  source: string;
  subscribedAt: string;
}

export interface Contact {
  $id?: string;
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
  locale: string;
  status: string;
  createdAt: string;
}

function getClient(): Client {
  const client = new Client();
  client
    .setEndpoint(process.env.APPWRITE_ENDPOINT!)
    .setProject(process.env.APPWRITE_PROJECT_ID!)
    .setKey(process.env.APPWRITE_API_KEY!);
  return client;
}

const DB_ID = () => process.env.APPWRITE_DATABASE_ID!;
const DEST_COL = () => process.env.APPWRITE_DESTINATIONS_COLLECTION_ID!;
const PKG_COL = () => process.env.APPWRITE_PACKAGES_COLLECTION_ID!;
const BOOK_COL = () => process.env.APPWRITE_BOOKINGS_COLLECTION_ID!;
const LEADS_COL = () => process.env.APPWRITE_LEADS_COLLECTION_ID!;
const CONTACT_COL = () => process.env.APPWRITE_CONTACTS_COLLECTION_ID!;
const BUCKET = () => process.env.APPWRITE_BUCKET_ID!;

export function getImageUrl(fileId: string): string {
  if (!fileId) return "/images/placeholder.jpg";
  return `${process.env.APPWRITE_ENDPOINT}/storage/buckets/${BUCKET()}/files/${fileId}/view?project=${process.env.APPWRITE_PROJECT_ID}`;
}

export function getImageUrls(fileIds: string | string[]): string[] {
  const ids = typeof fileIds === "string" ? fileIds.split(",").filter(Boolean) : (fileIds || []);
  return ids.map(getImageUrl);
}

export async function getDestinations(): Promise<Destination[]> {
  try {
    const client = getClient();
    const db = new Databases(client);
    const res = await db.listDocuments(DB_ID(), DEST_COL(), [
      Query.equal("isActive", true),
      Query.orderAsc("name"),
      Query.limit(50),
    ]);
    return res.documents as unknown as Destination[];
  } catch (err) {
    console.error("[Appwrite] getDestinations error:", err);
    return [];
  }
}

export async function getDestinationBySlug(slug: string): Promise<Destination | null> {
  try {
    const client = getClient();
    const db = new Databases(client);
    const res = await db.listDocuments(DB_ID(), DEST_COL(), [
      Query.equal("slug", slug),
      Query.equal("isActive", true),
      Query.limit(1),
    ]);
    return (res.documents[0] as unknown as Destination) || null;
  } catch (err) {
    console.error("[Appwrite] getDestinationBySlug error:", err);
    return null;
  }
}

export async function getPackagesByDestination(destinationId: string): Promise<Package[]> {
  try {
    const client = getClient();
    const db = new Databases(client);
    const res = await db.listDocuments(DB_ID(), PKG_COL(), [
      Query.equal("destinationId", destinationId),
      Query.equal("isAvailable", true),
      Query.orderAsc("order"),
      Query.limit(20),
    ]);
    return res.documents as unknown as Package[];
  } catch (err) {
    console.error("[Appwrite] getPackagesByDestination error:", err);
    return [];
  }
}

export async function getFeaturedPackages(): Promise<Package[]> {
  try {
    const client = getClient();
    const db = new Databases(client);
    const res = await db.listDocuments(DB_ID(), PKG_COL(), [
      Query.equal("isFeatured", true),
      Query.equal("isAvailable", true),
      Query.orderAsc("order"),
      Query.limit(6),
    ]);
    return res.documents as unknown as Package[];
  } catch (err) {
    console.error("[Appwrite] getFeaturedPackages error:", err);
    return [];
  }
}

export async function getPackageById(packageId: string): Promise<Package | null> {
  try {
    const client = getClient();
    const db = new Databases(client);
    const doc = await db.getDocument(DB_ID(), PKG_COL(), packageId);
    return doc as unknown as Package;
  } catch (err) {
    console.error("[Appwrite] getPackageById error:", err);
    return null;
  }
}

export async function createBooking(data: Omit<Booking, "$id">): Promise<string> {
  const client = getClient();
  const db = new Databases(client);
  const doc = await db.createDocument(DB_ID(), BOOK_COL(), ID.unique(), data);
  return doc.$id;
}

export async function createLead(data: Omit<Lead, "$id">): Promise<void> {
  try {
    const client = getClient();
    const db = new Databases(client);
    const existing = await db.listDocuments(DB_ID(), LEADS_COL(), [
      Query.equal("email", data.email),
      Query.limit(1),
    ]);
    if (existing.documents.length > 0) {
      await db.updateDocument(DB_ID(), LEADS_COL(), existing.documents[0].$id, {
        name: data.name || existing.documents[0].name,
        phone: data.phone || existing.documents[0].phone,
        locale: data.locale,
      });
    } else {
      await db.createDocument(DB_ID(), LEADS_COL(), ID.unique(), data);
    }
  } catch (err) {
    console.error("[Appwrite] createLead error:", err);
    throw err;
  }
}

export async function createContact(data: Omit<Contact, "$id">): Promise<void> {
  const client = getClient();
  const db = new Databases(client);
  await db.createDocument(DB_ID(), CONTACT_COL(), ID.unique(), data);
}

export async function updatePackageAvailability(
  packageId: string,
  isAvailable: boolean
): Promise<void> {
  const client = getClient();
  const db = new Databases(client);
  await db.updateDocument(DB_ID(), PKG_COL(), packageId, { isAvailable });
}

export async function updatePackagePrice(
  packageId: string,
  price?: number,
  discountPrice?: number | null
): Promise<void> {
  const client = getClient();
  const db = new Databases(client);
  const updateData: Record<string, unknown> = {};
  if (price !== undefined) updateData.price = price;
  if (discountPrice !== undefined) updateData.discountPrice = discountPrice;
  await db.updateDocument(DB_ID(), PKG_COL(), packageId, updateData);
}
