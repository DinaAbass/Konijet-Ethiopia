"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTranslation } from "react-i18next";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { LanguageSwitcher } from "./LanguageSwitcher";

export const Navbar = ({ slug }: { slug?: string }) => {
  const { t } = useTranslation();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const items = [
    { href: "/", label: t("nav.home", "Home") },
    { href: "/destinations", label: t("nav.destinations") },
    { href: "/tours", label: t("nav.tours") },
    { href: "/culture", label: t("nav.culture") },
    { href: "/experience", label: t("nav.experience") },
    { href: "/planning", label: t("nav.planning") },
    { href: "/explore", label: t("nav.explore") },
    { href: "/blog", label: t("nav.blog") },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/80 backdrop-blur-xl">
      <div className="container-page flex h-16 items-center justify-between gap-4">
        <Link href="/" className="flex items-center gap-2">
          <img src="/img/konijet-logo.png" alt="Konijet Ethiopia" className="h-10 w-10 object-contain" />
          <span className="font-display text-xl font-semibold tracking-tight text-primary">
            Konijet <span className="text-secondary">Ethiopia</span>
          </span>
        </Link>

        <nav className="hidden lg:flex items-center gap-1">
          {items.map((i) => (
            <Link
              key={i.href}
              href={i.href}
              className={cn(
                "rounded-full px-3 py-2 text-sm font-medium transition-smooth",
                pathname === i.href || (i.href !== "/" && pathname?.startsWith(i.href))
                  ? "bg-primary text-primary-foreground"
                  : "text-foreground/70 hover:text-foreground hover:bg-muted"
              )}
            >
              {i.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <LanguageSwitcher />
          <Link
            href="/contact"
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
            {items.map((i) => (
              <Link
                key={i.href}
                href={i.href}
                onClick={() => setOpen(false)}
                className={cn(
                  "rounded-lg px-3 py-2.5 text-sm font-medium",
                  pathname === i.href || (i.href !== "/" && pathname?.startsWith(i.href))
                    ? "bg-primary text-primary-foreground"
                    : "text-foreground/80 hover:bg-muted"
                )}
              >
                {i.label}
              </Link>
            ))}
            <Link
              href="/contact"
              onClick={() => setOpen(false)}
              className="mt-2 rounded-lg bg-secondary px-3 py-2.5 text-sm font-semibold text-secondary-foreground"
            >
              {t("nav.contact")}
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
};
