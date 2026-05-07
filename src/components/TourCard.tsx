import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Star, Clock, Flag } from "lucide-react";
import type { Tour } from "@/data/tours";
import { CATEGORIES } from "@/data/tours";

export const TourCard = ({ tour }: { tour: Tour }) => {
  const { t } = useTranslation();
  if (!tour.available) return null;
  const catNames = tour.categories.map(c => CATEGORIES.find(x => x.slug === c)?.name).filter(Boolean).join(", ");
  const hasDiscount = tour.oldPriceUSD && tour.oldPriceUSD > tour.priceUSD;
  return (
    <article className="relative rounded-3xl bg-card border border-border shadow-soft overflow-hidden flex flex-col transition-smooth hover:shadow-elevated">
      <style>{`@keyframes blink-green { 0%,100%{opacity:1} 50%{opacity:.45} }`}</style>
      <div className="relative">
        <img src={tour.image} alt={tour.title} loading="lazy" className="h-44 w-full object-cover" />
        <span
          className="absolute top-3 left-3 inline-flex items-center gap-1.5 rounded-full bg-background px-2.5 py-0.5 text-xs font-semibold text-emerald-600"
          style={{ animation: "blink-green 1.4s ease-in-out infinite" }}
        >
          <span className="h-2 w-2 rounded-full bg-emerald-500" />
          {t("tour.available", "Available")}
        </span>
        <span className="absolute -bottom-3 right-4 inline-flex items-center gap-1 rounded-full bg-background px-2.5 py-1 text-xs font-semibold shadow-soft">
          <Star className="h-3.5 w-3.5 fill-secondary text-secondary" /> {tour.rating.toFixed(2)}
        </span>
      </div>
      <div className="p-4 pt-5 flex-1 flex flex-col gap-2">
        <h3 className="font-display text-base leading-snug text-primary line-clamp-2">{tour.title}</h3>
        <div className="flex items-center gap-1 text-xs text-muted-foreground"><Clock className="h-3.5 w-3.5" /> {tour.durationLabel}</div>
        <div className="flex items-center gap-1 text-xs text-secondary line-clamp-1"><Flag className="h-3.5 w-3.5" /> {catNames}</div>
        <div className="text-sm">
          {hasDiscount ? (
            <div className="flex items-baseline gap-2 flex-wrap">
              <span className="text-muted-foreground line-through">${tour.oldPriceUSD}</span>
              <span className="rounded-full bg-destructive text-destructive-foreground text-[10px] font-bold px-2 py-0.5">SALE</span>
              <span className="text-emerald-600 font-bold text-lg">${tour.priceUSD}</span>
              <span className="text-xs text-muted-foreground">{t("tour.perPerson", "per person")}</span>
            </div>
          ) : (
            <span className="text-primary font-bold">{t("tour.from", "From")} ${tour.priceUSD}</span>
          )}
        </div>
        <Link to={`/tours/${tour.slug}`} className="mt-auto self-end rounded-full border border-border px-4 py-1.5 text-sm font-medium hover:bg-primary hover:text-primary-foreground transition-smooth">
          {t("tour.exploreTrip", "Explore Trip")}
        </Link>
      </div>
    </article>
  );
};
