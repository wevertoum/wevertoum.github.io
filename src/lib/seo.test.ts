import { describe, expect, it } from "vitest";

import { buildStructuredData } from "@/lib/seo";

const sampleProjects = [
  {
    title: "AI Product Platform",
    description: "AI-native marketing workflows with semantic search and RAG.",
    tags: ["React", "TypeScript", "AWS", "RAG"],
  },
];

describe("seo structured data", () => {
  it("includes person, website and profile page schemas", () => {
    const data = buildStructuredData("en") as unknown as {
      "@graph": Array<{ "@type": string; name?: string }>;
    };

    const types = data["@graph"].map((item) => item["@type"]);
    expect(types).toContain("Person");
    expect(types).toContain("WebSite");
    expect(types).toContain("ProfilePage");
    expect(data["@graph"].find((item) => item["@type"] === "Person")?.name).toBe(
      "Weverton Rodrigues",
    );
  });

  it("includes selected work item list when projects are provided", () => {
    const data = buildStructuredData("en", sampleProjects, "Selected Work") as unknown as {
      "@graph": Array<{ "@type": string; numberOfItems?: number }>;
    };

    const workList = data["@graph"].find((item) => item["@type"] === "ItemList");
    expect(workList).toBeDefined();
    expect(workList?.numberOfItems).toBe(1);
  });
});
