import { useTranslation } from "react-i18next";
import { SUPPORTED_LANGS } from "@/lib/i18n";
import { Globe } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export const LanguageSwitcher = () => {
  const { i18n } = useTranslation();
  const current = SUPPORTED_LANGS.find(l => l.code === i18n.language) ?? SUPPORTED_LANGS[0];
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="inline-flex items-center gap-2 rounded-full border border-border/60 bg-background/80 px-3 py-1.5 text-sm font-medium text-foreground/80 backdrop-blur transition-smooth hover:bg-background">
        <Globe className="h-4 w-4" />
        <span>{current.label}</span>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {SUPPORTED_LANGS.map(l => (
          <DropdownMenuItem key={l.code} onClick={() => i18n.changeLanguage(l.code)}>
            {l.label}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
