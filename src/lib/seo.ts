import { profile } from "@/config/profile";
import { site } from "@/config/site";

export type WorkProjectSeo = {
  title: string;
  description: string;
  tags: string[];
};

export function buildPersonJsonLd(language: string) {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": `${site.url}/#person`,
    name: profile.name,
    url: site.url,
    email: profile.email,
    jobTitle: profile.role,
    description: profile.role,
    image: `${site.url}/og-image.svg`,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Goiânia",
      addressRegion: "Goiás",
      addressCountry: "BR",
    },
    sameAs: profile.socials.map((social) => social.url),
    knowsAbout: profile.stack,
    inLanguage: language,
    worksFor: {
      "@type": "Organization",
      name: "Independent",
    },
  };
}

export function buildWebSiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${site.url}/#website`,
    url: site.url,
    name: site.name,
    description: profile.role,
    inLanguage: ["en", "es", "pt"],
    author: {
      "@id": `${site.url}/#person`,
    },
  };
}

export function buildProfilePageJsonLd(language: string) {
  return {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    "@id": `${site.url}/#profilepage`,
    url: site.url,
    name: `${profile.name} — Portfolio`,
    inLanguage: language,
    mainEntity: {
      "@id": `${site.url}/#person`,
    },
    isPartOf: {
      "@id": `${site.url}/#website`,
    },
  };
}

export function buildWorkItemListJsonLd(
  projects: WorkProjectSeo[],
  language: string,
  listName: string,
) {
  return {
    "@type": "ItemList",
    "@id": `${site.url}/#selected-work`,
    name: listName,
    inLanguage: language,
    numberOfItems: projects.length,
    itemListElement: projects.map((project, index) => ({
      "@type": "ListItem",
      position: index + 1,
      item: {
        "@type": "CreativeWork",
        name: project.title,
        description: project.description,
        keywords: project.tags.join(", "),
        author: { "@id": `${site.url}/#person` },
        inLanguage: language,
      },
    })),
  };
}

export function buildStructuredData(
  language: string,
  workProjects: WorkProjectSeo[] = [],
  workListName = "Selected Work",
) {
  const graph: Record<string, unknown>[] = [
    buildPersonJsonLd(language),
    buildWebSiteJsonLd(),
    buildProfilePageJsonLd(language),
  ];

  if (workProjects.length > 0) {
    graph.push(buildWorkItemListJsonLd(workProjects, language, workListName));
  }

  return {
    "@context": "https://schema.org",
    "@graph": graph,
  };
}
