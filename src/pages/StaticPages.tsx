"use client";

import { useTranslation } from "react-i18next";
import { MoveRight, Shield, FileText, Heart, Users, Leaf } from "lucide-react";
import Link from "next/link";

export default function StaticPagesPlaceholder() {
  return null;
}

export const About = () => {
  const { t } = useTranslation();

  const valueIcons = [Heart, Users, Leaf];

  return (
    <div className="flex flex-col gap-24 py-16">
      {/* Hero */}
      <section className="container-page flex flex-col items-center text-center max-w-4xl">
        <h1 className="font-display text-6xl md:text-7xl text-primary leading-tight">
          {t("about.hero.title")}
        </h1>
        <p className="mt-8 text-xl text-foreground/70 leading-relaxed max-w-2xl">
          {t("about.hero.subtitle")}
        </p>
      </section>

      {/* Our Story */}
      <section className="container-page grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
        <div className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-muted">
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
          <div className="absolute inset-0 flex items-center justify-center text-muted-foreground/30">
            <span className="text-6xl">🇪🇹</span>
          </div>
        </div>
        <div>
          <h2 className="font-display text-4xl text-primary mb-8">{t("about.story.title")}</h2>
          <div className="text-lg text-foreground/80 space-y-6 whitespace-pre-line leading-relaxed">
            {t("about.story.content")}
          </div>
        </div>
      </section>

      {/* Mission + Values */}
      <section className="bg-muted/30 py-24">
        <div className="container-page">
          <div className="max-w-2xl mb-16">
            <h2 className="font-display text-4xl text-primary mb-4">{t("about.mission.title")}</h2>
            <p className="text-xl text-foreground/80 italic border-l-4 border-accent pl-6 py-2">
              "{t("about.mission.content")}"
            </p>
          </div>

          <h3 className="font-display text-2xl text-primary mb-8">{t("about.values.title")}</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {([1, 2, 3] as const).map((i, idx) => {
              const Icon = valueIcons[idx];
              return (
                <div key={i} className="bg-background p-10 rounded-2xl border border-border shadow-sm hover:shadow-md transition-shadow">
                  <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center mb-6">
                    <Icon className="w-6 h-6 text-accent" />
                  </div>
                  <h4 className="font-display text-xl mb-4">{t(`about.values.v${i}.title`)}</h4>
                  <p className="text-foreground/70 leading-relaxed">{t(`about.values.v${i}.content`)}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="container-page grid grid-cols-2 md:grid-cols-4 gap-12 text-center py-8">
        {([1, 2, 3, 4] as const).map((i) => (
          <div key={i}>
            <div className="font-display text-5xl text-accent mb-2">{t(`about.stats.s${i}.value`)}</div>
            <div className="text-foreground/60 uppercase tracking-widest text-sm font-medium">
              {t(`about.stats.s${i}.label`)}
            </div>
          </div>
        ))}
      </section>

      {/* Why Ethiopia */}
      <section className="container-page max-w-4xl">
        <h2 className="font-display text-4xl text-primary mb-8">{t("about.whyEthiopia.title")}</h2>
        <div className="bg-accent/5 p-12 rounded-3xl border border-accent/10">
          <p className="text-lg text-foreground/80 leading-relaxed mb-8">
            {t("about.whyEthiopia.content")}
          </p>
          <ul className="space-y-3">
            {(t("about.whyEthiopia.points", { returnObjects: true }) as string[]).map((point, i) => (
              <li key={i} className="flex items-start gap-3 text-foreground/80">
                <span className="text-accent mt-1">•</span>
                <span>{point}</span>
              </li>
            ))}
          </ul>
          <p className="mt-8 text-lg font-medium text-primary italic">
            {t("about.whyEthiopia.footer")}
          </p>
        </div>
      </section>

      {/* CTA */}
      <section className="container-page pb-20">
        <div className="relative overflow-hidden rounded-[2.5rem] curve-card-bl bg-gradient-deep p-12 md:p-16 text-primary-foreground text-center">
          <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-secondary/30 blur-3xl" />
          <div className="pointer-events-none absolute inset-0 opacity-5 bg-[radial-gradient(ellipse_at_top_right,_white_0%,_transparent_60%)]" />
          <span className="text-secondary text-xs font-bold uppercase tracking-widest">
            {t("about.cta.eyebrow", "Plan Your Journey")}
          </span>
          <h2 className="mt-4 font-display text-4xl md:text-5xl text-balance">
            {t("about.cta.title")}
          </h2>
          <p className="mt-4 mx-auto max-w-xl text-primary-foreground/80 text-lg">
            {t("about.cta.subtitle")}
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link
              href="/explore"
              className="inline-flex items-center gap-2 rounded-full bg-secondary px-8 py-4 font-semibold text-secondary-foreground transition-smooth hover:brightness-110"
            >
              {t("about.cta.explore")} <MoveRight className="h-4 w-4" />
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-full border border-primary-foreground/30 px-8 py-4 font-semibold text-primary-foreground transition-smooth hover:bg-primary-foreground/10"
            >
              {t("about.cta.contact")}
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export const Privacy = () => {
  const { t } = useTranslation();
  const sections = t("privacy.sections", { returnObjects: true }) as { title: string; content: string }[];

  return (
    <div className="flex flex-col gap-12 py-16">
      {/* Header */}
      <section className="container-page max-w-3xl">
        <div className="flex items-center gap-4 mb-6">
          <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center">
            <Shield className="w-6 h-6 text-accent" />
          </div>
          <span className="text-sm text-foreground/50 uppercase tracking-widest">{t("privacy.lastUpdated")}</span>
        </div>
        <h1 className="font-display text-6xl text-primary mb-8">{t("privacy.title")}</h1>
        <p className="text-xl text-foreground/70 leading-relaxed">{t("privacy.content")}</p>
      </section>

      {/* Sections */}
      <section className="container-page max-w-3xl">
        <div className="space-y-12">
          {Array.isArray(sections) && sections.map((section, i) => (
            <div key={i} className="border-l-2 border-accent/20 pl-8">
              <h2 className="font-display text-2xl text-primary mb-4">{section.title}</h2>
              <p className="text-lg text-foreground/80 leading-relaxed whitespace-pre-line">{section.content}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export const Terms = () => {
  const { t } = useTranslation();
  const sections = t("terms.sections", { returnObjects: true }) as { title: string; content: string }[];

  return (
    <div className="flex flex-col gap-12 py-16">
      {/* Header */}
      <section className="container-page max-w-3xl">
        <div className="flex items-center gap-4 mb-6">
          <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center">
            <FileText className="w-6 h-6 text-accent" />
          </div>
          <span className="text-sm text-foreground/50 uppercase tracking-widest">{t("terms.lastUpdated")}</span>
        </div>
        <h1 className="font-display text-6xl text-primary mb-8">{t("terms.title")}</h1>
        <p className="text-xl text-foreground/70 leading-relaxed">{t("terms.content")}</p>
      </section>

      {/* Sections */}
      <section className="container-page max-w-3xl">
        <div className="space-y-12">
          {Array.isArray(sections) && sections.map((section, i) => (
            <div key={i} className="border-l-2 border-accent/20 pl-8">
              <h2 className="font-display text-2xl text-primary mb-4">{section.title}</h2>
              <p className="text-lg text-foreground/80 leading-relaxed whitespace-pre-line">{section.content}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
