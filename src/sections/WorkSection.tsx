import { Code2 } from "lucide-react";
import { useTranslation } from "react-i18next";

import { Section } from "@/components/layout/Section";
import { SectionDivider } from "@/components/layout/SectionDivider";
import { TerminalLabel } from "@/components/TerminalLabel";
import { cn } from "@/lib/utils";

type ProjectItem = {
  title: string;
  description: string;
  highlight: string;
  tags: string[];
};

export function ProjectCard({ project }: { project: ProjectItem }) {
  return (
    <article
      className={cn(
        "rounded-xl border border-border bg-card/50 p-6 transition-colors",
        "hover:border-accent/30 hover:bg-card",
      )}
      itemScope
      itemType="https://schema.org/CreativeWork"
    >
      <meta itemProp="keywords" content={project.tags.join(", ")} />
      <div className="mb-3 flex items-start justify-between gap-4">
        <h3 className="text-xl font-semibold tracking-tight" itemProp="name">
          {project.title}
        </h3>
        <Code2
          className="size-5 shrink-0 text-muted-foreground"
          aria-hidden="true"
        />
      </div>

      <p
        className="mb-4 text-sm leading-relaxed text-muted-foreground"
        itemProp="description"
      >
        {project.description}
      </p>

      <div className="mb-4 flex flex-wrap gap-2">
        {project.tags.map((tag) => (
          <span
            key={tag}
            className="rounded-md border border-border bg-secondary px-2.5 py-1 font-mono text-xs text-muted-foreground"
            itemProp="about"
          >
            {tag}
          </span>
        ))}
      </div>

      <TerminalLabel className="text-xs leading-relaxed text-accent/90">
        {project.highlight}
      </TerminalLabel>
    </article>
  );
}

export function WorkSection() {
  const { t } = useTranslation();
  const projects = t("work.items", { returnObjects: true }) as ProjectItem[];

  return (
    <Section id="work" aria-labelledby="work-heading">
      <h2 id="work-heading" className="mb-4 text-4xl font-bold tracking-tight sm:text-5xl">
        {t("work.title")}
      </h2>
      <p className="mb-10 max-w-2xl text-base leading-relaxed text-muted-foreground">
        {t("work.intro")}
      </p>

      <SectionDivider className="mb-10">{t("work.projectsLabel")}</SectionDivider>

      <ul className="space-y-5" aria-label={t("work.projectsLabel")}>
        {projects.map((project) => (
          <li key={project.title}>
            <ProjectCard project={project} />
          </li>
        ))}
      </ul>
    </Section>
  );
}
