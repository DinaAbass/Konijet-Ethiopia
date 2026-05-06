import { Link } from "react-router-dom";
import { Star, Clock, Flag } from "lucide-react";
import type { Tour } from "@/data/tours";
import { CATEGORIES } from "@/data/tours";

export const TourCard = ({ tour }: { tour: Tour }) => {
  const catNames = tour.categories.map(c => CATEGORIES.find(x => x.slug === c)?.name).filter(Boolean).join(", ");
  return (
    <article className="relative rounded-3xl bg-card border border-border shadow-soft overflow-hidden flex flex-col transition-smooth hover:shadow-elevated">
      <div className="relative">
        <img src={tour.image} alt={tour.title} loading="lazy" className="h-44 w-full object-cover" />
        <span className={`absolute top-3 left-3 rounded-full px-2.5 py-0.5 text-xs font-semibold ${tour.available ? "bg-background text-emerald-600" : "bg-background text-destructive"}`}>
          {tour.available ? "Available" : "Sold out"}
        </span>
        <span className="absolute -bottom-3 right-4 inline-flex items-center gap-1 rounded-full bg-background px-2.5 py-1 text-xs font-semibold shadow-soft">
          <Star className="h-3.5 w-3.5 fill-secondary text-secondary" /> {tour.rating.toFixed(2)}
        </span>
      </div>
      <div className="p-4 pt-5 flex-1 flex flex-col gap-2">
        <h3 className="font-display text-base leading-snug text-primary line-clamp-2">{tour.title}</h3>
        <div className="flex items-center gap-1 text-xs text-muted-foreground"><Clock className="h-3.5 w-3.5" /> {tour.durationLabel}</div>
        <div className="flex items-center gap-1 text-xs text-secondary line-clamp-1"><Flag className="h-3.5 w-3.5" /> {catNames}</div>
        {(tour.oldPriceUSD || tour.priceUSD) && (
          <div className="text-sm">
            {tour.oldPriceUSD && <span className="text-muted-foreground line-through mr-2">${tour.oldPriceUSD}</span>}
            <span className="text-destructive font-bold">From ${tour.priceUSD}</span>
          </div>
        )}
        <Link to={`/tours/${tour.slug}`} className="mt-auto self-end rounded-full border border-border px-4 py-1.5 text-sm font-medium hover:bg-primary hover:text-primary-foreground transition-smooth">
          View Trip
        </Link>
      </div>
    </article>
  );
};
