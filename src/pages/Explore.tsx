"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import dynamic from "next/dynamic";
const Globe = dynamic(() => import("react-globe.gl"), { ssr: false });
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { ArrowLeft, Search, X } from "lucide-react";
import { useTranslation } from "react-i18next";
import { CATEGORIES, TOURS, toursByCategory, getCategory, type Tour } from "@/data/tours";
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
  const { t, i18n } = useTranslation();
  const searchParams = useSearchParams()!;
  const router = useRouter();
  const globeRef = useRef<any>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  // Use ref for altitude — never triggers re-renders on every frame
  const altitudeRef = useRef<number>(2.5);
  const [size, setSize] = useState({ w: 600, h: 600 });
  // Only update state on threshold crossing (not every pixel of scroll)
  const [showCities, setShowCities] = useState(false);
  const [hovered, setHovered] = useState<Tour | null>(null);

  const categorySlug = searchParams.get("category") || "";
  const initialQ = searchParams.get("q") || "";
  const [query, setQuery] = useState(initialQ);

  useEffect(() => { setQuery(searchParams.get("q") || ""); }, [searchParams]);

  const visibleTours = useMemo(() => {
    let list: Tour[] = categorySlug ? toursByCategory(categorySlug) : TOURS;
    if (query.trim()) {
      const q = query.toLowerCase();
      list = list.filter(tour =>
        tour.title.toLowerCase().includes(q) ||
        tour.region.toLowerCase().includes(q) ||
        tour.shortDescription.toLowerCase().includes(q),
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
    let active = true;
    let flyTimer1: NodeJS.Timeout;
    let flyTimer2: NodeJS.Timeout;
    let handleChange: () => void;
    let controls: any;

    const initGlobe = () => {
      if (!globeRef.current) {
        if (active) requestAnimationFrame(initGlobe);
        return;
      }
      const g = globeRef.current;
      controls = g.controls();
      if (!controls) {
        if (active) requestAnimationFrame(initGlobe);
        return;
      }

      // Setup controls (match old Vite behavior)
      controls.autoRotate = true;
      controls.autoRotateSpeed = 0.6;
      controls.enableZoom = true;
      controls.enablePan = false;
      controls.minDistance = 101;
      controls.maxDistance = 700;

      // Start at a view of Earth (lat 0, lng 0, altitude 2.5)
      g.pointOfView({ lat: 0, lng: 0, altitude: 2.5 }, 0);

      // Phase 2: Zoom/rotate to Ethiopia after 600ms
      flyTimer1 = setTimeout(() => {
        g.pointOfView(ETHIOPIA_CENTER, 2200);
      }, 600);

      // Phase 3: Stop rotation after 2800ms
      flyTimer2 = setTimeout(() => {
        controls.autoRotate = false;
      }, 2800);

      // Track altitude in ref — update showCities state only on threshold crossing
      handleChange = () => {
        const alt: number = g.pointOfView().altitude;
        altitudeRef.current = alt;
        const should = alt < 1.5;
        setShowCities(prev => (prev !== should ? should : prev));
      };

      controls.addEventListener("change", handleChange);
    };

    initGlobe();

    return () => {
      active = false;
      if (flyTimer1) clearTimeout(flyTimer1);
      if (flyTimer2) clearTimeout(flyTimer2);
      if (controls && handleChange) {
        controls.removeEventListener("change", handleChange);
      }
    };
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const next = new URLSearchParams(searchParams.toString());
    if (query.trim()) next.set("q", query.trim()); else next.delete("q");
    router.push(`/explore?${next.toString()}`);
  };

  const clearSearch = () => {
    setQuery("");
    const next = new URLSearchParams(searchParams.toString());
    next.delete("q");
    router.push(`/explore?${next.toString()}`);
  };

  const clearAll = () => router.push("/explore");

  // Combine all globe elements into a single htmlElementsData array:
  // - type "tour"    → red SVG pin (click/hover)
  // - type "city"    → small white dot + label (shown only when zoomed in)
  // - type "country" → bold yellow country name
  // Using HTML elements for ALL labels prevents WebGL canvas ??? for non-Latin scripts.
  const allHtmlElements = useMemo(() => {
    const lang = i18n.language;

    const tourElements = visibleTours.map(tour => ({
      ...tour,
      type: "tour" as const,
      _lang: lang,
    }));

    const cityElements = showCities
      ? ETHIOPIAN_CITIES.map(c => ({
          lat: c.lat,
          lng: c.lng,
          type: "city" as const,
          text: t("cities." + c.name, { defaultValue: c.name }),
          _lang: lang,
          slug: "city-" + c.name,
        }))
      : [];

    const countryElements = NEIGHBOURS.map(n => ({
      lat: n.lat,
      lng: n.lng,
      type: "country" as const,
      text: t("countries." + n.name, { defaultValue: n.name }),
      _lang: lang,
      slug: "country-" + n.name,
    }));

    return [...tourElements, ...cityElements, ...countryElements];
  }, [visibleTours, showCities, i18n.language, t]);

  const handleHtmlElement = (d: any) => {
    if (d.type === "tour") {
      const el = document.createElement("div");
      el.className = "notranslate";
      el.setAttribute("translate", "no");
      el.style.cssText = `cursor:pointer;`;
      el.innerHTML = `
<div style="position:relative; transform:translateY(-50%);">
<svg width="28" height="36" viewBox="0 0 24 32" xmlns="http://www.w3.org/2000/svg" style="filter: drop-shadow(0 4px 6px rgba(0,0,0,0.5));">
<path d="M12 0C5.4 0 0 5.4 0 12c0 9 12 20 12 20s12-11 12-20C24 5.4 18.6 0 12 0z" fill="#dc2626"/>
<circle cx="12" cy="12" r="5" fill="white"/>
</svg>
</div>`;
      el.addEventListener("mouseenter", () => setHovered(d));
      el.addEventListener("mouseleave", () => setHovered(h => h?.slug === d.slug ? null : h));
      el.addEventListener("click", () => router.push(`/tours/${d.slug}`));
      return el;
    }

    if (d.type === "city") {
      const isRtl = i18n.language === "ar";
      const el = document.createElement("div");
      el.className = "notranslate";
      el.setAttribute("translate", "no");
      el.dir = "ltr";
      // Fixed-size wrapper so the label does not pull the dot off-center
      const wrapperSize = 40;
      el.style.cssText = [
        "display:flex",
        "align-items:center",
        "justify-content:center",
        "width:" + wrapperSize + "px",
        "height:" + wrapperSize + "px",
        "pointer-events:none",
        "user-select:none",
      ].join(";");
      // Dot – always at the exact centre of the wrapper
      const dot = document.createElement("span");
      dot.style.cssText = [
        "position:absolute",
        "left:50%",
        "top:50%",
        "transform:translate(-50%,-50%)",
        "display:inline-block",
        "width:6px",
        "height:6px",
        "border-radius:50%",
        "background:rgba(255,255,255,0.95)",
        "box-shadow:0 0 4px rgba(0,0,0,0.8)",
        "z-index:1",
      ].join(";");
      // Label – offset left or right from the centre according to direction
      const label = document.createElement("span");
      label.textContent = d.text;
      if (isRtl) {
        label.dir = "rtl";
      }
      label.style.cssText = [
        "position:absolute",
        isRtl ? "right:" + (wrapperSize/2 + 6) + "px" : "left:" + (wrapperSize/2 + 6) + "px",
        "top:50%",
        "transform:translateY(-50%)",
        "font-size:11px",
        "font-weight:600",
        "color:rgba(255,255,255,0.95)",
        "text-shadow:0 1px 3px rgba(0,0,0,0.9),0 0 8px rgba(0,0,0,0.7)",
        "white-space:nowrap",
        "font-family:system-ui,sans-serif",
        "z-index:2",
      ].join(";");
      el.appendChild(dot);
      el.appendChild(label);
      return el;
    }

    if (d.type === "country") {
      const isRtl = i18n.language === "ar";
      const el = document.createElement("div");
      el.className = "notranslate";
      el.setAttribute("translate", "no");
      el.dir = "ltr";
      // Fixed-size wrapper keeps the text centred over the coordinate
      const wrapperSize = 80;
      el.style.cssText = [
        "display:flex",
        "align-items:center",
        "justify-content:center",
        "width:" + wrapperSize + "px",
        "height:20px",
        "pointer-events:none",
        "user-select:none",
      ].join(";");
      const text = document.createElement("span");
      text.textContent = d.text.toUpperCase();
      if (isRtl) {
        text.dir = "rtl";
      }
      text.style.cssText = [
        "position:absolute",
        "left:50%",
        "top:50%",
        "transform:translate(-50%,-50%)",
        "font-size:12px",
        "font-weight:700",
        "color:rgba(255,209,102,0.9)",
        "text-shadow:0 1px 4px rgba(0,0,0,0.95),0 0 10px rgba(0,0,0,0.8)",
        "white-space:nowrap",
        "font-family:system-ui,sans-serif",
        "letter-spacing:0.05em",
      ].join(";");
      el.appendChild(text);
      return el;
    }

    return document.createElement("div");
  };

  return (
    <>
      <section className="container-page pt-8 pb-2">
        <div className="flex items-center gap-3 flex-wrap">
          <button onClick={() => router.back()} className="inline-flex items-center gap-1 rounded-full border border-border bg-card px-3 py-1.5 text-sm font-medium hover:bg-muted transition-smooth">
            <ArrowLeft className="h-4 w-4" /> {t("explore.back")}
          </button>
          {(categorySlug || query) && (
            <button onClick={clearAll} className="inline-flex items-center gap-1 rounded-full bg-secondary/20 text-primary px-3 py-1.5 text-sm font-semibold hover:bg-secondary/30 transition-smooth">
              <X className="h-4 w-4" /> {t("explore.clearFilters")}
            </button>
          )}
          {category && (
            <span className="rounded-full bg-primary text-primary-foreground px-3 py-1.5 text-xs font-bold uppercase tracking-wider">
              {t("categories." + category.slug + ".name", { defaultValue: category.name })}
            </span>
          )}
        </div>
        <div className="mt-4 flex items-end justify-between gap-4 flex-wrap">
          <div>
            <h1 className="font-display text-4xl md:text-5xl text-primary mt-2">
              {category ? t("categories." + category.slug + ".name", { defaultValue: category.name }) : t("explore.title")}
            </h1>
            <p className="text-muted-foreground mt-2 max-w-xl">
              {category ? t("categories." + category.slug + ".blurb", { defaultValue: category.blurb }) : t("explore.blurb")}
            </p>
          </div>

          <form onSubmit={handleSearch} className="flex items-center gap-2 rounded-full border border-border bg-card px-3 py-2 shadow-soft min-w-[260px]">
            <Search className="h-4 w-4 text-muted-foreground" />
            <input
              value={query}
              onChange={e => setQuery(e.target.value)}
              placeholder={t("explore.searchPlaceholder")}
              className="flex-1 bg-transparent outline-none text-sm"
            />
            {query && (
              <button type="button" onClick={clearSearch} className="rounded-full p-1 hover:bg-muted" aria-label="Clear search">
                <X className="h-3.5 w-3.5" />
              </button>
            )}
            <button type="submit" className="rounded-full bg-primary text-primary-foreground px-3 py-1 text-xs font-semibold">{t("explore.search")}</button>
          </form>
        </div>
      </section>

      <section className="container-page pb-12 grid lg:grid-cols-5 gap-6">
        <div ref={containerRef} dir="ltr" className="lg:col-span-3 relative rounded-[2rem] overflow-hidden bg-gradient-deep shadow-elevated min-h-[560px]">
          <Globe
            key={i18n.language}
            ref={globeRef}
            width={size.w}
            height={size.h}
            backgroundColor="rgba(0,0,0,0)"
            globeImageUrl="//unpkg.com/three-globe/example/img/earth-night.jpg"
            bumpImageUrl="//unpkg.com/three-globe/example/img/earth-topology.png"
            atmosphereColor="hsl(195, 70%, 60%)"
            atmosphereAltitude={0.22}
            htmlElementsData={allHtmlElements}
            htmlLat={(d: any) => d.lat}
            htmlLng={(d: any) => d.lng}
            htmlElement={handleHtmlElement}
          />
          {hovered && (
            <div className="absolute top-3 right-3 max-w-[260px] rounded-2xl bg-background/95 backdrop-blur shadow-elevated p-3 pointer-events-none">
              <img src={hovered.image} alt={t("tours." + hovered.slug + ".title", { defaultValue: hovered.title })} className="rounded-lg w-full h-24 object-cover mb-2" />
              <h4 className="font-display text-sm text-primary line-clamp-2">{t("tours." + hovered.slug + ".title", { defaultValue: hovered.title })}</h4>
              <div className="text-xs text-muted-foreground mt-1">{t("tours." + hovered.slug + ".durationLabel", { defaultValue: hovered.durationLabel })} · ${hovered.priceUSD}</div>
            </div>
          )}
        </div>

        <aside className="lg:col-span-2 space-y-4">
          <div className="rounded-3xl bg-card border border-border p-5 shadow-soft">
            <h2 className="font-display text-2xl text-primary">{t("explore.toursCount", { count: visibleTours.length })}</h2>
            <p className="text-sm text-muted-foreground mt-1">
              {category
                ? t("explore.inCategory", { category: t("categories." + category.slug + ".name", { defaultValue: category.name }) })
                : t("explore.acrossAll")}
              {query ? ` ${t("explore.matching", { query })}` : ""}.
            </p>
            {!categorySlug && (
              <div className="mt-3 flex flex-wrap gap-1.5">
                {CATEGORIES.map(c => (
                  <Link key={c.slug} href={`/explore?category=${c.slug}`} className="text-xs rounded-full bg-muted px-2.5 py-1 hover:bg-secondary/30 transition-smooth">
                    {t("categories." + c.slug + ".name", { defaultValue: c.name }).replace(" Tours", "").replace(" tours", "")}
                  </Link>
                ))}
              </div>
            )}
          </div>

          <div className="grid grid-cols-1 gap-4 max-h-[640px] overflow-y-auto pr-1">
            {visibleTours.length === 0 && (
              <div className="rounded-2xl border border-dashed border-border p-6 text-center text-sm text-muted-foreground">
                {t("explore.noTours")} <button onClick={clearAll} className="text-secondary font-semibold underline">{t("explore.clearAll")}</button>
              </div>
            )}
            {visibleTours.map(tour => <TourCard key={tour.slug} tour={tour} />)}
          </div>
        </aside>
      </section>

      <WeatherWidget />
    </>
  );
};

export default Explore;
