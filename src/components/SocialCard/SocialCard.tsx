import { SocialIcon } from "@/lib/socialIcons";
import { cn } from "@/lib/utils";

type Social = {
  key: "github" | "linkedin" | "instagram" | "spotify";
  label: string;
  handle: string;
  url: string;
};

type SocialCardProps = {
  social: Social;
};

export function SocialCard({ social }: SocialCardProps) {
  return (
    <a
      href={social.url}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        "group flex items-center gap-4 rounded-lg border border-border bg-card p-4 transition-colors",
        "hover:border-accent/50 hover:bg-secondary/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
      )}
    >
      <div className="flex size-10 items-center justify-center rounded-md bg-secondary text-foreground transition-colors group-hover:text-accent">
        <SocialIcon socialKey={social.key} />
      </div>
      <div className="min-w-0 text-left">
        <p className="font-medium text-foreground">{social.label}</p>
        <p className="truncate font-mono text-sm text-muted-foreground">{social.handle}</p>
      </div>
    </a>
  );
}
