import { z } from "zod";

export const BookingSchema = z.object({
  customerName: z.string().min(2, "Name must be at least 2 characters").max(100),
  customerEmail: z.string().email("Invalid email address"),
  customerPhone: z.string().min(7, "Phone number too short").max(20),
  packageId: z.string().min(1, "Package ID required"),
  packageName: z.string().min(1, "Package name required"),
  destinationId: z.string().min(1, "Destination ID required"),
  destinationName: z.string().min(1, "Destination name required"),
  persons: z.coerce.number().int().min(1).max(50),
  travelDate: z.string().min(1, "Travel date required"),
  message: z.string().max(1000).optional(),
  locale: z.string().default("en"),
});

export const NewsletterSchema = z.object({
  email: z.string().email("Invalid email address"),
  name: z.string().max(100).optional(),
  phone: z.string().max(20).optional(),
  locale: z.string().default("en"),
  source: z.string().default("newsletter"),
});

export const ContactSchema = z.object({
  name: z.string().min(2).max(100),
  email: z.string().email(),
  phone: z.string().max(20).optional(),
  subject: z.string().min(2).max(200),
  message: z.string().min(20, "Message must be at least 20 characters").max(3000),
  locale: z.string().default("en"),
});

export const AdminWebhookSchema = z.object({
  action: z.enum(["toggle_availability", "update_price"]),
  packageId: z.string().min(1),
  isAvailable: z.boolean().optional(),
  price: z.number().positive().optional(),
  discountPrice: z.number().positive().nullable().optional(),
});

export type BookingInput = z.infer<typeof BookingSchema>;
export type NewsletterInput = z.infer<typeof NewsletterSchema>;
export type ContactInput = z.infer<typeof ContactSchema>;
export type AdminWebhookInput = z.infer<typeof AdminWebhookSchema>;
