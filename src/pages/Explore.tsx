import { useEffect, useMemo, useRef, useState } from "react";
import Globe from "react-globe.gl";
import { Helmet } from "react-helmet-async";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { ArrowLeft, Search, X } from "lucide-react";
import { CATEGORIES, TOURS, toursByCategory, searchTours, getCategory, type Tour } from "@/data/tours";
import { TourCard } from "@/components/TourCard";
import { WeatherWidget } from "@/components/WeatherWidget";

const ETHIOPIA_CENTER = { lat: 9.145, lng: 40.4897, altitude: 0.6 };

const ETHIOPIAN_CITIES = [
  { name: "Addis Ababa", lat: 9.03, lng: 38.74 },
  { name: "Lalibela", lat: 12.03, lng: 39.05 },
  { name: "Gondar", lat: 12.6, lng: 37.47 },
  { name: "Axum", lat: 14.12, lng: 38.72 },
  { name: "Bahir Dar", lat: 11.6, lng: 37.39 },
  { name: "Mekelle", lat: 13.49, lng: 39.47 },
  { name: "Dire Dawa", lat: 9.59, lng: 41.86 },
  { name: "Harar", lat: 9.31, lng: 42.13 },
  { name: "Awassa", lat: 7.06, lng: 38.47 },
  { name: "Jinka", lat: 5.78, lng: 36.57 },
  { name: "Arba Minch", lat: 6.04, lng: 37.55 },
];

const NEIGHBOURS = [
  { name: "Sudan", lat: 15.5, lng: 32.5 },
  { name: "South Sudan", lat: 7.0, lng: 31.0 },
  { name: "Eritrea", lat: 15.5, lng: 39.5 },
  { name: "Djibouti", lat: 11.8, lng: 42.6 },
  { name: "Somalia", lat: 5.5, lng: 46.5 },
  { name: "Kenya", lat: 1.5, lng: 38.0 },
];

