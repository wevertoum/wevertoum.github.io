import { ArrowRight } from "lucide-react";
import { useTranslation } from "react-i18next";

import { profile } from "@/config/profile";
import { Section } from "@/components/layout/Section";
import { SectionDivider } from "@/components/layout/SectionDivider";
import { TerminalLabel } from "@/components/TerminalLabel";
import { TypingText } from "@/components/TypingText";
import { Button } from "@/components/ui/button";

export function HomeSection() {
  const { t } = useTranslation();
  const greeting = t("home.greeting", { name: profile.name });
  const tagline = t("home.tagline");

  return (
    <Section id="home" className="min-h-[calc(100dvh-4rem)]">
      <div className="flex min-h-[calc(100dvh-12rem)] flex-col justify-center">
        <TerminalLabel variant="comment" className="mb-6 block">
          {t("home.eyebrow")}
        </TerminalLabel>

        <h1
          className="max-w-5xl"
          aria-label={`${greeting} ${tagline}`}
        >
          <span className="block text-5xl font-bold leading-[1.08] tracking-tight text-foreground sm:text-6xl lg:text-7xl">
            {greeting}
          </span>
          <span className="mt-1 block text-5xl font-bold leading-[1.08] tracking-tight text-muted-foreground sm:text-6xl lg:text-7xl">
            <TypingText text={tagline} />
          </span>
        </h1>

        <p className="mt-8 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
          {t("home.description")}
        </p>

        <p className="mt-6 max-w-2xl border-l-2 border-accent/60 pl-4 text-base leading-relaxed text-foreground/85 sm:text-lg">
          {t("home.impact")}
        </p>

        <div className="mt-10">
          <Button asChild size="lg" className="font-medium">
            <a href="#work">
              {t("home.cta")}
              <ArrowRight className="size-4" aria-hidden="true" />
            </a>
          </Button>
        </div>

        <SectionDivider className="mt-20">{t("work.projectsLabel")}</SectionDivider>
      </div>
    </Section>
  );
}
