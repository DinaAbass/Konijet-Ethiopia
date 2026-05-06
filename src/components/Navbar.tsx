import { Link, NavLink } from "react-router-dom";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Menu, X } from "lucide-react";
import logo from "@/assets/konijet-logo.png";
import { LanguageSwitcher } from "./LanguageSwitcher";

export const Navbar = () => {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);

  const items = [
    { to: "/", label: "Home", end: true },
    { to: "/destinations", label: t("nav.destinations") },
    { to: "/tours", label: t("nav.tours") },
    { to: "/culture", label: t("nav.culture") },
    { to: "/experience", label: t("nav.experience") },
    { to: "/planning", label: t("nav.planning") },
    { to: "/explore", label: t("nav.explore") },
    { to: "/blog", label: t("nav.blog") },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/80 backdrop-blur-xl">
      <div className="container-page flex h-16 items-center justify-between gap-4">
        <Link to="/" className="flex items-center gap-2">
          <img src={logo} alt="Konijet Ethiopia" className="h-10 w-10 object-contain" />
          <span className="font-display text-xl font-semibold tracking-tight text-primary">
            Konijet <span className="text-secondary">Ethiopia</span>
          </span>
        </Link>

        <nav className="hidden lg:flex items-center gap-1">
          {items.map(i => (
            <NavLink
              key={i.to}
              to={i.to}
              end={i.end}
              className={({ isActive }) =>
                `rounded-full px-3 py-2 text-sm font-medium transition-smooth ${
                  isActive ? "bg-primary text-primary-foreground" : "text-foreground/70 hover:text-foreground hover:bg-muted"
                }`
              }
            >
              {i.label}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <LanguageSwitcher />
          <Link
            to="/contact"
            className="hidden md:inline-flex rounded-full bg-secondary px-4 py-2 text-sm font-semibold text-secondary-foreground shadow-soft transition-smooth hover:shadow-gold"
          >
            {t("nav.contact")}
          </Link>
          <button
            className="lg:hidden rounded-full border border-border p-2"
            onClick={() => setOpen(!open)}
            aria-label="Toggle menu"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {open && (
        <div className="lg:hidden border-t border-border/40 bg-background">
          <nav className="container-page flex flex-col py-3">
            {items.map(i => (
              <NavLink
                key={i.to}
                to={i.to}
                onClick={() => setOpen(false)}
                className={({ isActive }) =>
                  `rounded-lg px-3 py-2.5 text-sm font-medium ${
                    isActive ? "bg-primary text-primary-foreground" : "text-foreground/80 hover:bg-muted"
                  }`
                }
              >
                {i.label}
              </NavLink>
            ))}
            <NavLink to="/contact" onClick={() => setOpen(false)} className="mt-2 rounded-lg bg-secondary px-3 py-2.5 text-sm font-semibold text-secondary-foreground">
              {t("nav.contact")}
            </NavLink>
          </nav>
        </div>
      )}
    </header>
  );
};