const Explore = () => {
  const [params, setParams] = useSearchParams();
  const navigate = useNavigate();
  const globeRef = useRef<any>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [size, setSize] = useState({ w: 600, h: 600 });
  const [altitude, setAltitude] = useState(2.5);
  const [hovered, setHovered] = useState<Tour | null>(null);

  const categorySlug = params.get("category") || "";
  const initialQ = params.get("q") || "";
  const [query, setQuery] = useState(initialQ);

  useEffect(() => { setQuery(params.get("q") || ""); }, [params]);

  const visibleTours = useMemo(() => {
    let list: Tour[] = categorySlug ? toursByCategory(categorySlug) : TOURS;
    if (query.trim()) {
      const q = query.toLowerCase();
      list = list.filter(t =>
        t.title.toLowerCase().includes(q) ||
        t.region.toLowerCase().includes(q) ||
        t.shortDescription.toLowerCase().includes(q),
      );
    }
    return list;
  }, [categorySlug, query]);

  const category = categorySlug ? getCategory(categorySlug) : null;

  useEffect(() => {
    const ro = new ResizeObserver(es => {
      for (const e of es) setSize({ w: e.contentRect.width, h: Math.max(520, e.contentRect.height) });
    });
    if (containerRef.current) ro.observe(containerRef.current);
    return () => ro.disconnect();
  }, []);

  useEffect(() => {
    if (!globeRef.current) return;
    const g = globeRef.current;
    g.controls().autoRotate = true;
    g.controls().autoRotateSpeed = 0.6;
    g.pointOfView({ lat: 0, lng: 0, altitude: 2.5 }, 0);
    const t1 = setTimeout(() => g.pointOfView(ETHIOPIA_CENTER, 2200), 600);
    const t2 = setTimeout(() => { g.controls().autoRotate = false; }, 2800);
    const onZoom = () => setAltitude(g.pointOfView().altitude);
    g.controls().addEventListener("change", onZoom);
    return () => { clearTimeout(t1); clearTimeout(t2); g.controls().removeEventListener("change", onZoom); };
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const next = new URLSearchParams(params);
    if (query.trim()) next.set("q", query.trim()); else next.delete("q");
    setParams(next);
  };

  const clearSearch = () => {
    setQuery("");
    const next = new URLSearchParams(params);
    next.delete("q");
    setParams(next);
  };

  const clearAll = () => navigate("/explore");

  // City labels appear when zoomed in; country labels always (further out)
  const cityLabels = altitude < 1.5 ? ETHIOPIAN_CITIES.map(c => ({ ...c, size: 0.7, color: "white", type: "city" as const })) : [];
  const countryLabels = NEIGHBOURS.map(c => ({ ...c, size: altitude > 1.2 ? 1.4 : 0.9, color: "rgba(255,209,102,0.85)", type: "country" as const }));
  const labels = [...countryLabels, ...cityLabels];

  // Custom red pin HTML element
  const pinHtml = (tour: Tour) => {
    const el = document.createElement("div");
    el.style.cssText = `transform:translate(-50%,-100%);cursor:pointer;`;
    el.innerHTML = `
      <div style="position:relative;">
        <svg width="28" height="36" viewBox="0 0 24 32" xmlns="http://www.w3.org/2000/svg" style="filter: drop-shadow(0 4px 6px rgba(0,0,0,0.5));">
          <path d="M12 0C5.4 0 0 5.4 0 12c0 9 12 20 12 20s12-11 12-20C24 5.4 18.6 0 12 0z" fill="#dc2626"/>
          <circle cx="12" cy="12" r="5" fill="white"/>
        </svg>
      </div>`;
    el.addEventListener("mouseenter", () => setHovered(tour));
    el.addEventListener("mouseleave", () => setHovered(h => h?.slug === tour.slug ? null : h));
    el.addEventListener("click", () => navigate(`/tours/${tour.slug}`));
    return el;
  };

  return (
    <>
      <Helmet>
        <title>{category ? `${category.name} · Konijet Ethiopia` : "Explore Ethiopia · Konijet Ethiopia"}</title>
        <meta name="description" content="Spin the globe and discover Ethiopia's regions and tour packages." />
      </Helmet>

      <section className="container-page pt-8 pb-2">
        <div className="flex items-center gap-3 flex-wrap">
          <button onClick={() => navigate(-1)} className="inline-flex items-center gap-1 rounded-full border border-border bg-card px-3 py-1.5 text-sm font-medium hover:bg-muted transition-smooth">
            <ArrowLeft className="h-4 w-4" /> Back
          </button>
          {(categorySlug || query) && (
            <button onClick={clearAll} className="inline-flex items-center gap-1 rounded-full bg-secondary/20 text-primary px-3 py-1.5 text-sm font-semibold hover:bg-secondary/30 transition-smooth">
              <X className="h-4 w-4" /> Clear filters
            </button>
          )}
          {category && (
            <span className="rounded-full bg-primary text-primary-foreground px-3 py-1.5 text-xs font-bold uppercase tracking-wider">{category.name}</span>
          )}
        </div>
        <div className="mt-4 flex items-end justify-between gap-4 flex-wrap">
          <div>
            <span className="text-xs uppercase tracking-widest text-secondary font-bold">Interactive globe</span>
            <h1 className="font-display text-4xl md:text-5xl text-primary mt-2">{category ? category.name : "Explore Ethiopia"}</h1>
            <p className="text-muted-foreground mt-2 max-w-xl">{category?.blurb || "Hover the red pins to see tour previews. Click to open the full itinerary."}</p>
          </div>

          <form onSubmit={handleSearch} className="flex items-center gap-2 rounded-full border border-border bg-card px-3 py-2 shadow-soft min-w-[260px]">
            <Search className="h-4 w-4 text-muted-foreground" />
            <input
              value={query}
              onChange={e => setQuery(e.target.value)}
              placeholder="Search tours, regions…"
              className="flex-1 bg-transparent outline-none text-sm"
            />
            {query && (
              <button type="button" onClick={clearSearch} className="rounded-full p-1 hover:bg-muted" aria-label="Clear search">
                <X className="h-3.5 w-3.5" />
              </button>
            )}
            <button type="submit" className="rounded-full bg-primary text-primary-foreground px-3 py-1 text-xs font-semibold">Search</button>
          </form>
        </div>
      </section>

      <section className="container-page pb-12 grid lg:grid-cols-5 gap-6">
        <div ref={containerRef} className="lg:col-span-3 relative rounded-[2rem] overflow-hidden bg-gradient-deep shadow-elevated min-h-[560px]">
          <Globe
            ref={globeRef}
            width={size.w}
            height={size.h}
            backgroundColor="rgba(0,0,0,0)"
            globeImageUrl="//unpkg.com/three-globe/example/img/earth-night.jpg"
            bumpImageUrl="//unpkg.com/three-globe/example/img/earth-topology.png"
            atmosphereColor="hsl(195, 70%, 60%)"
            atmosphereAltitude={0.22}
            htmlElementsData={visibleTours}
            htmlLat={(d: any) => d.lat}
            htmlLng={(d: any) => d.lng}
            htmlElement={(d: any) => pinHtml(d)}
            labelsData={labels}
            labelLat={(d: any) => d.lat}
            labelLng={(d: any) => d.lng}
            labelText={(d: any) => d.name}
            labelSize={(d: any) => d.size}
            labelColor={(d: any) => d.color}
            labelDotRadius={0.2}
            labelResolution={2}
          />
          {hovered && (
            <div className="absolute top-3 right-3 max-w-[260px] rounded-2xl bg-background/95 backdrop-blur shadow-elevated p-3 pointer-events-none">
              <img src={hovered.image} alt={hovered.title} className="rounded-lg w-full h-24 object-cover mb-2" />
              <h4 className="font-display text-sm text-primary line-clamp-2">{hovered.title}</h4>
              <div className="text-xs text-muted-foreground mt-1">{hovered.durationLabel} · ${hovered.priceUSD}</div>
            </div>
          )}
        </div>

        <aside className="lg:col-span-2 space-y-4">
          <div className="rounded-3xl bg-card border border-border p-5 shadow-soft">
            <h2 className="font-display text-2xl text-primary">{visibleTours.length} {visibleTours.length === 1 ? "tour" : "tours"}</h2>
            <p className="text-sm text-muted-foreground mt-1">{category ? `In ${category.name}` : "Across all categories"}{query ? ` matching "${query}"` : ""}.</p>
            {!categorySlug && (
              <div className="mt-3 flex flex-wrap gap-1.5">
                {CATEGORIES.map(c => (
                  <Link key={c.slug} to={`/explore?category=${c.slug}`} className="text-xs rounded-full bg-muted px-2.5 py-1 hover:bg-secondary/30 transition-smooth">
                    {c.name.replace(" Tours", "")}
                  </Link>
                ))}
              </div>
            )}
          </div>

          <div className="grid grid-cols-1 gap-4 max-h-[640px] overflow-y-auto pr-1">
            {visibleTours.length === 0 && (
              <div className="rounded-2xl border border-dashed border-border p-6 text-center text-sm text-muted-foreground">
                No tours match. <button onClick={clearAll} className="text-secondary font-semibold underline">Clear filters</button>
              </div>
            )}
            {visibleTours.map(t => <TourCard key={t.slug} tour={t} />)}
          </div>
        </aside>
      </section>

      <WeatherWidget />
    </>
  );
};

export default Explore;
