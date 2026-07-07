import { cn } from "@/lib/utils";

type TerminalLabelProps = {
  variant?: "slashes" | "comment";
  children: React.ReactNode;
  className?: string;
  as?: "span" | "p" | "h2" | "h3";
};

export function TerminalLabel({
  variant = "slashes",
  children,
  className,
  as: Component = "span",
}: TerminalLabelProps) {
  const prefix = variant === "comment" ? "/* " : "// ";
  const suffix = variant === "comment" ? " */" : "";

  return (
    <Component className={cn("font-mono text-sm text-accent", className)}>
      {prefix}
      {children}
      {suffix}
    </Component>
  );
}
