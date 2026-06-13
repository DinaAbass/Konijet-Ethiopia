"use server";

import { BookingSchema, NewsletterSchema, ContactSchema } from "./validations";
import {
  createBooking,
  createLead,
  createContact,
} from "./appwrite-server";

type ActionResult = { success: boolean; message: string; data?: unknown };

async function fireWebhook(url: string, payload: unknown): Promise<void> {
  if (!url) return;
  try {
    await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
      signal: AbortSignal.timeout(8000),
    });
  } catch (err) {
    console.error("[Webhook] Failed to reach n8n:", err);
  }
}

export async function submitBooking(
  prevState: ActionResult | null,
  formData: FormData
): Promise<ActionResult> {
  const raw = Object.fromEntries(formData.entries());
  const parsed = BookingSchema.safeParse(raw);
  if (!parsed.success) {
    return {
      success: false,
      message: parsed.error.issues[0]?.message || "Invalid form data",
    };
  }
  try {
    const data = parsed.data;
    const bookingId = await createBooking({
      ...data,
      status: "new",
      createdAt: new Date().toISOString(),
    });
    fireWebhook(process.env.N8N_BOOKING_WEBHOOK_URL!, {
      ...data,
      bookingId,
    });
    return {
      success: true,
      message: "Booking received! We will contact you within 24 hours.",
      data: { bookingId },
    };
  } catch (err) {
    console.error("[Action] submitBooking error:", err);
    return {
      success: false,
      message: "Something went wrong. Please try WhatsApp or email us directly.",
    };
  }
}

export async function submitNewsletter(
  prevState: ActionResult | null,
  formData: FormData
): Promise<ActionResult> {
  const raw = Object.fromEntries(formData.entries());
  const parsed = NewsletterSchema.safeParse(raw);
  if (!parsed.success) {
    return {
      success: false,
      message: parsed.error.issues[0]?.message || "Invalid email address",
    };
  }
  try {
    const data = parsed.data;
    await createLead({ ...data, subscribedAt: new Date().toISOString() });
    fireWebhook(process.env.N8N_NEWSLETTER_WEBHOOK_URL!, data);
    return {
      success: true,
      message: "Subscribed! Check your email for a welcome message.",
    };
  } catch (err) {
    console.error("[Action] submitNewsletter error:", err);
    return { success: false, message: "Subscription failed. Please try again." };
  }
}

export async function submitContact(
  prevState: ActionResult | null,
  formData: FormData
): Promise<ActionResult> {
  const raw = Object.fromEntries(formData.entries());
  const parsed = ContactSchema.safeParse(raw);
  if (!parsed.success) {
    return {
      success: false,
      message: parsed.error.issues[0]?.message || "Invalid form data",
    };
  }
  try {
    const data = parsed.data;
    await createContact({
      ...data,
      status: "unread",
      createdAt: new Date().toISOString(),
    });
    fireWebhook(process.env.N8N_CONTACT_WEBHOOK_URL!, data);
    return {
      success: true,
      message: "Message sent! We will reply within 24 hours.",
    };
  } catch (err) {
    console.error("[Action] submitContact error:", err);
    return { success: false, message: "Failed to send message. Please try WhatsApp." };
  }
}
