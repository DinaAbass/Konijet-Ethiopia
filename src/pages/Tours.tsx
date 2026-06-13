"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useTranslation } from "react-i18next";
import { CATEGORIES, toursByCategory } from "@/data/tours";
import { WeatherWidget } from "@/components/WeatherWidget";

const Tours = () => {
const { t } = useTranslation();
return (
<>
<section className="container-page pt-10 pb-4">
<span className="text-xs uppercase tracking-widest text-secondary font-bold">{t("toursPage.eyebrow")}</span>
<h1 className="font-display text-4xl md:text-5xl text-primary mt-2">{t("toursPage.title")}</h1>
<p className="text-muted-foreground mt-3 max-w-2xl">{t("toursPage.subtitle")}</p>
</section>

<WeatherWidget />

<section className="container-page pb-20 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
{CATEGORIES.map((c, i) => {
const count = toursByCategory(c.slug).length;
const curve = ["curve-card-tr", "curve-card-tl", "curve-card-br", "curve-card-bl"][i % 4];
return (
<Link
key={c.slug}
href={`/explore?category=${c.slug}`}
className={`group relative overflow-hidden rounded-[2rem] ${curve} bg-primary text-primary-foreground shadow-soft transition-smooth hover:shadow-elevated`}
>
<img src={c.image} alt={t("categories." + c.slug + ".name", c.name)} loading="lazy" className="h-72 w-full object-cover transition-smooth group-hover:scale-105" />
<div className="absolute inset-0 bg-gradient-hero" />
<div className="absolute inset-x-0 bottom-0 p-5">
<span className="inline-block rounded-full bg-secondary/95 px-2.5 py-0.5 text-xs font-semibold text-secondary-foreground">{t("toursPage.tourCount", { count })}</span>
<h3 className="mt-2 font-display text-2xl leading-snug">{t("categories." + c.slug + ".name", c.name)}</h3>
<p className="text-sm text-primary-foreground/85 mt-1 line-clamp-2">{t("categories." + c.slug + ".blurb", c.blurb)}</p>
<span className="mt-3 inline-flex items-center gap-1 text-sm group-hover:text-secondary">
{t("toursPage.exploreTours")} <ArrowRight className="h-4 w-4" />
</span>
</div>
</Link>
);
})}
</section>
</>
);
};

export default Tours;
