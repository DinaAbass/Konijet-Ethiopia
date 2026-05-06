import { useParams, Link, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { ArrowLeft, Clock, Star, MapPin, Check, X as XIcon, Flag } from "lucide-react";
import { getTour, CATEGORIES } from "@/data/tours";
import { WeatherWidget } from "@/components/WeatherWidget";
import NotFound from "./NotFound";

const TourDetail = () => {
  const { slug = "" } = useParams();
  const navigate = useNavigate();
  const tour = getTour(slug);
  if (!tour) return <NotFound />;

  const cats = tour.categories.map(c => CATEGORIES.find(x => x.slug === c)).filter(Boolean);

  return (
    <>
      <Helmet>
        <title>{tour.title} · Konijet Ethiopia</title>
        <meta name="description" content={tour.shortDescription} />
      </Helmet>

      <section className="container-page pt-6">
        <button onClick={() => navigate(-1)} className="inline-flex items-center gap-1 rounded-full border border-border bg-card px-3 py-1.5 text-sm font-medium hover:bg-muted transition-smooth">
          <ArrowLeft className="h-4 w-4" /> Back
        </button>

        <div className="relative overflow-hidden rounded-[2.5rem] curve-card-bl mt-4">
          <img src={tour.image} alt={tour.title} className="h-[60vh] min-h-[420px] w-full object-cover" />
          <div className="absolute inset-0 bg-gradient-hero" />
          <div className="absolute inset-x-0 bottom-0 p-6 md:p-12 text-primary-foreground">
            <div className="flex flex-wrap gap-2 mb-3">
              {cats.map(c => c && (
                <Link key={c.slug} to={`/explore?category=${c.slug}`} className="rounded-full bg-secondary/90 text-secondary-foreground px-3 py-1 text-xs font-semibold">
                  {c.name}
                </Link>
              ))}
              <span className={`rounded-full px-3 py-1 text-xs font-semibold ${tour.available ? "bg-emerald-500 text-white" : "bg-destructive text-destructive-foreground"}`}>
                {tour.available ? "Available" : "Sold out"}
              </span>
            </div>
            <h1 className="font-display text-3xl md:text-5xl max-w-4xl leading-tight">{tour.title}</h1>
            <div className="mt-4 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm">
              <span className="inline-flex items-center gap-1"><Clock className="h-4 w-4" /> {tour.durationLabel}</span>
              <span className="inline-flex items-center gap-1"><MapPin className="h-4 w-4" /> {tour.region}</span>
              <span className="inline-flex items-center gap-1"><Star className="h-4 w-4 fill-secondary text-secondary" /> {tour.rating.toFixed(2)}</span>
              <span className="inline-flex items-center gap-1"><Flag className="h-4 w-4" /> Konijet Ethiopia</span>
            </div>
          </div>
        </div>
      </section>

      <section className="container-page py-12 grid lg:grid-cols-3 gap-10">
        <div className="lg:col-span-2 space-y-10">
          <div>
            <h2 className="font-display text-3xl text-primary mb-3">About this trip</h2>
            <p className="text-foreground/80 leading-relaxed">{tour.longDescription}</p>
          </div>

          <div>
            <h2 className="font-display text-3xl text-primary mb-3">Highlights</h2>
            <ul className="grid sm:grid-cols-2 gap-2">
              {tour.highlights.map(h => (
                <li key={h} className="flex items-start gap-2 text-sm">
                  <Check className="h-4 w-4 text-emerald-600 mt-0.5 flex-shrink-0" /> {h}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="font-display text-3xl text-primary mb-4">Day-by-day itinerary</h2>
            <ol className="space-y-4">
              {tour.itinerary.map((d, i) => (
                <li key={i} className="rounded-2xl border border-border bg-card p-5 shadow-soft">
                  <div className="text-xs uppercase tracking-wider text-secondary font-bold">{d.day}</div>
                  <h3 className="font-display text-lg text-primary mt-1">{d.title}</h3>
                  <p className="text-sm text-foreground/75 mt-2">{d.details}</p>
                </li>
              ))}
            </ol>
          </div>

          <div className="grid sm:grid-cols-2 gap-6">
            <div>
              <h3 className="font-display text-xl text-primary mb-2">What's included</h3>
              <ul className="space-y-1.5 text-sm">
                {tour.includes.map(x => <li key={x} className="flex items-start gap-2"><Check className="h-4 w-4 text-emerald-600 mt-0.5 flex-shrink-0" /> {x}</li>)}
              </ul>
            </div>
            <div>
              <h3 className="font-display text-xl text-primary mb-2">Not included</h3>
              <ul className="space-y-1.5 text-sm">
                {tour.excludes.map(x => <li key={x} className="flex items-start gap-2"><XIcon className="h-4 w-4 text-destructive mt-0.5 flex-shrink-0" /> {x}</li>)}
              </ul>
            </div>
          </div>
        </div>

        <aside className="space-y-4">
          <div className="rounded-3xl bg-card border border-border p-6 shadow-elevated sticky top-24">
            <div className="text-sm text-muted-foreground">From</div>
            <div className="flex items-baseline gap-2">
              {tour.oldPriceUSD && <span className="text-lg text-muted-foreground line-through">${tour.oldPriceUSD}</span>}
              <span className="font-display text-4xl text-primary">${tour.priceUSD}</span>
            </div>
            <div className="text-xs text-muted-foreground">per person, twin share</div>
            <Link to="/contact" className="mt-5 block w-full rounded-full bg-secondary text-secondary-foreground text-center px-6 py-3 font-semibold shadow-soft hover:shadow-gold transition-smooth">
              Enquire about this trip
            </Link>
            <Link to={`/explore?category=${tour.categories[0]}`} className="mt-2 block w-full rounded-full border border-border text-center px-6 py-3 text-sm font-medium hover:bg-muted transition-smooth">
              See similar trips
            </Link>
            <div className="mt-5 pt-5 border-t border-border space-y-2 text-sm">
              <div className="flex justify-between"><span className="text-muted-foreground">Duration</span><span className="font-medium">{tour.durationLabel}</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Region</span><span className="font-medium">{tour.region}</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Status</span><span className={`font-medium ${tour.available ? "text-emerald-600" : "text-destructive"}`}>{tour.available ? "Available" : "Sold out"}</span></div>
            </div>
          </div>
        </aside>
      </section>

      <WeatherWidget />
    </>
  );
};

export default TourDetail;
