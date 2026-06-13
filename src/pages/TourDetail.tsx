"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useTranslation } from "react-i18next";
import { ArrowLeft, Clock, Star, MapPin, Check, X as XIcon, Flag, CreditCard, ShieldCheck, HelpCircle } from "lucide-react";
import { getTour, CATEGORIES } from "@/data/tours";
import { WeatherWidget } from "@/components/WeatherWidget";
import { BookingModal } from "@/components/BookingModal";
import NotFound from "./NotFound";

const TourDetail = ({ params }: { params: Promise<{ slug: string }> | { slug: string } }) => {
const resolvedParams = params && typeof (params as any).then === "function" ? (params as Promise<{ slug: string }>) : Promise.resolve(params as { slug: string });
const [slugValue, setSlugValue] = useState("");
useEffect(() => {
resolvedParams.then(p => setSlugValue(p.slug));
}, []);
const slug = slugValue;
const router = useRouter();
const { t } = useTranslation();
const [bookOpen, setBookOpen] = useState(false);
const tour = getTour(slug);
if (slug === "" || !tour) return null;

const cats = tour.categories.map(c => CATEGORIES.find(x => x.slug === c)).filter(Boolean);

return (
<>
<section className="container-page pt-6">
<button onClick={() => router.back()} className="inline-flex items-center gap-1 rounded-full border border-border bg-card px-3 py-1.5 text-sm font-medium hover:bg-muted transition-smooth">
<ArrowLeft className="h-4 w-4" /> {t("tourDetail.back")}
</button>

<div className="relative overflow-hidden rounded-[2.5rem] curve-card-bl mt-4">
<img src={tour.image} alt={t("tours." + tour.slug + ".title", tour.title)} className="h-[60vh] min-h-[420px] w-full object-cover" />
<div className="absolute inset-0 bg-gradient-hero" />
<div className="absolute inset-x-0 bottom-0 p-6 md:p-12 text-primary-foreground">
<div className="flex flex-wrap gap-2 mb-3">
{cats.map(c => c && (
<Link key={c.slug} href={`/explore?category=${c.slug}`} className="rounded-full bg-secondary/90 text-secondary-foreground px-3 py-1 text-xs font-semibold">
{t("categories." + c.slug + ".name", c.name)}
</Link>
))}
<span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500 text-white px-3 py-1 text-xs font-semibold" style={{ animation: "blink-green 1.4s ease-in-out infinite" }}>
<span className="h-2 w-2 rounded-full bg-white" /> {t("tour.available")}
</span>
<style>{`@keyframes blink-green { 0%,100%{opacity:1} 50%{opacity:.55} }`}</style>
</div>
<h1 className="font-display text-3xl md:text-5xl max-w-4xl leading-tight">{t("tours." + tour.slug + ".title", tour.title)}</h1>
<div className="mt-4 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm">
<span className="inline-flex items-center gap-1"><Clock className="h-4 w-4" /> {t("tours." + tour.slug + ".durationLabel", tour.durationLabel)}</span>
<span className="inline-flex items-center gap-1"><MapPin className="h-4 w-4" /> {t("tours." + tour.slug + ".region", tour.region)}</span>
<span className="inline-flex items-center gap-1"><Star className="h-4 w-4 fill-secondary text-secondary" /> {tour.rating.toFixed(2)}</span>
<span className="inline-flex items-center gap-1"><Flag className="h-4 w-4" /> Konijet Ethiopia</span>
</div>
</div>
</div>
</section>

<section className="container-page py-12 grid lg:grid-cols-3 gap-10">
<div className="lg:col-span-2 space-y-10">
<div>
<h2 className="font-display text-3xl text-primary mb-3">{t("tourDetail.aboutTrip")}</h2>
<p className="text-foreground/80 leading-relaxed">{t("tours." + tour.slug + ".longDescription", tour.longDescription)}</p>
</div>

<div>
<h2 className="font-display text-3xl text-primary mb-3">{t("tourDetail.highlights")}</h2>
<ul className="grid sm:grid-cols-2 gap-2">
{tour.highlights.map((h, i) => (
<li key={i} className="flex items-start gap-2 text-sm">
<Check className="h-4 w-4 text-emerald-600 mt-0.5 flex-shrink-0" /> {t("tours." + tour.slug + ".highlights." + i, h)}
</li>
))}
</ul>
</div>

<div>
<h2 className="font-display text-3xl text-primary mb-4">{t("tourDetail.itinerary")}</h2>
<ol className="space-y-4">
{tour.itinerary.map((d, i) => (
<li key={i} className="rounded-2xl border border-border bg-card p-5 shadow-soft">
<div className="text-xs uppercase tracking-wider text-secondary font-bold">{t("tours." + tour.slug + ".itinerary." + i + ".day", d.day)}</div>
<h3 className="font-display text-lg text-primary mt-1">{t("tours." + tour.slug + ".itinerary." + i + ".title", d.title)}</h3>
<p className="text-sm text-foreground/75 mt-2">{t("tours." + tour.slug + ".itinerary." + i + ".details", d.details)}</p>
</li>
))}
</ol>
</div>

<div className="grid sm:grid-cols-2 gap-6">
<div>
<h3 className="font-display text-xl text-primary mb-2">{t("tourDetail.included")}</h3>
<ul className="space-y-1.5 text-sm">
{tour.includes.map((x, i) => <li key={i} className="flex items-start gap-2"><Check className="h-4 w-4 text-emerald-600 mt-0.5 flex-shrink-0" /> {t("tours." + tour.slug + ".includes." + i, x)}</li>)}
</ul>
</div>
<div>
<h3 className="font-display text-xl text-primary mb-2">{t("tourDetail.notIncluded")}</h3>
<ul className="space-y-1.5 text-sm">
{tour.excludes.map((x, i) => <li key={i} className="flex items-start gap-2"><XIcon className="h-4 w-4 text-destructive mt-0.5 flex-shrink-0" /> {t("tours." + tour.slug + ".excludes." + i, x)}</li>)}
</ul>
</div>
</div>
</div>

<aside className="space-y-4">
<div className="rounded-3xl bg-card border border-border p-6 shadow-elevated sticky top-24">
<div className="text-sm text-muted-foreground">{t("tour.from")}</div>
<div className="flex items-baseline gap-2 flex-wrap">
{tour.oldPriceUSD && <span className="text-lg text-muted-foreground line-through">${tour.oldPriceUSD}</span>}
{tour.oldPriceUSD && <span className="rounded-full bg-destructive text-destructive-foreground text-[10px] font-bold px-2 py-0.5">{t("tourDetail.sale")}</span>}
<span className={`font-display text-4xl ${tour.oldPriceUSD ? "text-emerald-600" : "text-primary"}`}>${tour.priceUSD}</span>
</div>
<div className="text-xs text-muted-foreground">{t("tourDetail.perPersonTwin")}</div>
<button onClick={() => setBookOpen(true)} className="mt-5 block w-full rounded-full bg-secondary text-secondary-foreground text-center px-6 py-3 font-semibold shadow-soft hover:shadow-gold transition-smooth">
{t("tour.bookNow")}
</button>
<Link href={`/explore?category=${tour.categories[0]}`} className="mt-2 block w-full rounded-full border border-border text-center px-6 py-3 text-sm font-medium hover:bg-muted transition-smooth">
{t("tour.similar")}
</Link>
<div className="mt-5 pt-5 border-t border-border space-y-2 text-sm">
<div className="flex justify-between"><span className="text-muted-foreground">{t("tour.duration")}</span><span className="font-medium">{t("tours." + tour.slug + ".durationLabel", tour.durationLabel)}</span></div>
<div className="flex justify-between"><span className="text-muted-foreground">{t("tour.region")}</span><span className="font-medium">{t("tours." + tour.slug + ".region", tour.region)}</span></div>
<div className="flex justify-between"><span className="text-muted-foreground">{t("tour.status")}</span><span className="font-medium text-emerald-600">{t("tour.available")}</span></div>
</div>
</div>

<div className="rounded-3xl bg-gradient-warm border border-border p-6 shadow-soft">
<div className="flex items-start gap-3">
<CreditCard className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
<div>
<div className="font-semibold text-primary">{t("tour.payNow")}</div>
<p className="text-sm text-muted-foreground">{t("tour.payNowDesc")}</p>
</div>
</div>
<div className="flex items-start gap-3 mt-3">
<ShieldCheck className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
<div>
<div className="font-semibold text-primary">{t("tour.bestPrice")}</div>
<p className="text-sm text-muted-foreground">{t("tour.bestPriceDesc")}</p>
</div>
</div>
<Link href="/contact" className="mt-4 inline-flex items-center gap-2 rounded-full bg-primary text-primary-foreground px-4 py-2 text-sm font-semibold hover:bg-primary-glow transition-smooth">
<HelpCircle className="h-4 w-4" /> {t("tour.haveQuestion")}
</Link>
</div>
</aside>
</section>

<BookingModal
open={bookOpen}
onClose={() => setBookOpen(false)}
packageId={tour.slug}
packageName={t("tours." + tour.slug + ".title", tour.title)}
destinationName={t("tours." + tour.slug + ".region", tour.region)}
/>
<WeatherWidget />
</>
);
};

export default TourDetail;
