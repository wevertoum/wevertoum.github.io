import { useTranslation } from "react-i18next";

import { profile } from "@/config/profile";
import { ProfilePortrait } from "@/components/ProfilePortrait";
import { Section } from "@/components/layout/Section";
import { TerminalLabel } from "@/components/TerminalLabel";

export function AboutSection() {
  const { t } = useTranslation();
  const bio = t("about.bio", { returnObjects: true }) as string[];
  const philosophy = t("about.philosophy", { returnObjects: true }) as string[];
  const skills = t("about.skills", { returnObjects: true }) as string[];
  const experience = t("about.experience", { returnObjects: true }) as string[];

  return (
    <Section id="about">
      <h2 className="mb-10 text-4xl font-bold tracking-tight sm:text-5xl">
        {t("about.title")}
      </h2>

      <div className="grid gap-12 lg:grid-cols-[1.2fr_0.8fr]">
        <div>
          <ProfilePortrait
            alt={t("about.portraitAlt", { name: profile.name })}
            className="mb-8"
          />

          <div className="space-y-4 text-base leading-relaxed text-muted-foreground">
            {bio.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>

          <div className="mt-10">
            <SectionBlock title={t("about.philosophyTitle")}>
              <ul className="space-y-2">
                {philosophy.map((item) => (
                  <li key={item}>
                    <TerminalLabel className="text-sm text-muted-foreground">
                      {item}
                    </TerminalLabel>
                  </li>
                ))}
              </ul>
            </SectionBlock>
          </div>
        </div>

        <div className="space-y-8">
          <SectionBlock title={t("about.skillsTitle")} variant="comment">
            <ul className="space-y-2">
              {skills.map((skill) => (
                <li
                  key={skill}
                  className="flex items-center gap-2 text-sm text-muted-foreground"
                >
                  <span className="font-mono text-accent">-&gt;</span>
                  {skill}
                </li>
              ))}
            </ul>
          </SectionBlock>

          <SectionBlock title={t("about.stackTitle")} variant="comment">
            <div className="flex flex-wrap gap-2">
              {profile.stack.map((tech) => (
                <span
                  key={tech}
                  className="rounded-md border border-border bg-secondary px-2.5 py-1 font-mono text-xs text-muted-foreground"
                >
                  {tech}
                </span>
              ))}
            </div>
          </SectionBlock>

          <SectionBlock title={t("about.experienceTitle")} variant="comment">
            <ul className="space-y-2 text-sm text-muted-foreground">
              {experience.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </SectionBlock>
        </div>
      </div>
    </Section>
  );
}

function SectionBlock({
  title,
  children,
  variant = "slashes",
}: {
  title: string;
  children: React.ReactNode;
  variant?: "slashes" | "comment";
}) {
  return (
    <div>
      <TerminalLabel variant={variant} as="h3" className="mb-4 block">
        {title}
      </TerminalLabel>
      {children}
    </div>
  );
}
