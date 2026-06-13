"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import { Mail, MapPin, Phone } from "lucide-react";
import { useTranslation } from "react-i18next";
import { WeatherWidget } from "@/components/WeatherWidget";

const CONTACT_WEBHOOK_URL = process.env.NEXT_PUBLIC_N8N_CONTACT_WEBHOOK_URL as string | undefined;

const useContactSchema = () => {
const { t } = useTranslation();
return z.object({
name: z.string().trim().min(2, t("contactPage.nameLabel")).max(100),
email: z.string().trim().email(t("contactPage.emailLabel")).max(255),
phone: z.string().trim().max(40).optional().or(z.literal("")),
message: z.string().trim().min(10, t("contactPage.messageLabel")).max(1500),
});
};

const Contact = () => {
  const { t, i18n } = useTranslation();
const schema = useContactSchema();
type FormVals = z.infer<typeof schema>;
const { register, handleSubmit, formState: { errors, isSubmitting }, reset } = useForm<FormVals>({ resolver: zodResolver(schema) });

  const onSubmit = async (data: FormVals) => {
    try {
      const payload = {
        ...data,
        subject: "General Inquiry",
        locale: i18n.language || "en",
        createdAt: new Date().toISOString(),
      };
      if (CONTACT_WEBHOOK_URL) {
        const res = await fetch(CONTACT_WEBHOOK_URL, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
        if (!res.ok) throw new Error("Webhook failed");
      } else {
        await new Promise((r) => setTimeout(r, 600));
        console.log("[contact] Webhook not configured — submission logged only:", data);
      }
      toast.success(t("contactPage.successMsg"));
      reset();
    } catch (e: any) {
      console.error(e);
      toast.error(t("contactPage.errorMsg"));
    }
  };

return (
<>
<section className="container-page py-16 grid md:grid-cols-2 gap-12">
<div>
<span className="text-xs uppercase tracking-widest text-secondary font-bold">{t("contactPage.eyebrow")}</span>
<h1 className="font-display text-5xl text-primary mt-2">{t("contactPage.title")}</h1>
<p className="text-muted-foreground mt-4 max-w-md">{t("contactPage.subtitle")}</p>
<div className="mt-8 space-y-3 text-foreground">
<div className="flex items-center gap-3"><Mail className="h-5 w-5 text-secondary" /> <a href="mailto:info@konijetethiopia.qzz.io" className="hover:text-secondary hover:underline transition-smooth">info@konijetethiopia.qzz.io</a></div>
<div className="flex items-center gap-3"><Phone className="h-5 w-5 text-secondary" /> <a href="tel:+251911595533" className="hover:text-secondary hover:underline transition-smooth">+251 911 595 533</a></div>
<div className="flex items-center gap-3"><MapPin className="h-5 w-5 text-secondary" /> Bole, Addis Ababa, Ethiopia</div>
</div>
</div>
<form onSubmit={handleSubmit(onSubmit)} className="rounded-[2rem] curve-card-tl bg-card border border-border p-8 shadow-soft space-y-4">
<div>
<label className="text-sm font-medium text-primary">{t("contactPage.nameLabel")}</label>
<input {...register("name")} className="mt-1 w-full rounded-xl border border-input px-4 py-3 outline-none focus:border-secondary" />
{errors.name && <p className="text-destructive text-sm mt-1">{errors.name.message}</p>}
</div>
<div className="grid sm:grid-cols-2 gap-4">
<div>
<label className="text-sm font-medium text-primary">{t("contactPage.emailLabel")}</label>
<input {...register("email")} className="mt-1 w-full rounded-xl border border-input px-4 py-3 outline-none focus:border-secondary" />
{errors.email && <p className="text-destructive text-sm mt-1">{errors.email.message}</p>}
</div>
<div>
<label className="text-sm font-medium text-primary">{t("contactPage.phoneLabel")}</label>
<input {...register("phone")} className="mt-1 w-full rounded-xl border border-input px-4 py-3 outline-none focus:border-secondary" />
</div>
</div>
<div>
<label className="text-sm font-medium text-primary">{t("contactPage.messageLabel")}</label>
<textarea {...register("message")} rows={5} className="mt-1 w-full rounded-xl border border-input px-4 py-3 outline-none focus:border-secondary resize-none" />
{errors.message && <p className="text-destructive text-sm mt-1">{errors.message.message}</p>}
</div>
<button disabled={isSubmitting} className="w-full rounded-full bg-secondary px-6 py-3 font-semibold text-secondary-foreground shadow-soft transition-smooth hover:shadow-gold disabled:opacity-60">
{isSubmitting ? t("contactPage.submitting") : t("contactPage.submit")}
</button>
</form>
</section>
<WeatherWidget />
</>
);
};
export default Contact;
