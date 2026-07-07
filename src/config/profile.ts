export const profile = {
  name: "Weverton Rodrigues",
  handle: "weverton",
  role: "Senior Product Engineer",
  email: "wevertondev@outlook.com",
  location: "Goiânia, Goiás, Brazil",
  initials: "WR",
  socials: [
    {
      key: "github",
      label: "GitHub",
      handle: "@wevertoum",
      url: "https://github.com/wevertoum/",
    },
    {
      key: "linkedin",
      label: "LinkedIn",
      handle: "/in/wevertonfr",
      url: "https://www.linkedin.com/in/wevertonfr/",
    },
    {
      key: "instagram",
      label: "Instagram",
      handle: "@weverton.js",
      url: "https://www.instagram.com/weverton.js/",
    },
    {
      key: "spotify",
      label: "Spotify",
      handle: "wevertoum",
      url: "https://open.spotify.com/user/wevertoum",
    },
  ],
  stack: [
    "TypeScript",
    "React",
    "Next.js",
    "Node.js",
    "NestJS",
    "GraphQL",
    "AWS",
    "Docker",
    "Kubernetes",
    "TailwindCSS",
    "React Native",
    "RAG",
    "Semantic Search",
    "MCP",
    "OpenAI API",
    "RabbitMQ",
    "Temporal",
    "PostgreSQL",
    "Firebase",
    "Remix",
  ],
  projectCount: 4,
} as const;

export type SocialKey = (typeof profile.socials)[number]["key"];

export const sectionIds = ["home", "work", "about", "contact"] as const;
export type SectionId = (typeof sectionIds)[number];
