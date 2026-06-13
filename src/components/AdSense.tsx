"use client";

import Script from "next/script";

/**
 * GoogleAdSense
 * Injects the AdSense async bootstrap script once per page.
 * Set NEXT_PUBLIC_GOOGLE_ADSENSE_ID in your .env to activate.
 * When the env var is absent (local dev / CI) the script is not loaded.
 */
export function GoogleAdSense() {
  const id = process.env.NEXT_PUBLIC_GOOGLE_ADSENSE_ID;
  if (!id || id === "your_google_adsense_id_here") return null;

  return (
    <Script
      id="google-adsense"
      async
      src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${id}`}
      crossOrigin="anonymous"
      strategy="afterInteractive"
    />
  );
}

interface AdBannerProps {
  /** AdSense ad slot ID (from your AdSense dashboard) */
  slot: string;
  /** Responsive (default) or fixed layout */
  layout?: "responsive" | "fixed";
  className?: string;
}

/**
 * AdBanner
 * Drop this wherever you want an ad unit.
 * Renders nothing in local dev (no AdSense ID set).
 *
 * Usage:
 *   <AdBanner slot="1234567890" />
 */
export function AdBanner({ slot, layout = "responsive", className = "" }: AdBannerProps) {
  const id = process.env.NEXT_PUBLIC_GOOGLE_ADSENSE_ID;
  if (!id || id === "your_google_adsense_id_here") return null;

  return (
    <div className={`adsense-wrapper ${className}`}>
      <ins
        className="adsbygoogle"
        style={{ display: "block" }}
        data-ad-client={id}
        data-ad-slot={slot}
        data-ad-format={layout === "responsive" ? "auto" : undefined}
        data-full-width-responsive={layout === "responsive" ? "true" : undefined}
      />
      <script
        dangerouslySetInnerHTML={{
          __html: "(adsbygoogle = window.adsbygoogle || []).push({});",
        }}
      />
    </div>
  );
}
