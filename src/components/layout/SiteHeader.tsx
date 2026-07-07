import { Menu } from "lucide-react";
import { useState } from "react";
import { useTranslation } from "react-i18next";

import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { ThemeToggle } from "@/components/ThemeToggle";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { profile, sectionIds, type SectionId } from "@/config/profile";
import { useActiveSection } from "@/hooks/useActiveSection";
import { cn } from "@/lib/utils";

const navKeys: Record<SectionId, "home" | "work" | "about" | "contact"> = {
  home: "home",
  work: "work",
  about: "about",
  contact: "contact",
};

function NavLink({
  id,
  label,
  active,
  onNavigate,
  className,
}: {
  id: SectionId;
  label: string;
  active: boolean;
  onNavigate?: () => void;
  className?: string;
}) {
  return (
    <a
      href={`#${id}`}
      onClick={onNavigate}
      className={cn(
        "text-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
        active ? "text-accent" : "text-muted-foreground hover:text-foreground",
        className,
      )}
      aria-current={active ? "page" : undefined}
    >
      {label}
    </a>
  );
}

export function SiteHeader() {
  const { t } = useTranslation();
  const activeSection = useActiveSection();
  const [menuOpen, setMenuOpen] = useState(false);

  const closeMenu = () => setMenuOpen(false);

  return (
    <header className="sticky top-0 z-50 border-b border-border/60 bg-background/80 pt-[env(safe-area-inset-top)] backdrop-blur-md">
      <div className="mx-auto flex max-w-5xl items-center justify-between gap-3 px-4 py-3 sm:px-6 sm:py-4">
        <a
          href="#home"
          className="shrink-0 whitespace-nowrap font-mono text-sm text-accent transition-opacity hover:opacity-80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
        >
          {"<"}
          {profile.handle}
          {" />"}
        </a>

        <div className="flex shrink-0 items-center gap-1 sm:gap-2 md:gap-6">
          <nav className="hidden items-center md:flex" aria-label="Main">
            <ul className="flex items-center gap-6">
              {sectionIds.map((id) => (
                <li key={id}>
                  <NavLink
                    id={id}
                    label={t(`nav.${navKeys[id]}`)}
                    active={activeSection === id}
                  />
                </li>
              ))}
            </ul>
          </nav>

          <LanguageSwitcher variant="dropdown" className="md:hidden" />
          <ThemeToggle />
          <LanguageSwitcher variant="inline" className="hidden md:flex" />

          <Sheet open={menuOpen} onOpenChange={setMenuOpen}>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="shrink-0 md:hidden"
                aria-label={t("nav.openMenu")}
              >
                <Menu className="size-5" aria-hidden="true" />
              </Button>
            </SheetTrigger>
            <SheetContent
              side="right"
              className="w-[min(100vw-2rem,20rem)] pt-[max(1.5rem,env(safe-area-inset-top))]"
            >
              <SheetHeader className="text-left">
                <SheetTitle className="font-mono text-sm text-accent">
                  {"<"}
                  {profile.handle}
                  {" />"}
                </SheetTitle>
              </SheetHeader>

              <nav className="mt-8" aria-label="Main">
                <ul className="flex flex-col gap-1">
                  {sectionIds.map((id) => (
                    <li key={id}>
                      <NavLink
                        id={id}
                        label={t(`nav.${navKeys[id]}`)}
                        active={activeSection === id}
                        onNavigate={closeMenu}
                        className="block rounded-md px-3 py-3 text-base font-medium"
                      />
                    </li>
                  ))}
                </ul>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
