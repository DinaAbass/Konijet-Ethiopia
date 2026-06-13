"use client";

import Link from "next/link";
import { useTranslation } from "react-i18next";
import { ArrowRight, Coffee, Mountain, Users, Star, Camera, Utensils, Music } from "lucide-react";

const hero = "/img/dest-omo.jpg";

const pillarIcons: Record<string, any> = {
  liveWithLocals: Users,
  coffeeOrigin: Coffee,
  guidedByNature: Mountain,
  cookAndEat: Utensils,
  festivalAccess: Music,
  creativeTravel: Camera,
};

const pillarKeys = ["liveWithLocals", "coffeeOrigin", "guidedByNature", "cookAndEat", "festivalAccess", "creativeTravel"] as const;

const experienceData = [
  { image: "/img/dest-omo.jpg", key: "e1", href: "/tours?category=cultural" },
  { image: "/img/culture-coffee.jpg", key: "e2", href: "/tours?category=coffee" },
  { image: "/img/dest-danakil.jpg", key: "e3", href: "/tours?category=adventure" },
  { image: "/img/dest-lalibela.jpg", key: "e4", href: "/tours?category=festival" },
];

const testimonialKeys = ["t1", "t2", "t3"] as const;

const Experience = () => {
  const { t } = useTranslation();

  return (
    <>
      <section className="container-page pt-6">
        <div className="relative overflow-hidden rounded-[2.5rem] curve-card-tr">
          <img
            src={hero}
            alt={t("experience.hero.title")}
            className="h-[60vh] min-h-[420px] w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
          <div className="absolute inset-0 flex items-end">
            <div className="container-page pb-12 text-white">
              <span className="inline-block rounded-full bg-secondary px-3 py-1 text-xs font-bold uppercase tracking-widest text-secondary-foreground">
                {t("experience.hero.eyebrow")}
              </span>
              <h1 className="mt-4 font-display text-5xl md:text-7xl text-balance leading-tight">
                {t("experience.hero.title")}
              </h1>
              <p className="mt-4 max-w-2xl text-lg text-white/85">
                {t("experience.hero.subtitle")}
              </p>
              <div className="mt-8 flex flex-wrap gap-4">
                <Link
                  href="/tours"
                  className="inline-flex items-center gap-2 rounded-full bg-secondary px-6 py-3 text-sm font-semibold text-secondary-foreground transition-smooth hover:brightness-110"
                >
                  {t("experience.hero.ctaPrimary")} <ArrowRight className="h-4 w-4" />
                </Link>
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 rounded-full border border-white/40 bg-white/10 px-6 py-3 text-sm font-semibold text-white backdrop-blur-sm transition-smooth hover:bg-white/20"
                >
                  {t("experience.hero.ctaSecondary")}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="container-page py-20">
        <div className="mx-auto max-w-3xl text-center">
          <span className="text-secondary text-xs font-bold uppercase tracking-widest">
            {t("experience.philosophy.eyebrow")}
          </span>
          <h2 className="mt-3 font-display text-4xl md:text-5xl text-balance">
            {t("experience.philosophy.title")}
          </h2>
          <p className="mt-5 text-muted-foreground text-lg leading-relaxed">
            {t("experience.philosophy.body")}
          </p>
        </div>

        <div className="mt-16 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {pillarKeys.map(key => {
            const Icon = pillarIcons[key];
            return (
              <div
                key={key}
                className="group rounded-[1.5rem] border border-border bg-card p-7 shadow-soft transition-smooth hover:shadow-elevated hover:-translate-y-1"
              >
                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-secondary/10 text-secondary">
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="font-display text-xl font-semibold">{t(`experience.pillars.${key}.title`)}</h3>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{t(`experience.pillars.${key}.body`)}</p>
              </div>
            );
          })}
        </div>
      </section>

      <section className="bg-muted/40 py-20">
        <div className="container-page">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-12">
            <div>
              <span className="text-secondary text-xs font-bold uppercase tracking-widest">
                {t("experience.immersive.eyebrow")}
              </span>
              <h2 className="mt-3 font-display text-4xl md:text-5xl">
                {t("experience.immersive.title")}
              </h2>
            </div>
            <Link
              href="/tours"
              className="inline-flex shrink-0 items-center gap-2 text-sm font-semibold text-secondary hover:underline"
            >
              {t("experience.immersive.viewAll")} <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="space-y-6">
            {experienceData.map((exp, i) => (
              <Link
                key={exp.key}
                href={exp.href}
                className={`group flex flex-col md:flex-row overflow-hidden rounded-[2rem] bg-card shadow-soft transition-smooth hover:shadow-elevated ${
                  i % 2 === 1 ? "md:flex-row-reverse" : ""
                }`}
              >
                <div className="relative md:w-2/5 h-64 md:h-auto overflow-hidden">
                  <img
                    src={exp.image}
                    alt={t(`experience.immersive.${exp.key}.title`)}
                    className="h-full w-full object-cover transition-smooth group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                  <span className="absolute top-4 left-4 rounded-full bg-secondary px-3 py-1 text-xs font-bold text-secondary-foreground">
                    {t(`experience.immersive.${exp.key}.tag`)}
                  </span>
                </div>

                <div className="flex flex-1 flex-col justify-center p-8 md:p-12">
                  <span className="text-secondary text-xs font-bold uppercase tracking-widest">
                    {t(`experience.immersive.${exp.key}.eyebrow`)}
                  </span>
                  <h3 className="mt-3 font-display text-3xl leading-tight">{t(`experience.immersive.${exp.key}.title`)}</h3>
                  <p className="mt-4 text-muted-foreground leading-relaxed">{t(`experience.immersive.${exp.key}.body`)}</p>
                  <div className="mt-6 flex items-center gap-4">
                    <span className="text-xs text-muted-foreground border border-border rounded-full px-3 py-1">
                      {t(`experience.immersive.${exp.key}.duration`)}
                    </span>
                    <span className="inline-flex items-center gap-1 text-sm font-semibold text-secondary group-hover:gap-2 transition-smooth">
                      {t("experience.immersive.exploreTour")} <ArrowRight className="h-4 w-4" />
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="container-page py-20">
        <div className="text-center mb-12">
          <span className="text-secondary text-xs font-bold uppercase tracking-widest">
            {t("experience.testimonials.eyebrow")}
          </span>
          <h2 className="mt-3 font-display text-4xl md:text-5xl">{t("experience.testimonials.title")}</h2>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {testimonialKeys.map(key => (
            <div
              key={key}
              className="rounded-[1.5rem] border border-border bg-card p-8 shadow-soft flex flex-col"
            >
              <div className="flex gap-1 mb-5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-secondary text-secondary" />
                ))}
              </div>
              <p className="text-muted-foreground leading-relaxed flex-1 italic">
                &ldquo;{t(`experience.testimonials.${key}.quote`)}&rdquo;
              </p>
              <div className="mt-6 pt-6 border-t border-border">
                <p className="font-semibold text-sm">{t(`experience.testimonials.${key}.name`)}</p>
                <p className="text-xs text-muted-foreground">{t(`experience.testimonials.${key}.origin`)}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="container-page pb-20">
        <div className="relative overflow-hidden rounded-[2.5rem] curve-card-bl bg-gradient-deep p-12 md:p-16 text-primary-foreground text-center">
          <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-secondary/30 blur-3xl" />
          <div className="pointer-events-none absolute inset-0 opacity-5 bg-[radial-gradient(ellipse_at_top_right,_white_0%,_transparent_60%)]" />
          <span className="text-secondary text-xs font-bold uppercase tracking-widest">
            {t("experience.cta.eyebrow")}
          </span>
          <h2 className="mt-4 font-display text-4xl md:text-5xl text-balance">
            {t("experience.cta.title")}
          </h2>
          <p className="mt-4 mx-auto max-w-xl text-primary-foreground/80 text-lg">
            {t("experience.cta.subtitle")}
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link
              href="/planning"
              className="inline-flex items-center gap-2 rounded-full bg-secondary px-8 py-4 font-semibold text-secondary-foreground transition-smooth hover:brightness-110"
            >
              {t("experience.cta.primary")} <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/tours"
              className="inline-flex items-center gap-2 rounded-full border border-primary-foreground/30 px-8 py-4 font-semibold text-primary-foreground transition-smooth hover:bg-primary-foreground/10"
            >
              {t("experience.cta.secondary")}
            </Link>
          </div>
        </div>
      </section>
    </>
  );
};

export default Experience;
