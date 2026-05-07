import { useState } from "react";
import { useTranslation } from "react-i18next";
import { X, Loader2, MessageCircle, Mail } from "lucide-react";
import { z } from "zod";

const PHONE = (import.meta.env.VITE_WHATSAPP_NUMBER || "+251911000000").replace(/[^\d]/g, "");
const EMAIL = import.meta.env.VITE_COMPANY_EMAIL || "info@konjetethiopia.com";
const BOOKING_URL = import.meta.env.VITE_N8N_BOOKING_WEBHOOK_URL as string | undefined;

const schema = z.object({
  name: z.string().trim().min(2).max(100),
  email: z.string().trim().email().max(255),
  phone: z.string().trim().min(4).max(40),
  message: z.string().trim().max(1500).optional().or(z.literal("")),
});

interface Props {
  open: boolean;
  onClose: () => void;
  packageId: string;
  packageName: string;
  destinationId?: string;
  destinationName?: string;
}

export const BookingModal = ({ open, onClose, packageId, packageName, destinationId = "", destinationName = "" }: Props) => {
  const { t, i18n } = useTranslation();
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "" });

  if (!open) return null;

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const parsed = schema.safeParse(form);
    if (!parsed.success) { setStatus("error"); return; }
    setStatus("loading");
    try {
      if (!BOOKING_URL) throw new Error("missing webhook");
      const res = await fetch(BOOKING_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          customerName: form.name,
          customerEmail: form.email,
          customerPhone: form.phone,
          packageId,
          packageName,
          destinationId,
          destinationName,
          persons: 1,
          travelDate: "",
          message: form.message || "",
          locale: i18n.language || navigator.language,
        }),
      });
      if (!res.ok) throw new Error("bad response");
      setStatus("success");
    } catch {
      setStatus("error");
    }
  };

  const waHref = `https://wa.me/${PHONE}?text=${encodeURIComponent(`I'm interested in ${packageName}`)}`;
  const mailHref = `mailto:${EMAIL}?subject=${encodeURIComponent(`Booking Inquiry: ${packageName}`)}`;

  return (
    <div className="fixed inset-0 z-[9998] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm" onClick={onClose}>
      <div className="relative w-full max-w-md rounded-3xl bg-card shadow-elevated p-6 md:p-8" onClick={e => e.stopPropagation()}>
        <button onClick={onClose} aria-label="Close" className="absolute top-4 right-4 rounded-full p-1.5 hover:bg-muted">
          <X className="h-5 w-5" />
        </button>
        <h3 className="font-display text-2xl text-primary">{t("booking.title", "Book your trip")}</h3>
        <p className="text-sm text-muted-foreground mt-1 line-clamp-2">{packageName}</p>

        {status === "success" ? (
          <div className="mt-6 space-y-4">
            <div className="rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 p-4 text-sm">
              ✅ {t("booking.success", "Booking received! We'll contact you within 24 hours.")}
            </div>
            <div className="grid grid-cols-2 gap-3">
              <a href={waHref} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 rounded-full bg-emerald-600 text-white py-2.5 text-sm font-semibold">
                <MessageCircle className="h-4 w-4" /> WhatsApp
              </a>
              <a href={mailHref} className="inline-flex items-center justify-center gap-2 rounded-full bg-primary text-primary-foreground py-2.5 text-sm font-semibold">
                <Mail className="h-4 w-4" /> Email
              </a>
            </div>
          </div>
        ) : (
          <form onSubmit={onSubmit} className="mt-5 space-y-3">
            <input required placeholder={t("booking.name", "Name") as string} value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} className="w-full rounded-2xl bg-muted/60 px-4 py-3 outline-none focus:ring-2 ring-secondary" />
            <input required type="email" placeholder={t("booking.email", "Email") as string} value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} className="w-full rounded-2xl bg-muted/60 px-4 py-3 outline-none focus:ring-2 ring-secondary" />
            <input required placeholder={t("booking.phone", "Phone") as string} value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} className="w-full rounded-2xl bg-muted/60 px-4 py-3 outline-none focus:ring-2 ring-secondary" />
            <textarea rows={4} placeholder={t("booking.details", "Enquiry details") as string} value={form.message} onChange={e => setForm({ ...form, message: e.target.value })} className="w-full rounded-2xl bg-muted/60 px-4 py-3 outline-none focus:ring-2 ring-secondary resize-none" />

            {status === "error" && (
              <div className="rounded-xl bg-destructive/10 text-destructive text-xs p-3">
                {t("booking.error", "Something went wrong. Please try WhatsApp or email directly.")}
                <div className="mt-2 flex gap-2">
                  <a href={waHref} target="_blank" rel="noopener noreferrer" className="rounded-full bg-emerald-600 text-white px-3 py-1 font-semibold">WhatsApp</a>
                  <a href={mailHref} className="rounded-full bg-primary text-primary-foreground px-3 py-1 font-semibold">Email</a>
                </div>
              </div>
            )}

            <button disabled={status === "loading"} className="w-full inline-flex items-center justify-center gap-2 rounded-full bg-emerald-600 text-white py-3 font-semibold transition-smooth hover:brightness-110 disabled:opacity-60">
              {status === "loading" ? <><Loader2 className="h-4 w-4 animate-spin" /> {t("booking.sending", "Sending...")}</> : t("booking.send", "Send")}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};
