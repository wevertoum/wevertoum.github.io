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
        className="h-full w-full object-cover object-[center_20%] saturate-[0.85] contrast-[1.05]"
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-gradient-to-t from-background via-background/55 to-accent/20"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-accent/10 mix-blend-soft-light"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_15%,hsl(var(--accent)/0.22),transparent_55%)]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-30 [background-image:linear-gradient(to_right,hsl(var(--border)/0.45)_1px,transparent_1px),linear-gradient(to_bottom,hsl(var(--border)/0.45)_1px,transparent_1px)] [background-size:24px_24px]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-accent/35"
      />
    </div>
  );
}
