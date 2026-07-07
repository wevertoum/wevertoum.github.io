import { useTranslation } from "react-i18next";

import { profile } from "@/config/profile";
import { AvailabilityCard } from "@/components/AvailabilityCard";
import { ContactForm } from "@/components/ContactForm";
import { Section } from "@/components/layout/Section";
import { SocialCard } from "@/components/SocialCard";
import { TerminalLabel } from "@/components/TerminalLabel";

export function ContactSection() {
  const { t } = useTranslation();

  return (
    <Section id="contact">
      <h2 className="mb-4 text-4xl font-bold tracking-tight sm:text-5xl">
        {t("contact.sectionTitle")}
      </h2>
      <p className="mb-10 max-w-2xl text-base leading-relaxed text-muted-foreground">
        {t("contact.intro")}
      </p>

      <div className="grid gap-10 lg:grid-cols-2 lg:gap-12">
        <ContactForm />

        <div className="space-y-5">
          <TerminalLabel variant="slashes" as="h3" className="block">
            {t("contact.connectTitle")}
          </TerminalLabel>
          <div className="space-y-3">
            {profile.socials.map((social) => (
              <SocialCard key={social.key} social={social} />
            ))}
          </div>
          <AvailabilityCard />
        </div>
      </div>
    </Section>
  );
}
