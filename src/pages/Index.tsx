"use client";
 
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { ArrowRight, MapPin, Calendar, Users, Search } from "lucide-react";
import { WeatherWidget } from "@/components/WeatherWidget";
import { TOURS } from "@/data/tours";
const hero = "/img/hero-ethiopia.jpg";
const lalibela = "/img/dest-lalibela.jpg";
const danakil = "/img/dest-danakil.jpg";
const omo = "/img/dest-omo.jpg";
const axum = "/img/dest-axum.jpg";
const bale = "/img/dest-bale.jpg";
const coffee = "/img/culture-coffee.jpg";

const PartnersStrip = () => {
  const { t } = useTranslation();
  return (
    <section className="container-page pt-10 pb-4">
      <div className="rounded-[2.5rem] bg-card/45 backdrop-blur-md border border-border/40 p-6 md:p-8 flex flex-col lg:flex-row items-center justify-between gap-6 md:gap-8 shadow-soft">
        <span className="text-xs font-bold uppercase tracking-widest text-muted-foreground whitespace-nowrap">
          {t("partners.trustedBy", "Trusted Partners")}
        </span>
        <div className="flex flex-wrap items-center justify-center gap-8 md:gap-12 opacity-85 hover:opacity-100 transition-opacity duration-300">
          {/* Logo 1: Ethiopian Airlines */}
          <div className="h-9 md:h-12 flex items-center hover:scale-105 transition-all duration-300 cursor-default" title={t("partners.ethiopian", "Ethiopian Airlines")}>
            <img src="/partners/Ethiopian_Airlines.svg" alt="Ethiopian Airlines" className="h-full w-auto object-contain dark:brightness-0 dark:invert" />
          </div>
          {/* Logo 2: Land of Origin */}
          <div className="h-9 md:h-12 flex items-center hover:scale-105 transition-all duration-300 cursor-default" title={t("partners.landOfOrigins", "Ethiopia: Land of Origins")}>
            <img src="/partners/ethiopia_land_of_origin.svg" alt="Ethiopia: Land of Origins" className="h-full w-auto object-contain dark:brightness-0 dark:invert" />
          </div>
          {/* Logo 3: Skylight Hotel */}
          <div className="h-9 md:h-12 flex items-center hover:scale-105 transition-all duration-300 cursor-default" title={t("partners.skylight", "Skylight Hotel")}>
            <img src="/partners/skylight_hotel.svg" alt="Skylight Hotel" className="h-full w-auto object-contain dark:brightness-0 dark:invert" />
          </div>
          {/* Logo 4: Visit Oromia */}
          <div className="h-9 md:h-12 flex items-center hover:scale-105 transition-all duration-300 cursor-default" title={t("partners.oromia", "Visit Oromia")}>
            <img src="/partners/visit_oromia.svg" alt="Visit Oromia" className="h-full w-auto object-contain dark:brightness-0 dark:invert" />
          </div>
        </div>
      </div>
    </section>
  );
};

