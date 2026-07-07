import { SocialIcon } from "@/lib/socialIcons";
import { cn } from "@/lib/utils";

type Social = {
  key: "github" | "linkedin" | "instagram" | "spotify";
  label: string;
  url: string;
};

type SocialIconLinkProps = {
  social: Social;
};

export function SocialIconLink({ social }: SocialIconLinkProps) {
  return (
    <a
      href={social.url}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={social.label}
      className={cn(
        "inline-flex size-9 items-center justify-center rounded-md text-muted-foreground transition-colors",
        "hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
      )}
    >
      <SocialIcon socialKey={social.key} className="size-4" />
    </a>
  );
}
