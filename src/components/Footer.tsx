import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useState } from "react";
import logo from "@/assets/konijet-logo.png";
import { Instagram, Facebook, Mail, MessageCircle, MapPinned } from "lucide-react";

const PHONE = (import.meta.env.VITE_WHATSAPP_NUMBER || "+251911000000").replace(/[^\d]/g, "");
const NEWSLETTER_URL = import.meta.env.VITE_N8N_NEWSLETTER_WEBHOOK_URL as string | undefined;

export const Footer = () => {
  const { t } = useTranslation();
  return (
    <footer className="mt-24 bg-primary text-primary-foreground">
      <div className="container-page py-16 grid gap-12 md:grid-cols-4">
        <div className="md:col-span-2">
          <div className="flex items-center gap-3">
            <img src={logo} alt="Konijet" className="h-12 w-12" />
            <div>
              <div className="font-display text-2xl font-semibold">Konijet Ethiopia</div>
              <div className="text-primary-foreground/70 text-sm">{t("footer.tagline")}</div>
            </div>
          </div>
          <p className="mt-6 max-w-md text-primary-foreground/75 leading-relaxed">
            Crafted itineraries through the cradle of humanity. From the highlands of Lalibela to the salt flats of Danakil — we host every step of the way.
          </p>
          <div className="mt-6 flex gap-3">
            {[
              { Icon: Instagram, href: "https://instagram.com", label: "Instagram" },
              { Icon: Facebook, href: "https://facebook.com", label: "Facebook" },
              { Icon: MessageCircle, href: `https://wa.me/${PHONE}`, label: "WhatsApp" },
              { Icon: MapPinned, href: "https://www.tripadvisor.com", label: "TripAdvisor" },
              { Icon: Mail, href: "mailto:" + (import.meta.env.VITE_COMPANY_EMAIL || "info@konjetethiopia.com"), label: "Email" },
            ].map(({ Icon, href, label }) => (
              <a key={label} href={href} target="_blank" rel="noopener noreferrer" aria-label={label} className="rounded-full border border-primary-foreground/20 p-2.5 transition-smooth hover:bg-secondary hover:text-secondary-foreground hover:border-secondary">
                <Icon className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>
        <div>
          <h4 className="font-display text-lg mb-4">Explore</h4>
          <ul className="space-y-2 text-primary-foreground/75">
            <li><Link to="/destinations" className="hover:text-secondary">{t("nav.destinations")}</Link></li>
            <li><Link to="/tours" className="hover:text-secondary">{t("nav.tours")}</Link></li>
            <li><Link to="/culture" className="hover:text-secondary">{t("nav.culture")}</Link></li>
            <li><Link to="/explore" className="hover:text-secondary">{t("nav.explore")}</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="font-display text-lg mb-4">Company</h4>
          <ul className="space-y-2 text-primary-foreground/75">
            <li><Link to="/about" className="hover:text-secondary">About</Link></li>
            <li><Link to="/contact" className="hover:text-secondary">Contact</Link></li>
            <li><Link to="/privacy" className="hover:text-secondary">Privacy</Link></li>
            <li><Link to="/terms" className="hover:text-secondary">Terms</Link></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-primary-foreground/15">
        <div className="container-page py-5 text-sm text-primary-foreground/60 flex flex-col sm:flex-row justify-between gap-2">
          <span>© {new Date().getFullYear()} Konijet Ethiopia. {t("footer.rights")}</span>
          <span>Addis Ababa · Ethiopia</span>
        </div>
      </div>
    </footer>
  );
};
