"use client";

import Link from "next/link";
import { useTranslation } from "react-i18next";
import { Instagram, Facebook, Mail, MessageCircle, MapPinned } from "lucide-react";

const PHONE = (process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "+251911000000").replace(/[^\d]/g, "");

export const Footer = () => {
  const { t } = useTranslation();
  return (
    <footer className="mt-24 bg-primary text-primary-foreground">
      <div className="container-page py-16 grid gap-12 md:grid-cols-4">
        <div className="md:col-span-2">
          <div className="flex items-center gap-3">
            <img src="/img/konijet-logo.png" alt="Konijet" className="h-12 w-12" />
            <div>
              <div className="font-display text-2xl font-semibold">Konijet Ethiopia</div>
              <div className="text-primary-foreground/70 text-sm">{t("footer.tagline")}</div>
            </div>
          </div>
          <p className="mt-6 max-w-md text-primary-foreground/75 leading-relaxed">
            {t("footer.description", "Crafted itineraries through the cradle of humanity. From the highlands of Lalibela to the salt flats of Danakil — we host every step of the way.")}
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            {[
              { Icon: Instagram, href: "https://www.instagram.com/konijetethiopia/", label: "Instagram" },
              { Icon: Facebook, href: "https://facebook.com/Konijetethiopia#", label: "Facebook" },
              { Icon: MessageCircle, href: `https://wa.me/${PHONE}`, label: "WhatsApp" },
              {
                Icon: () => (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V9.01a8.16 8.16 0 0 0 4.77 1.52V7.08a4.85 4.85 0 0 1-1-.39z" />
                  </svg>
                ),
                href: "https://www.tiktok.com/@konijetethiopia?_r=1&_t=ZS-95JwsBm4ogJ",
                label: "TikTok"
              },
              {
                Icon: ({ className }: { className?: string }) => (
                  <img src="/tripadvisor.svg" className={`${className} brightness-0 invert`} alt="TripAdvisor" />
                ),
                href: "https://www.tripadvisor.com",
                label: "TripAdvisor"
              },
              { Icon: Mail, href: "mailto:" + (process.env.NEXT_PUBLIC_COMPANY_EMAIL || "info@konijetethiopia.qzz.io"), label: "Email" },
            ].map(({ Icon, href, label }) => (
              <a key={label} href={href} target="_blank" rel="noopener noreferrer" aria-label={label}
                className="rounded-full border border-primary-foreground/20 p-2.5 transition-smooth hover:bg-secondary hover:text-secondary-foreground hover:border-secondary">
                <Icon className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>
        <div>
          <h4 className="font-display text-lg mb-4">{t("footer.explore", "Explore")}</h4>
          <ul className="space-y-2 text-primary-foreground/75">
            <li><Link href="/destinations" className="hover:text-secondary">{t("nav.destinations")}</Link></li>
            <li><Link href="/tours" className="hover:text-secondary">{t("nav.tours")}</Link></li>
            <li><Link href="/culture" className="hover:text-secondary">{t("nav.culture")}</Link></li>
            <li><Link href="/experience" className="hover:text-secondary">{t("nav.experience")}</Link></li>
            <li><Link href="/explore" className="hover:text-secondary">{t("nav.explore")}</Link></li>
            <li><Link href="/blog" className="hover:text-secondary">{t("nav.blog")}</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="font-display text-lg mb-4">{t("footer.company", "Company")}</h4>
          <ul className="space-y-2 text-primary-foreground/75">
            <li><Link href="/about" className="hover:text-secondary">{t("footer.about", "About")}</Link></li>
            <li><Link href="/contact" className="hover:text-secondary">{t("nav.contact", "Contact")}</Link></li>
            <li><Link href="/privacy" className="hover:text-secondary">{t("footer.privacy", "Privacy")}</Link></li>
            <li><Link href="/terms" className="hover:text-secondary">{t("footer.terms", "Terms")}</Link></li>
          </ul>
          <div className="mt-8 rounded-xl border border-primary-foreground/20 bg-primary-foreground/10 p-4">
            <p className="text-xs text-primary-foreground/60 uppercase tracking-widest font-semibold mb-1">
              {t("footer.needHelp", "Need help?")}
            </p>
            <a
              href="tel:+251911595533"
              className="flex items-center gap-2 text-secondary font-bold text-lg hover:underline"
              aria-label="Call Konijet Ethiopia"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 shrink-0" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 13.5a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.61 3h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 10.6a16 16 0 0 0 6 6l.96-.96a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 17.92z" />
              </svg>
              +251 911 595 533
            </a>
            <p className="text-xs text-primary-foreground/50 mt-1">
              {t("footer.callHours", "7 days · 8 AM – 8 PM EAT")}
            </p>
          </div>
        </div>
      </div>
      <div className="border-t border-primary-foreground/15">
        <div className="container-page py-5 text-sm text-primary-foreground/60 flex flex-col sm:flex-row justify-between gap-2">
          <span>© {new Date().getFullYear()} Konijet Ethiopia. {t("footer.rights")}</span>
          <span>{t("footer.location", "Addis Ababa · Ethiopia")}</span>
        </div>
      </div>
    </footer>
  );
};
