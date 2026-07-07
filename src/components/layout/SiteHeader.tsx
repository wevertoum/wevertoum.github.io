import { profile, sectionIds, type SectionId } from "@/config/profile";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { useActiveSection } from "@/hooks/useActiveSection";
import { cn } from "@/lib/utils";
import { useTranslation } from "react-i18next";

const navKeys: Record<SectionId, "home" | "work" | "about" | "contact"> = {
  home: "home",
  work: "work",
  about: "about",
  contact: "contact",
};

export function SiteHeader() {
  const { t } = useTranslation();
  const activeSection = useActiveSection();

  return (
    <header className="sticky top-0 z-50 border-b border-border/60 bg-background/80 pt-[env(safe-area-inset-top)] backdrop-blur-md">
      <div className="mx-auto flex max-w-5xl items-center justify-between gap-4 px-4 py-4 sm:px-6">
        <a
          href="#home"
          className="font-mono text-sm text-accent transition-opacity hover:opacity-80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
        >
          {"<"}
          {profile.handle}
          {" />"}
        </a>

        <div className="flex items-center gap-3 sm:gap-6">
          <nav aria-label="Main">
            <ul className="flex flex-wrap items-center justify-end gap-3 sm:gap-6">
              {sectionIds.map((id) => (
                <li key={id}>
                  <a
                    href={`#${id}`}
                    className={cn(
                      "text-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
                      activeSection === id
                        ? "text-accent"
                        : "text-muted-foreground hover:text-foreground",
                    )}
                    aria-current={activeSection === id ? "page" : undefined}
                  >
                    {t(`nav.${navKeys[id]}`)}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
          <LanguageSwitcher />
        </div>
      </div>
    </header>
  );
}
