import { useEffect, useRef, useState } from "react";
import Globe from "react-globe.gl";
import { useTranslation } from "react-i18next";
import { getDestinations, getPackages, type Destination, type TourPackage } from "@/lib/appwrite";
import { Helmet } from "react-helmet-async";
import { ArrowRight } from "lucide-react";

const ETHIOPIA_CENTER = { lat: 9.145, lng: 40.4897, altitude: 0.6 };

const Explore = () => {
  const { t } = useTranslation();
  const globeRef = useRef<any>(null);
  const [dests, setDests] = useState<Destination[]>([]);
  const [packages, setPackages] = useState<TourPackage[]>([]);
  const [selected, setSelected] = useState<Destination | null>(null);
  const [size, setSize] = useState({ w: 600, h: 600 });
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    getDestinations().then(setDests);
    getPackages().then(setPackages);
  }, []);

  useEffect(() => {
    const ro = new ResizeObserver(entries => {
      for (const e of entries) {
        setSize({ w: e.contentRect.width, h: Math.max(420, e.contentRect.height) });
      }
    });
    if (containerRef.current) ro.observe(containerRef.current);
    return () => ro.disconnect();
  }, []);

  // Initial earth → Ethiopia zoom
  useEffect(() => {
    if (!globeRef.current) return;
    const g = globeRef.current;
    g.controls().autoRotate = true;
    g.controls().autoRotateSpeed = 0.6;
    g.pointOfView({ lat: 0, lng: 0, altitude: 2.5 }, 0);
    const t1 = setTimeout(() => g.pointOfView(ETHIOPIA_CENTER, 2200), 600);
    const t2 = setTimeout(() => { g.controls().autoRotate = false; }, 2800);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, [dests.length]);

  const handleSelect = (dest: Destination) => {
    setSelected(dest);
    globeRef.current?.pointOfView({ lat: dest.lat, lng: dest.lng, altitude: 0.35 }, 1600);
  };

  const visiblePackages = selected ? packages.filter(p => p.destinationSlug === selected.slug) : packages;

  return (
    <>
      <Helmet>
        <title>Explore Ethiopia · Konijet Ethiopia</title>
        <meta name="description" content="Spin the globe and discover Ethiopia's regions and tour packages — Lalibela, Axum, Danakil, Omo Valley and more." />
      </Helmet>

      <section className="container-page pt-8 pb-6">
        <div className="flex items-end justify-between gap-4 flex-wrap">
          <div>
            <span className="text-xs uppercase tracking-widest text-secondary font-bold">Interactive globe</span>
            <h1 className="font-display text-4xl md:text-5xl text-primary mt-2">Explore Ethiopia</h1>
            <p className="text-muted-foreground mt-2 max-w-xl">Click a region to zoom in and reveal curated tour packages.</p>
          </div>
        </div>
      </section>

      <section className="container-page pb-24 grid lg:grid-cols-5 gap-6">
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
            pointsData={dests}
            pointLat={(d: any) => d.lat}
            pointLng={(d: any) => d.lng}
            pointColor={(d: any) => (selected?.slug === d.slug ? "#f6b93b" : "#ffd166")}
            pointAltitude={0.04}
            pointRadius={0.6}
            pointLabel={(d: any) => `<div style="background:hsl(200,75%,14%);color:#fff;padding:6px 10px;border-radius:8px;font-family:Inter">${d.name}</div>`}
            onPointClick={(d: any) => handleSelect(d)}
          />
          <div className="absolute bottom-3 left-3 right-3 flex flex-wrap gap-2">
            {dests.map(d => (
              <button
                key={d.id}
                onClick={() => handleSelect(d)}
                className={`rounded-full px-3 py-1.5 text-xs font-semibold backdrop-blur transition-smooth ${
                  selected?.slug === d.slug
                    ? "bg-secondary text-secondary-foreground shadow-gold"
                    : "bg-background/80 text-foreground hover:bg-background"
                }`}
              >
                {d.name}
              </button>
            ))}
          </div>
        </div>

        <aside className="lg:col-span-2 space-y-4">
          <div className="rounded-3xl bg-card border border-border p-5 shadow-soft">
            <h2 className="font-display text-2xl text-primary">
              {selected ? selected.name : "All packages"}
            </h2>
            <p className="text-sm text-muted-foreground mt-1">
              {selected ? selected.blurb : "Pick a destination on the globe to filter."}
            </p>
          </div>

          <div className="space-y-4 max-h-[640px] overflow-y-auto pr-1">
            {visiblePackages.map(p => (
              <article key={p.id} className="group flex gap-4 rounded-3xl bg-card border border-border p-3 shadow-soft transition-smooth hover:shadow-elevated">
                <img src={p.image} alt={p.name} loading="lazy" className="h-28 w-28 rounded-2xl object-cover flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <h3 className="font-display text-lg text-primary leading-snug">{p.name}</h3>
                    <span className="text-xs font-semibold rounded-full bg-secondary/20 text-primary px-2 py-0.5 whitespace-nowrap">{p.durationDays} {t("packages.days")}</span>
                  </div>
                  <p className="text-sm text-muted-foreground line-clamp-2 mt-1">{p.description}</p>
                  <div className="flex items-center justify-between mt-2">
                    <span className="text-sm"><span className="text-muted-foreground">{t("packages.from")}</span> <strong className="text-primary">${p.priceUSD}</strong></span>
                    <button className="inline-flex items-center gap-1 text-sm font-semibold text-secondary group-hover:gap-2 transition-all">
                      {t("packages.bookNow")} <ArrowRight className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </aside>
      </section>
    </>
  );
};

export default Explore;