const TopThings = () => {
  const { t } = useTranslation();
  const items = [
    { img: lalibela, title: t("index.timkatTitle"), tag: t("index.tags.heritage", "Heritage") },
    { img: coffee, title: t("index.coffeeTours"), tag: t("index.tags.culture", "Culture") },
    { img: omo, title: t("index.hamarBull"), tag: t("index.tags.people", "People") },
    { img: bale, title: t("index.baleWolf"), tag: t("index.tags.wildlife", "Wildlife") },
  ];
  return (
    <section className="container-page py-20">
      <h2 className="font-display text-3xl md:text-4xl text-primary mb-10">{t("index.topThings")}</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        {items.map((it, i) => (
          <article key={i} className="group relative overflow-hidden rounded-[2rem] curve-card-tr bg-primary text-primary-foreground shadow-soft transition-smooth hover:shadow-elevated">
            <img src={it.img} alt={it.title} loading="lazy" className="h-72 w-full object-cover transition-smooth group-hover:scale-105" />
            <div className="absolute inset-0 bg-gradient-hero" />
            <div className="absolute inset-x-0 bottom-0 p-5">
              <span className="inline-block rounded-full bg-secondary/95 px-2.5 py-0.5 text-xs font-semibold text-secondary-foreground">{it.tag}</span>
              <h3 className="mt-2 font-display text-xl leading-snug">{it.title}</h3>
              <span className="mt-3 inline-flex items-center gap-1 text-sm text-primary-foreground/85 group-hover:text-secondary">{t("index.readMore")} <ArrowRight className="h-4 w-4" /></span>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};

const WhatsHappening = () => {
  const { t } = useTranslation();
  return (
    <section className="bg-muted/40 py-20">
      <div className="container-page">
        <h2 className="font-display text-3xl md:text-4xl text-primary mb-10">{t("sections.whatsHappening")}</h2>
        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:row-span-2 relative overflow-hidden curve-card curve-card-bl shadow-soft">
            <img src={axum} alt={t("index.axumAlt", "Axum")} loading="lazy" className="h-full w-full object-cover min-h-[420px]" />
            <div className="absolute inset-0 bg-gradient-hero" />
            <div className="absolute bottom-0 p-6 text-primary-foreground">
              <span className="text-xs uppercase tracking-widest text-secondary">{t("index.featured")}</span>
              <h3 className="font-display text-2xl mt-2">{t("index.timkatTitle")}</h3>
              <p className="text-sm text-primary-foreground/85 mt-2 max-w-md">{t("index.timkatDesc")}</p>
            </div>
          </div>
          {[
            { img: danakil, title: t("index.ertaAle") },
            { img: coffee, title: t("index.coffeeTours") },
            { img: bale, title: t("index.baleWolf") },
            { img: omo, title: t("index.hamarBull") },
          ].map((c, i) => (
            <article key={i} className="group relative overflow-hidden rounded-3xl bg-card shadow-soft transition-smooth hover:shadow-elevated">
              <img src={c.img} alt={c.title} loading="lazy" className="h-48 w-full object-cover transition-smooth group-hover:scale-105" />
              <div className="p-4">
                <h3 className="font-display text-lg text-primary leading-snug">{c.title}</h3>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

const TrendingNow = () => {
  const { t } = useTranslation();
  const trendingTours = TOURS.slice(0, 6);

  const scroll = (direction: "left" | "right") => {
    const el = document.getElementById("trending-carousel");
    if (el) {
      const amount = direction === "left" ? -360 : 360;
      el.scrollBy({ left: amount, behavior: "smooth" });
    }
  };

  return (
    <section className="py-20 relative bg-muted/20 overflow-hidden">
      <div className="container-page">
        <div className="flex items-end justify-between mb-10">
          <div>
            <span className="inline-block rounded-full bg-secondary/20 px-3 py-1 text-xs font-bold uppercase tracking-widest text-secondary-foreground">
              {t("index.trendingEyebrow", "POPULAR CHOICE")}
            </span>
            <h2 className="font-display text-3xl md:text-4xl text-primary mt-2">
              {t("index.trendingTitle", "Trending Now")}
            </h2>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => scroll("left")}
              className="p-3 rounded-full border border-border bg-card text-foreground hover:bg-primary hover:text-primary-foreground transition-smooth shadow-soft"
              aria-label="Previous"
            >
              <ArrowRight className="h-5 w-5 rotate-180" />
            </button>
            <button
              onClick={() => scroll("right")}
              className="p-3 rounded-full border border-border bg-card text-foreground hover:bg-primary hover:text-primary-foreground transition-smooth shadow-soft"
              aria-label="Next"
            >
              <ArrowRight className="h-5 w-5" />
            </button>
          </div>
        </div>

        <div
          id="trending-carousel"
          className="flex gap-6 overflow-x-auto snap-x snap-mandatory scrollbar-none pb-8"
          style={{ scrollbarWidth: "none" }}
        >
          {trendingTours.map((tour, idx) => {
            const hasDiscount = tour.oldPriceUSD && tour.oldPriceUSD > tour.priceUSD;
            return (
              <article
                key={idx}
                className="min-w-[300px] md:min-w-[340px] snap-start group relative overflow-hidden rounded-[2.5rem] curve-card bg-card border border-border/40 shadow-soft transition-all duration-300 hover:shadow-elevated hover:-translate-y-1 flex flex-col h-[460px]"
              >
                <div className="relative h-56 overflow-hidden">
                  <img
                    src={tour.image}
                    alt={t("tours." + tour.slug + ".title", tour.title)}
                    loading="lazy"
                    className="h-full w-full object-cover transition-smooth group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                  <span className="absolute top-4 left-4 inline-flex items-center gap-1.5 rounded-full bg-background/90 backdrop-blur px-3 py-1 text-xs font-semibold text-emerald-600">
                    <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                    {t("tour.available", "Available")}
                  </span>
                  <span className="absolute bottom-4 right-4 inline-flex items-center gap-1 rounded-full bg-background/95 backdrop-blur px-2.5 py-1 text-xs font-bold shadow-soft text-foreground">
                    ★ {tour.rating.toFixed(2)}
                  </span>
                </div>
                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div className="flex flex-col gap-2">
                    <span className="text-xs font-bold uppercase tracking-wider text-secondary">
                      {t("categories." + tour.categories[0] + ".name", tour.categories[0].replace("-", " "))}
                    </span>
                    <h3 className="font-display text-lg md:text-xl leading-snug text-primary line-clamp-2 group-hover:text-primary-glow transition-colors">
                      {t("tours." + tour.slug + ".title", tour.title)}
                    </h3>
                    <p className="text-xs text-muted-foreground line-clamp-2 mt-1">
                      {t("tours." + tour.slug + ".shortDescription", tour.shortDescription)}
                    </p>
                  </div>
                  
                  <div className="flex items-center justify-between mt-4 pt-4 border-t border-border/40">
                    <div>
                      <div className="text-[10px] uppercase tracking-wider text-muted-foreground">
                        {t("tour.duration", "Duration")}
                      </div>
                      <div className="text-sm font-semibold text-foreground">
                        {t("tours." + tour.slug + ".durationLabel", tour.durationLabel)}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-[10px] uppercase tracking-wider text-muted-foreground">
                        {t("tour.from", "From")}
                      </div>
                      <div className="flex items-baseline gap-1.5 justify-end">
                        {hasDiscount && (
                          <span className="text-xs text-muted-foreground line-through">${tour.oldPriceUSD}</span>
                        )}
                        <span className="text-lg font-bold text-emerald-600">${tour.priceUSD}</span>
                      </div>
                    </div>
                  </div>

                  <Link
                    href={`/tours/${tour.slug}`}
                    className="mt-5 w-full text-center rounded-2xl bg-primary text-primary-foreground py-2.5 text-sm font-semibold hover:bg-primary-glow transition-smooth shadow-soft"
                  >
                    {t("tour.exploreTrip", "Explore Trip")}
                  </Link>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
};

const PlanAhead = () => {
  const { t } = useTranslation();
  const cards = [
    { title: t("index.whyVisit"), text: t("index.whyVisitText"), color: "bg-primary text-primary-foreground" },
    { title: t("index.whenToGo"), text: t("index.whenToGoText"), color: "bg-secondary text-secondary-foreground" },
    { title: t("index.gettingAround"), text: t("index.gettingAroundText"), color: "bg-[hsl(195,70%,32%)] text-primary-foreground" },
    { title: t("index.visaEntry"), text: t("index.visaEntryText"), color: "bg-card text-foreground border border-border" },
  ];
  return (
    <section className="container-page py-20">
      <h2 className="font-display text-3xl md:text-4xl text-primary mb-10">{t("index.planAheadTitle")}</h2>
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
        {cards.map((c, i) => (
          <div key={i} className={`rounded-[2rem] curve-card-br p-6 min-h-[220px] flex flex-col justify-between transition-smooth hover:-translate-y-1 ${c.color}`}>
            <h3 className="font-display text-xl">{c.title}</h3>
            <p className="text-sm opacity-90 leading-relaxed">{c.text}</p>
            <ArrowRight className="h-5 w-5 mt-4" />
          </div>
        ))}
      </div>
    </section>
  );
};

const NEWSLETTER_URL = process.env.NEXT_PUBLIC_N8N_NEWSLETTER_WEBHOOK_URL as string | undefined;

const Newsletter = () => {
  const { t, i18n } = useTranslation();
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.includes("@")) { setStatus("error"); return; }
    setStatus("loading");
    try {
      if (!NEWSLETTER_URL) throw new Error("missing");
      const r = await fetch(NEWSLETTER_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: "", email, phone: "", locale: i18n.language, source: "newsletter" }),
      });
      if (!r.ok) throw new Error("bad");
      setStatus("success"); setEmail("");
    } catch { setStatus("error"); }
  };
  return (
    <section className="container-page pb-24">
      <div className="relative overflow-hidden rounded-[2.5rem] curve-card-tl bg-gradient-deep p-10 md:p-14 text-primary-foreground">
        <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-secondary/30 blur-3xl" />
        <div className="relative grid md:grid-cols-2 gap-8 items-center">
          <div>
            <h3 className="font-display text-3xl md:text-4xl">{t("newsletter.title")}</h3>
            <p className="mt-3 text-primary-foreground/80 max-w-md">{t("newsletter.subtitle")}</p>
          </div>
          <form onSubmit={onSubmit} className="flex flex-col gap-2">
            <div className="flex flex-col sm:flex-row gap-3">
              <input type="email" required value={email} onChange={e => setEmail(e.target.value)} placeholder={t("newsletter.emailPlaceholder", "you@email.com")} className="flex-1 rounded-full bg-background/10 border border-primary-foreground/20 px-5 py-3 text-primary-foreground placeholder:text-primary-foreground/50 outline-none focus:border-secondary" />
              <button type="submit" disabled={status === "loading"} className="rounded-full bg-secondary px-6 py-3 font-semibold text-secondary-foreground transition-smooth hover:shadow-gold disabled:opacity-60">
                {status === "loading" ? t("newsletter.sending") : t("newsletter.subscribe")}
              </button>
            </div>
            {status === "success" && <p className="text-sm text-emerald-300">{t("newsletter.success")}</p>}
            {status === "error" && <p className="text-sm text-red-300">{t("newsletter.error")}</p>}
          </form>
        </div>
      </div>
    </section>
  );
};

const Index = () => {
  const { t } = useTranslation();
  const router = useRouter();
  const [q, setQ] = useState("");
  const onSearch = (e: React.FormEvent) => {
    e.preventDefault();
    router.push(`/explore${q.trim() ? `?q=${encodeURIComponent(q.trim())}` : ""}`);
  };
  return (
    <>
      <section className="relative overflow-hidden">
        <div className="container-page pt-6">
          <div className="relative overflow-hidden rounded-[2.5rem] curve-card-bl">
            <img src={hero} alt={t("index.heroAlt", "Simien Mountains, Ethiopia")} className="h-[78vh] min-h-[560px] w-full object-cover" />
            <div className="absolute inset-0 bg-gradient-hero" />
            <div className="absolute inset-0 flex items-end">
              <div className="container-page pb-12 md:pb-16 text-primary-foreground animate-float-up">
                <span className="inline-block rounded-full bg-secondary/95 px-3 py-1 text-xs font-bold uppercase tracking-widest text-secondary-foreground">{t("hero.eyebrow")}</span>
                <h1 className="mt-4 font-display text-4xl md:text-6xl lg:text-7xl font-semibold max-w-3xl text-balance leading-[1.05]">{t("hero.title")}</h1>
                <p className="mt-5 max-w-xl text-lg text-primary-foreground/90">{t("hero.subtitle")}</p>
                <div className="mt-7 flex flex-wrap gap-3">
                  <Link href="/explore" className="inline-flex items-center gap-2 rounded-full bg-secondary px-6 py-3 font-semibold text-secondary-foreground shadow-gold transition-smooth hover:scale-[1.02]">
                    {t("hero.ctaPrimary")} <ArrowRight className="h-4 w-4" />
                  </Link>
                  <Link href="/tours" className="inline-flex items-center gap-2 rounded-full border border-primary-foreground/40 bg-primary-foreground/10 px-6 py-3 font-semibold text-primary-foreground backdrop-blur transition-smooth hover:bg-primary-foreground/20">
                    {t("hero.ctaSecondary")}
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="container-page -mt-10 relative z-10">
          <form onSubmit={onSearch} className="rounded-[2rem] bg-card shadow-elevated p-4 md:p-6 grid md:grid-cols-4 gap-3">
            <label className="md:col-span-2 flex items-center gap-3 rounded-2xl px-4 py-3 bg-muted/40">
              <Search className="h-5 w-5 text-primary" />
              <input
                value={q}
                onChange={e => setQ(e.target.value)}
                placeholder={t("index.searchPlaceholder")}
                className="flex-1 bg-transparent outline-none text-foreground placeholder:text-muted-foreground"
              />
            </label>
            <div className="hidden md:flex items-center gap-3 rounded-2xl px-4 py-3 bg-muted/40 cursor-default">
              <Calendar className="h-5 w-5 text-primary" />
              <div>
                <div className="text-xs uppercase tracking-wider text-muted-foreground">{t("index.when")}</div>
                <div className="font-medium text-foreground">{t("index.anyDate")}</div>
              </div>
            </div>
            <button type="submit" className="rounded-2xl bg-primary text-primary-foreground font-semibold flex items-center justify-center gap-2 transition-smooth hover:bg-primary-glow px-4 py-3">
              {t("index.searchTrips")} <ArrowRight className="h-4 w-4" />
            </button>
          </form>
        </div>
      </section>

      <PartnersStrip />
      <WeatherWidget />
      <TopThings />
      <WhatsHappening />
      <TrendingNow />
      <PlanAhead />
      <Newsletter />
    </>
  );
};

export default Index;
