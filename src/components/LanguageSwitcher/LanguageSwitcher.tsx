import { Languages } from "lucide-react";
import { useTranslation } from "react-i18next";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { supportedLanguages, type SupportedLanguage } from "@/i18n";
import { cn } from "@/lib/utils";

const languageLabels: Record<SupportedLanguage, string> = {
  en: "EN",
  es: "ES",
  pt: "PT",
};

type LanguageSwitcherProps = {
  variant?: "inline" | "dropdown";
  className?: string;
};

export function LanguageSwitcher({
  variant = "inline",
  className,
}: LanguageSwitcherProps) {
  const { i18n, t } = useTranslation();
  const current = (i18n.resolvedLanguage ?? "en").slice(0, 2) as SupportedLanguage;

  if (variant === "dropdown") {
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className={cn("shrink-0 text-muted-foreground", className)}
            aria-label={t("language.label")}
          >
            <Languages className="size-5" aria-hidden="true" />
            <span className="sr-only">
              {t("language.label")}: {languageLabels[current]}
            </span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuRadioGroup
            value={current}
            onValueChange={(value) => void i18n.changeLanguage(value)}
          >
            {supportedLanguages.map((lng) => (
              <DropdownMenuRadioItem key={lng} value={lng} className="font-mono">
                {languageLabels[lng]}
              </DropdownMenuRadioItem>
            ))}
          </DropdownMenuRadioGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    );
  }

  return (
    <fieldset className={cn("m-0 flex min-w-0 items-center gap-2 border-0 p-0", className)}>
      <legend className="sr-only">{t("language.label")}</legend>
      {supportedLanguages.map((lng) => (
        <button
          key={lng}
          type="button"
          onClick={() => void i18n.changeLanguage(lng)}
          aria-pressed={current === lng}
          className={cn(
            "rounded-md px-2.5 py-1 font-mono text-xs transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
            current === lng
              ? "bg-accent text-accent-foreground"
              : "text-muted-foreground hover:text-foreground",
          )}
        >
          {languageLabels[lng]}
        </button>
      ))}
    </fieldset>
  );
}
