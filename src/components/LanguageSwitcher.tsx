"use client";

import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { usePathname, useRouter } from "next/navigation";
import { SUPPORTED_LANGS } from "@/lib/i18n";
import { Globe } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

// Blog slug mapping: slug -> { [lang]: translatedSlug }
const BLOG_SLUGS: Record<string, Record<string, string>> = {
  "13-months-of-sunshine": {
    en: "13-months-of-sunshine",
    ar: "13-months-of-sunshine-ar",
    fr: "13-months-of-sunshine-fr",
    es: "13-months-of-sunshine-es",
    pt: "13-months-of-sunshine-pt",
    it: "13-months-of-sunshine-it",
    ru: "13-months-of-sunshine-ru",
    tr: "13-months-of-sunshine-tr",
    nl: "13-months-of-sunshine-nl",
    zh: "13-months-of-sunshine-zh",
    pl: "13-months-of-sunshine-pl",
    am: "13-months-of-sunshine-am",
  },
  "coffee-origin-story": {
    en: "coffee-origin-story",
    ar: "coffee-origin-story-ar",
    fr: "coffee-origin-story-fr",
    es: "coffee-origin-story-es",
    pt: "coffee-origin-story-pt",
    it: "coffee-origin-story-it",
    ru: "coffee-origin-story-ru",
    tr: "coffee-origin-story-tr",
    nl: "coffee-origin-story-nl",
    zh: "coffee-origin-story-zh",
    pl: "coffee-origin-story-pl",
    am: "coffee-origin-story-am",
  },
  "lalibela-pilgrim-guide": {
    en: "lalibela-pilgrim-guide",
    ar: "lalibela-pilgrim-guide-ar",
    fr: "lalibela-pilgrim-guide-fr",
    es: "lalibela-pilgrim-guide-es",
    pt: "lalibela-pilgrim-guide-pt",
    it: "lalibela-pilgrim-guide-it",
    ru: "lalibela-pilgrim-guide-ru",
    tr: "lalibela-pilgrim-guide-tr",
    nl: "lalibela-pilgrim-guide-nl",
    zh: "lalibela-pilgrim-guide-zh",
    pl: "lalibela-pilgrim-guide-pl",
    am: "lalibela-pilgrim-guide-am",
  },
};

function getCurrentBlogSlugFromPath(path: string): string | null {
  if (!path.startsWith("/blog/")) return null;
  const parts = path.split("/");
  if (parts.length < 3) return null;
  return parts[2];
}

function findTranslatedSlug(currentSlug: string, targetLang: string): string | null {
  for (const [baseSlug, translations] of Object.entries(BLOG_SLUGS)) {
    if (currentSlug === baseSlug || Object.values(translations).includes(currentSlug)) {
      return translations[targetLang] ?? translations["en"] ?? baseSlug;
    }
  }
  return null;
}

export const LanguageSwitcher = () => {
  const { i18n } = useTranslation();
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    setMounted(true);
  }, []);

  // During SSR / before mount: render a static placeholder to avoid hydration mismatch
  if (!mounted) {
    return (
      <button
        type="button"
        className="inline-flex items-center gap-2 rounded-full border border-border/60 bg-background/80 px-3 py-1.5 text-sm font-medium text-foreground/80 backdrop-blur"
        aria-label="Language selector"
        suppressHydrationWarning
      >
        <Globe className="h-4 w-4" />
        <span>EN</span>
      </button>
    );
  }

  const current = SUPPORTED_LANGS.find(l => l.code === i18n.language) ?? SUPPORTED_LANGS[0];

  const handleLanguageChange = (langCode: string) => {
    const blogSlug = pathname ? getCurrentBlogSlugFromPath(pathname) : null;
    if (blogSlug) {
      const translatedSlug = findTranslatedSlug(blogSlug, langCode);
      if (translatedSlug) {
        const newPath = `/blog/${translatedSlug}`;
        i18n.changeLanguage(langCode);
        router.push(newPath);
        return;
      }
    }
    i18n.changeLanguage(langCode);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        className="inline-flex items-center gap-2 rounded-full border border-border/60 bg-background/80 px-3 py-1.5 text-sm font-medium text-foreground/80 backdrop-blur transition-smooth hover:bg-background"
        suppressHydrationWarning
      >
        <Globe className="h-4 w-4" />
        <span>{current.label}</span>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {SUPPORTED_LANGS.map(l => (
          <DropdownMenuItem key={l.code} onClick={() => handleLanguageChange(l.code)}>
            {l.label}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
