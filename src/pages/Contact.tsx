import { Helmet } from "react-helmet-async";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import { Mail, MapPin, Phone } from "lucide-react";
import { databases, APPWRITE_DB_ID } from "@/lib/appwrite";
import { ID } from "appwrite";
import { WeatherWidget } from "@/components/WeatherWidget";

const schema = z.object({
  name: z.string().trim().min(2, "Please enter your name").max(100),
  email: z.string().trim().email("Please enter a valid email").max(255),
  phone: z.string().trim().max(40).optional().or(z.literal("")),
  message: z.string().trim().min(10, "Tell us a bit more").max(1500),
});
type FormVals = z.infer<typeof schema>;

const CONTACT_COLLECTION = import.meta.env.VITE_APPWRITE_CONTACT || "contact_messages";
const PROJECT_ID = import.meta.env.VITE_APPWRITE_PROJECT_ID;

const Contact = () => {
  const { register, handleSubmit, formState: { errors, isSubmitting }, reset } = useForm<FormVals>({ resolver: zodResolver(schema) });

  const onSubmit = async (data: FormVals) => {
    try {
      if (PROJECT_ID) {
        await databases.createDocument(APPWRITE_DB_ID, CONTACT_COLLECTION, ID.unique(), {
          ...data,
          createdAt: new Date().toISOString(),
        });
      } else {
        await new Promise(r => setTimeout(r, 600));
        console.log("[contact] Appwrite not configured — submission logged only:", data);
      }
      toast.success("Message sent — we'll be in touch within 24 hours.");
      reset();
    } catch (e: any) {
      console.error(e);
      toast.error("Something went wrong. Please email us directly at hello@konijet-ethiopia.com");
    }
  };

  return (
    <>
      <Helmet>
        <title>Contact · Konijet Ethiopia</title>
        <meta name="description" content="Get in touch with Konijet Ethiopia to plan your custom Ethiopian adventure." />
      </Helmet>
      <section className="container-page py-16 grid md:grid-cols-2 gap-12">
        <div>
          <span className="text-xs uppercase tracking-widest text-secondary font-bold">Get in touch</span>
          <h1 className="font-display text-5xl text-primary mt-2">Plan your Ethiopia journey</h1>
          <p className="text-muted-foreground mt-4 max-w-md">Tell us when you'd like to travel, who you're travelling with and what you dream of seeing. We reply within 24 hours.</p>
          <div className="mt-8 space-y-3 text-foreground">
            <div className="flex items-center gap-3"><Mail className="h-5 w-5 text-secondary" /> hello@konijet-ethiopia.com</div>
            <div className="flex items-center gap-3"><Phone className="h-5 w-5 text-secondary" /> +251 911 000 000</div>
            <div className="flex items-center gap-3"><MapPin className="h-5 w-5 text-secondary" /> Bole, Addis Ababa, Ethiopia</div>
          </div>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className="rounded-[2rem] curve-card-tl bg-card border border-border p-8 shadow-soft space-y-4">
          <div>
            <label className="text-sm font-medium text-primary">Your name</label>
            <input {...register("name")} className="mt-1 w-full rounded-xl border border-input px-4 py-3 outline-none focus:border-secondary" />
            {errors.name && <p className="text-destructive text-sm mt-1">{errors.name.message}</p>}
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium text-primary">Email</label>
              <input {...register("email")} className="mt-1 w-full rounded-xl border border-input px-4 py-3 outline-none focus:border-secondary" />
              {errors.email && <p className="text-destructive text-sm mt-1">{errors.email.message}</p>}
            </div>
            <div>
              <label className="text-sm font-medium text-primary">Phone (optional)</label>
              <input {...register("phone")} className="mt-1 w-full rounded-xl border border-input px-4 py-3 outline-none focus:border-secondary" />
            </div>
          </div>
          <div>
            <label className="text-sm font-medium text-primary">Tell us about your dream trip</label>
            <textarea {...register("message")} rows={5} className="mt-1 w-full rounded-xl border border-input px-4 py-3 outline-none focus:border-secondary resize-none" />
            {errors.message && <p className="text-destructive text-sm mt-1">{errors.message.message}</p>}
          </div>
          <button disabled={isSubmitting} className="w-full rounded-full bg-secondary px-6 py-3 font-semibold text-secondary-foreground shadow-soft transition-smooth hover:shadow-gold disabled:opacity-60">
            {isSubmitting ? "Sending..." : "Send message"}
          </button>
        </form>
      </section>
      <WeatherWidget />
    </>
  );
};
export default Contact;
