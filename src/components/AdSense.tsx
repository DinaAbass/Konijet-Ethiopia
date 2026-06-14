"use client";

import { useEffect, useState } from "react";

// ── Consent helper ──────────────────────────────────────────────────────────
const CONSENT_KEY = "konjit_cookie_consent";
const CONSENT_VERSION = "1";

type ConsentPreferences = {
  version: string;
  marketing: boolean;
  analytics: boolean;
};

function readMarketing(): boolean {
  if (typeof window === "undefined") return false;
  try {
    const raw = localStorage.getItem(CONSENT_KEY);
    if (!raw) return false;
    const parsed = JSON.parse(raw) as ConsentPreferences;
    if (parsed.version !== CONSENT_VERSION) return false;
    return parsed.marketing === true;
  } catch {
    return false;
  }
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
 * Renders nothing if marketing cookies have not been accepted.
 *
 * Usage:
 *   <AdBanner slot="1234567890" />
 */
export function AdBanner({ slot, layout = "responsive", className = "" }: AdBannerProps) {
  const id = process.env.NEXT_PUBLIC_GOOGLE_ADSENSE_ID;
  const [allowed, setAllowed] = useState(false);

  useEffect(() => {
    setAllowed(readMarketing());

    const handler = (e: Event) => {
      const detail = (e as CustomEvent<ConsentPreferences>).detail;
      setAllowed(detail.marketing === true);
    };
    window.addEventListener("konjit:consentUpdate", handler);
    return () => window.removeEventListener("konjit:consentUpdate", handler);
  }, []);

  if (!id || !allowed) return null;

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
