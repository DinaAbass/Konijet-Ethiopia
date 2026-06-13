"use client";

import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Cookie, ChevronDown, ChevronUp, X, Check } from "lucide-react";

// ── Cookie helpers ─────────────────────────────────────────────────────────────
const CONSENT_KEY = "konjit_cookie_consent";
const CONSENT_VERSION = "1";

export type ConsentPreferences = {
  version: string;
  necessary: true; // always true — cannot be toggled
  analytics: boolean;
  marketing: boolean;
  functional: boolean;
  timestamp: string;
};

function readConsent(): ConsentPreferences | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(CONSENT_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as ConsentPreferences;
    if (parsed.version !== CONSENT_VERSION) return null;
    return parsed;
  } catch {
    return null;
  }
}

function writeConsent(prefs: Omit<ConsentPreferences, "version" | "timestamp">) {
  const full: ConsentPreferences = {
    ...prefs,
    version: CONSENT_VERSION,
    timestamp: new Date().toISOString(),
  };
  localStorage.setItem(CONSENT_KEY, JSON.stringify(full));
  // Emit custom event so AdSense / GTM can react
  window.dispatchEvent(new CustomEvent("konjit:consentUpdate", { detail: full }));
  return full;
}

// Public helper so other modules can read consent without importing the component
export function getCookieConsent(): ConsentPreferences | null {
  return readConsent();
}

// ── Component ──────────────────────────────────────────────────────────────────
export function CookieConsent() {
  const { t } = useTranslation();
  const [visible, setVisible] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [analytics, setAnalytics] = useState(false);
  const [marketing, setMarketing] = useState(false);
  const [functional, setFunctional] = useState(true);

  useEffect(() => {
    const existing = readConsent();
    if (!existing) {
      // Small delay so the page renders first
      const timer = setTimeout(() => setVisible(true), 900);
      return () => clearTimeout(timer);
    }
  }, []);

  if (!visible) return null;

  const handleAcceptAll = () => {
    writeConsent({ necessary: true, analytics: true, marketing: true, functional: true });
    setVisible(false);
  };

  const handleRejectAll = () => {
    writeConsent({ necessary: true, analytics: false, marketing: false, functional: false });
    setVisible(false);
  };

  const handleSaveChoices = () => {
    writeConsent({ necessary: true, analytics, marketing, functional });
    setVisible(false);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Cookie consent"
      className="fixed bottom-0 inset-x-0 z-[9999] p-4 md:p-6"
      style={{ direction: "ltr" }}
    >
      <div className="max-w-3xl mx-auto rounded-2xl border border-border bg-background/95 backdrop-blur-xl shadow-2xl overflow-hidden">
        {/* ── Header ── */}
        <div className="flex items-start justify-between gap-4 p-5 pb-0">
          <div className="flex items-center gap-2.5">
            <div className="rounded-full bg-primary/10 p-2">
              <Cookie className="h-5 w-5 text-primary" />
            </div>
            <h2 className="font-display text-lg font-semibold text-primary">
              {t("cookies.title", { defaultValue: "We value your privacy" })}
            </h2>
          </div>
          <button
            onClick={handleRejectAll}
            className="rounded-full p-1.5 hover:bg-muted transition-colors"
            aria-label="Decline all and close"
          >
            <X className="h-4 w-4 text-muted-foreground" />
          </button>
        </div>

        {/* ── Description ── */}
        <div className="px-5 pt-3 text-sm text-muted-foreground leading-relaxed">
          <p>
            {t("cookies.description", {
              defaultValue:
                "We use cookies to enhance your browsing experience, show you personalised content and ads, and analyse site traffic. By clicking 'Accept All' you consent to our use of cookies. You may also customise your preferences below.",
            })}
            {" "}
            <a href="/privacy" className="text-primary underline underline-offset-2 hover:opacity-80">
              {t("cookies.learnMore", { defaultValue: "Learn more" })}
            </a>
          </p>
        </div>

        {/* ── Expandable preferences ── */}
        {expanded && (
          <div className="mx-5 mt-4 rounded-xl border border-border divide-y divide-border">
            <CookieRow
              title={t("cookies.necessary", { defaultValue: "Strictly Necessary" })}
              description={t("cookies.necessaryDesc", {
                defaultValue:
                  "These cookies are required for the website to function and cannot be disabled.",
              })}
              checked={true}
              disabled
            />
            <CookieRow
              title={t("cookies.functional", { defaultValue: "Functional" })}
              description={t("cookies.functionalDesc", {
                defaultValue:
                  "Enable enhanced functionality such as language preference and form pre-fill.",
              })}
              checked={functional}
              onChange={setFunctional}
            />
            <CookieRow
              title={t("cookies.analytics", { defaultValue: "Analytics" })}
              description={t("cookies.analyticsDesc", {
                defaultValue:
                  "Help us understand how visitors interact with the site so we can improve it.",
              })}
              checked={analytics}
              onChange={setAnalytics}
            />
            <CookieRow
              title={t("cookies.marketing", { defaultValue: "Marketing & Advertising" })}
              description={t("cookies.marketingDesc", {
                defaultValue:
                  "Used to deliver relevant ads (including Google AdSense) and measure campaign effectiveness.",
              })}
              checked={marketing}
              onChange={setMarketing}
            />
          </div>
        )}

        {/* ── Actions ── */}
        <div className="flex flex-wrap items-center justify-between gap-3 p-5 pt-4">
          <button
            onClick={() => setExpanded((e) => !e)}
            className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-primary transition-colors"
          >
            {expanded ? (
              <>
                <ChevronUp className="h-4 w-4" />
                {t("cookies.hideOptions", { defaultValue: "Hide options" })}
              </>
            ) : (
              <>
                <ChevronDown className="h-4 w-4" />
                {t("cookies.customise", { defaultValue: "Customise" })}
              </>
            )}
          </button>

          <div className="flex flex-wrap gap-2.5 ms-auto">
            <button
              onClick={handleRejectAll}
              className="rounded-full border border-border bg-background px-4 py-2 text-sm font-medium hover:bg-muted transition-colors"
            >
              {t("cookies.rejectAll", { defaultValue: "Reject All" })}
            </button>
            {expanded && (
              <button
                onClick={handleSaveChoices}
                className="rounded-full border border-primary bg-primary/10 text-primary px-4 py-2 text-sm font-medium hover:bg-primary/20 transition-colors"
              >
                {t("cookies.saveChoices", { defaultValue: "Save My Choices" })}
              </button>
            )}
            <button
              onClick={handleAcceptAll}
              className="rounded-full bg-primary text-primary-foreground px-5 py-2 text-sm font-semibold hover:opacity-90 transition-opacity"
            >
              {t("cookies.acceptAll", { defaultValue: "Accept All" })}
            </button>
          </div>
        </div>

        {/* ── Compliance notice ── */}
        <p className="px-5 pb-4 text-[11px] text-muted-foreground/60 leading-relaxed">
          {t("cookies.compliance", {
            defaultValue:
              "In compliance with GDPR (EU) 2016/679 and the California Consumer Privacy Act (CCPA). You may withdraw consent at any time by clearing site data in your browser settings.",
          })}
        </p>
      </div>
    </div>
  );
}

