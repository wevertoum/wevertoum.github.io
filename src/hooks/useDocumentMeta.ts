import { useEffect, useMemo } from "react";
import { useTranslation } from "react-i18next";

import { profile } from "@/config/profile";
import { site } from "@/config/site";
import { supportedLanguages } from "@/i18n";
import { THEME_COLORS, useTheme } from "@/hooks/useTheme";
import { buildStructuredData, type WorkProjectSeo } from "@/lib/seo";

function upsertMeta(
  selector: string,
  create: () => HTMLElement,
  apply: (element: HTMLElement) => void,
) {
  let element = document.querySelector(selector);

  if (!element) {
    element = create();
    document.head.appendChild(element);
  }

  apply(element as HTMLElement);
}

function setMetaName(name: string, content: string) {
  upsertMeta(
    `meta[name="${name}"]`,
    () => {
      const meta = document.createElement("meta");
      meta.setAttribute("name", name);
      return meta;
    },
    (meta) => meta.setAttribute("content", content),
  );
}

function setMetaHttpEquiv(httpEquiv: string, content: string) {
  upsertMeta(
    `meta[http-equiv="${httpEquiv}"]`,
    () => {
      const meta = document.createElement("meta");
      meta.setAttribute("http-equiv", httpEquiv);
      return meta;
    },
    (meta) => meta.setAttribute("content", content),
  );
}

function setMetaProperty(property: string, content: string) {
  upsertMeta(
    `meta[property="${property}"]`,
    () => {
      const meta = document.createElement("meta");
      meta.setAttribute("property", property);
      return meta;
    },
    (meta) => meta.setAttribute("content", content),
  );
}

function setLink(rel: string, href: string, hreflang?: string) {
  const selector = hreflang
    ? `link[rel="${rel}"][hreflang="${hreflang}"]`
    : `link[rel="${rel}"]:not([hreflang])`;

  upsertMeta(
    selector,
    () => {
      const link = document.createElement("link");
      link.setAttribute("rel", rel);
      if (hreflang) {
        link.setAttribute("hreflang", hreflang);
      }
      return link;
    },
    (link) => link.setAttribute("href", href),
  );
}

function setStructuredData(
  language: string,
  workProjects: WorkProjectSeo[],
  workListName: string,
) {
  const id = "portfolio-structured-data";
  let script = document.getElementById(id) as HTMLScriptElement | null;

  if (!script) {
    script = document.createElement("script");
    script.id = id;
    script.type = "application/ld+json";
    document.head.appendChild(script);
  }

  script.textContent = JSON.stringify(
    buildStructuredData(language, workProjects, workListName),
  );
}

export function useDocumentMeta() {
  const { t, i18n } = useTranslation();
  const { theme } = useTheme();
  const language = (i18n.resolvedLanguage ?? "en").slice(0, 2);
  const title = t("meta.title");
  const description = t("meta.description");
  const ogDescription = t("meta.ogDescription");
  const ogImageAlt = t("meta.ogImageAlt");
  const keywords = t("meta.keywords");
  const ogImage = `${site.url}/og-image.png`;
  const workProjects = useMemo(
    () => t("work.items", { returnObjects: true }) as WorkProjectSeo[],
    [t],
  );
  const workListName = t("work.projectsLabel");

  useEffect(() => {
    document.documentElement.lang = language;
    document.title = title;

    setMetaName("description", description);
    setMetaName("keywords", keywords);
    setMetaName("language", language);
    setMetaHttpEquiv("content-language", language);
    setMetaName("author", profile.name);
    setMetaName("robots", "index, follow, max-image-preview:large");
    setMetaName("googlebot", "index, follow");
    setMetaName("theme-color", THEME_COLORS[theme]);

    setLink("canonical", site.url);
    for (const lng of supportedLanguages) {
      setLink("alternate", site.url, lng);
    }
    setLink("alternate", site.url, "x-default");

    setMetaProperty("og:title", title);
    setMetaProperty("og:description", ogDescription);
    setMetaProperty("og:type", "profile");
    setMetaProperty("og:url", site.url);
    setMetaProperty("og:site_name", site.name);
    setMetaProperty("og:locale", language === "pt" ? "pt_BR" : language === "es" ? "es_ES" : "en_US");
    setMetaProperty("og:image", ogImage);
    setMetaProperty("og:image:width", "1200");
    setMetaProperty("og:image:height", "630");
    setMetaProperty("og:image:type", "image/png");
    setMetaProperty("og:image:alt", ogImageAlt);

    setMetaName("twitter:card", "summary_large_image");
    setMetaName("twitter:title", title);
    setMetaName("twitter:description", ogDescription);
    setMetaName("twitter:image", ogImage);
    setMetaName("twitter:creator", site.twitterHandle);

    setStructuredData(language, workProjects, workListName);
  }, [language, title, description, ogDescription, ogImageAlt, keywords, ogImage, workProjects, workListName, theme]);
}
