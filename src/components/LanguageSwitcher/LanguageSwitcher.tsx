import { useTranslation } from "react-i18next";

import { supportedLanguages, type SupportedLanguage } from "@/i18n";
import { cn } from "@/lib/utils";

const languageLabels: Record<SupportedLanguage, string> = {
  en: "EN",
  es: "ES",
  pt: "PT",
};

export function LanguageSwitcher() {
  const { i18n, t } = useTranslation();
  const current = (i18n.resolvedLanguage ?? "en").slice(0, 2) as SupportedLanguage;

  return (
    <fieldset className="m-0 flex min-w-0 items-center gap-2 border-0 p-0">
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
