import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { ArrowRight } from "lucide-react";
import { CATEGORIES, toursByCategory } from "@/data/tours";
import { WeatherWidget } from "@/components/WeatherWidget";

const Tours = () => (
  <>
    <Helmet>
      <title>Ethiopia Tour Categories · Konijet Ethiopia</title>
      <meta name="description" content="Browse Konijet Ethiopia's tour categories — adventure, birding, coffee, cultural, festival, historical, trekking and more." />
    </Helmet>

    <section className="container-page pt-10 pb-4">
      <span className="text-xs uppercase tracking-widest text-secondary font-bold">Choose your journey</span>
      <h1 className="font-display text-4xl md:text-5xl text-primary mt-2">Ethiopia tour categories</h1>
      <p className="text-muted-foreground mt-3 max-w-2xl">Pick a category to see every itinerary inside it on the interactive Explore map.</p>
    </section>

    <WeatherWidget />

    <section className="container-page pb-20 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {CATEGORIES.map((c, i) => {
        const count = toursByCategory(c.slug).length;
        const curve = ["curve-card-tr", "curve-card-tl", "curve-card-br", "curve-card-bl"][i % 4];
        return (
          <Link
            key={c.slug}
            to={`/explore?category=${c.slug}`}
            className={`group relative overflow-hidden rounded-[2rem] ${curve} bg-primary text-primary-foreground shadow-soft transition-smooth hover:shadow-elevated`}
          >
            <img src={c.image} alt={c.name} loading="lazy" className="h-72 w-full object-cover transition-smooth group-hover:scale-105" />
            <div className="absolute inset-0 bg-gradient-hero" />
            <div className="absolute inset-x-0 bottom-0 p-5">
              <span className="inline-block rounded-full bg-secondary/95 px-2.5 py-0.5 text-xs font-semibold text-secondary-foreground">{count} tours</span>
              <h3 className="mt-2 font-display text-2xl leading-snug">{c.name}</h3>
              <p className="text-sm text-primary-foreground/85 mt-1 line-clamp-2">{c.blurb}</p>
              <span className="mt-3 inline-flex items-center gap-1 text-sm group-hover:text-secondary">
                Explore tours <ArrowRight className="h-4 w-4" />
              </span>
            </div>
          </Link>
        );
      })}
    </section>
  </>
);

export default Tours;