// ── Toggle row ──────────────────────────────────────────────────────────────────
function CookieRow({
  title,
  description,
  checked,
  disabled,
  onChange,
}: {
  title: string;
  description: string;
  checked: boolean;
  disabled?: boolean;
  onChange?: (v: boolean) => void;
}) {
  const id = `cookie-${title.toLowerCase().replace(/\s+/g, "-")}`;
  return (
    <div className="flex items-start justify-between gap-4 px-4 py-3">
      <div className="flex-1">
        <label htmlFor={id} className="text-sm font-semibold text-foreground cursor-pointer">
          {title}
        </label>
        <p className="mt-0.5 text-xs text-muted-foreground leading-relaxed">{description}</p>
      </div>
      <div className="flex-shrink-0 pt-0.5">
        <button
          id={id}
          role="switch"
          aria-checked={checked}
          disabled={disabled}
          onClick={() => onChange?.(!checked)}
          className={[
            "relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary",
            checked ? "bg-primary" : "bg-muted",
            disabled ? "opacity-60 cursor-not-allowed" : "cursor-pointer",
          ].join(" ")}
        >
          <span
            className={[
              "inline-block h-4 w-4 rounded-full bg-white shadow-sm transition-transform",
              checked ? "translate-x-6" : "translate-x-1",
            ].join(" ")}
          >
            {checked && <Check className="h-3 w-3 text-primary m-0.5" />}
          </span>
        </button>
      </div>
    </div>
  );
}
