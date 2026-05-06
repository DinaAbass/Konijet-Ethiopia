import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { ArrowRight, MapPin, Calendar, Users, Search } from "lucide-react";
import { WeatherWidget } from "@/components/WeatherWidget";
import hero from "@/assets/hero-ethiopia.jpg";
import lalibela from "@/assets/dest-lalibela.jpg";
import danakil from "@/assets/dest-danakil.jpg";
import omo from "@/assets/dest-omo.jpg";
import axum from "@/assets/dest-axum.jpg";
import bale from "@/assets/dest-bale.jpg";
import coffee from "@/assets/culture-coffee.jpg";

const TopThings = () => {
  const items = [
    { img: lalibela, title: "Pilgrimage at Lalibela", tag: "Heritage" },
    { img: coffee, title: "Coffee ceremony in Addis", tag: "Culture" },
    { img: omo, title: "Omo Valley encounters", tag: "People" },
    { img: bale, title: "Wolf-tracking in Bale", tag: "Wildlife" },
  ];
  return (
    <section className="container-page py-20">
      <h2 className="font-display text-3xl md:text-4xl text-primary mb-10">Top 4 things to do this week</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        {items.map((it, i) => (
          <article key={i} className="group relative overflow-hidden rounded-[2rem] curve-card-tr bg-primary text-primary-foreground shadow-soft transition-smooth hover:shadow-elevated">
            <img src={it.img} alt={it.title} loading="lazy" className="h-72 w-full object-cover transition-smooth group-hover:scale-105" />
            <div className="absolute inset-0 bg-gradient-hero" />
            <div className="absolute inset-x-0 bottom-0 p-5">
              <span className="inline-block rounded-full bg-secondary/95 px-2.5 py-0.5 text-xs font-semibold text-secondary-foreground">{it.tag}</span>
              <h3 className="mt-2 font-display text-xl leading-snug">{it.title}</h3>
              <span className="mt-3 inline-flex items-center gap-1 text-sm text-primary-foreground/85 group-hover:text-secondary">Read more <ArrowRight className="h-4 w-4" /></span>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};

const WhatsHappening = () => (
  <section className="bg-muted/40 py-20">
    <div className="container-page">
      <h2 className="font-display text-3xl md:text-4xl text-primary mb-10">What's happening now</h2>
      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:row-span-2 relative overflow-hidden curve-card curve-card-bl shadow-soft">
          <img src={axum} alt="Axum" loading="lazy" className="h-full w-full object-cover min-h-[420px]" />
          <div className="absolute inset-0 bg-gradient-hero" />
          <div className="absolute bottom-0 p-6 text-primary-foreground">
            <span className="text-xs uppercase tracking-widest text-secondary">Featured</span>
            <h3 className="font-display text-2xl mt-2">Timkat — the Epiphany festival</h3>
            <p className="text-sm text-primary-foreground/85 mt-2 max-w-md">Three days of processions, song and blessings as Ethiopia celebrates the baptism of Christ.</p>
          </div>
        </div>
        {[
          { img: danakil, title: "Erta Ale lava lake expeditions reopen" },
          { img: coffee, title: "New coffee origin tours in Yirgacheffe" },
          { img: bale, title: "Bale wolf conservation week" },
          { img: omo, title: "Hamar bull-jumping ceremonies" },
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

const PlanAhead = () => {
  const cards = [
    { title: "Why visit", text: "13 months of sunshine, 9 UNESCO sites, and origin of coffee.", color: "bg-primary text-primary-foreground" },
    { title: "When to go", text: "October–March is dry and clear. Festival season is January.", color: "bg-secondary text-secondary-foreground" },
    { title: "Getting around", text: "Domestic flights connect Addis to all major historic circuits.", color: "bg-primary-glow text-primary-foreground" },
    { title: "Visa & entry", text: "E-visa available for 50+ countries. Yellow fever recommended.", color: "bg-card text-foreground border border-border" },
  ];
  return (
    <section className="container-page py-20">
      <h2 className="font-display text-3xl md:text-4xl text-primary mb-10">Plan ahead</h2>
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

const Newsletter = () => (
  <section className="container-page pb-24">
    <div className="relative overflow-hidden rounded-[2.5rem] curve-card-tl bg-gradient-deep p-10 md:p-14 text-primary-foreground">
      <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-secondary/30 blur-3xl" />
      <div className="relative grid md:grid-cols-2 gap-8 items-center">
        <div>
          <h3 className="font-display text-3xl md:text-4xl">Sign up to Konijet news</h3>
          <p className="mt-3 text-primary-foreground/80 max-w-md">Quarterly stories from Ethiopia's trails, festivals and food, with exclusive package launches.</p>
        </div>
        <form className="flex flex-col sm:flex-row gap-3">
          <input type="email" placeholder="you@email.com" className="flex-1 rounded-full bg-background/10 border border-primary-foreground/20 px-5 py-3 text-primary-foreground placeholder:text-primary-foreground/50 outline-none focus:border-secondary" />
          <button type="submit" className="rounded-full bg-secondary px-6 py-3 font-semibold text-secondary-foreground transition-smooth hover:shadow-gold">Subscribe</button>
        </form>
      </div>
    </div>
  </section>
);

const Index = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [q, setQ] = useState("");
  const onSearch = (e: React.FormEvent) => {
    e.preventDefault();
    navigate(`/explore${q.trim() ? `?q=${encodeURIComponent(q.trim())}` : ""}`);
  };
  return (
    <>
      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="container-page pt-6">
          <div className="relative overflow-hidden rounded-[2.5rem] curve-card-bl">
            <img src={hero} alt="Simien Mountains, Ethiopia" className="h-[78vh] min-h-[560px] w-full object-cover" />
            <div className="absolute inset-0 bg-gradient-hero" />
            <div className="absolute inset-0 flex items-end">
              <div className="container-page pb-12 md:pb-16 text-primary-foreground animate-float-up">
                <span className="inline-block rounded-full bg-secondary/95 px-3 py-1 text-xs font-bold uppercase tracking-widest text-secondary-foreground">{t("hero.eyebrow")}</span>
                <h1 className="mt-4 font-display text-4xl md:text-6xl lg:text-7xl font-semibold max-w-3xl text-balance leading-[1.05]">{t("hero.title")}</h1>
                <p className="mt-5 max-w-xl text-lg text-primary-foreground/90">{t("hero.subtitle")}</p>
                <div className="mt-7 flex flex-wrap gap-3">
                  <Link to="/explore" className="inline-flex items-center gap-2 rounded-full bg-secondary px-6 py-3 font-semibold text-secondary-foreground shadow-gold transition-smooth hover:scale-[1.02]">
                    {t("hero.ctaPrimary")} <ArrowRight className="h-4 w-4" />
                  </Link>
                  <Link to="/tours" className="inline-flex items-center gap-2 rounded-full border border-primary-foreground/40 bg-primary-foreground/10 px-6 py-3 font-semibold text-primary-foreground backdrop-blur transition-smooth hover:bg-primary-foreground/20">
                    {t("hero.ctaSecondary")}
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Floating functional search */}
        <div className="container-page -mt-10 relative z-10">
          <form onSubmit={onSearch} className="rounded-[2rem] bg-card shadow-elevated p-4 md:p-6 grid md:grid-cols-4 gap-3">
            <label className="md:col-span-2 flex items-center gap-3 rounded-2xl px-4 py-3 bg-muted/40">
              <Search className="h-5 w-5 text-primary" />
              <input
                value={q}
                onChange={e => setQ(e.target.value)}
                placeholder="Search 'Lalibela', 'Omo', 'coffee', 'trekking'…"
                className="flex-1 bg-transparent outline-none text-foreground placeholder:text-muted-foreground"
              />
            </label>
            <div className="hidden md:flex items-center gap-3 rounded-2xl px-4 py-3 bg-muted/40 cursor-default">
              <Calendar className="h-5 w-5 text-primary" />
              <div>
                <div className="text-xs uppercase tracking-wider text-muted-foreground">When</div>
                <div className="font-medium text-foreground">Any date</div>
              </div>
            </div>
            <button type="submit" className="rounded-2xl bg-primary text-primary-foreground font-semibold flex items-center justify-center gap-2 transition-smooth hover:bg-primary-glow px-4 py-3">
              Search trips <ArrowRight className="h-4 w-4" />
            </button>
          </form>
        </div>
      </section>

      <WeatherWidget />
      <TopThings />
      <WhatsHappening />
      <PlanAhead />
      <Newsletter />
    </>
  );
};

export default Index;
