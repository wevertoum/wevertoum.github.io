import { cn } from "@/lib/utils";

type SectionProps = {
  id: string;
  children: React.ReactNode;
  className?: string;
};

export function Section({ id, children, className }: SectionProps) {
  return (
    <section
      id={id}
      className={cn("scroll-mt-24 px-4 py-20 sm:px-6 sm:py-28", className)}
    >
      <div className="mx-auto w-full max-w-5xl">{children}</div>
    </section>
  );
}
