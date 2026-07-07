import profileImage from "@/assets/images/profile.jpeg";
import { cn } from "@/lib/utils";

type ProfilePortraitProps = {
  alt: string;
  className?: string;
};

export function ProfilePortrait({ alt, className }: ProfilePortraitProps) {
  return (
    <div
      className={cn(
        "relative aspect-square w-full max-w-xs overflow-hidden rounded-lg border-2 border-accent",
        className,
      )}
    >
      <img
        src={profileImage}
        alt={alt}
        width={320}
        height={320}
        loading="lazy"
        decoding="async"
        className="h-full w-full object-cover object-[center_20%] contrast-[1.02] dark:saturate-[0.85] dark:contrast-[1.05]"
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-gradient-to-t from-background/30 via-transparent to-accent/5 dark:from-background dark:via-background/55 dark:to-accent/20"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-accent/5 mix-blend-multiply dark:bg-accent/10 dark:mix-blend-soft-light"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_15%,hsl(var(--accent)/0.1),transparent_55%)] dark:bg-[radial-gradient(circle_at_20%_15%,hsl(var(--accent)/0.22),transparent_55%)]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-15 [background-image:linear-gradient(to_right,hsl(var(--border)/0.45)_1px,transparent_1px),linear-gradient(to_bottom,hsl(var(--border)/0.45)_1px,transparent_1px)] [background-size:24px_24px] dark:opacity-30"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-accent/35"
      />
    </div>
  );
}
