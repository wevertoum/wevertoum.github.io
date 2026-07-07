type SectionDividerProps = {
  children: React.ReactNode;
  className?: string;
};

export function SectionDivider({ children, className }: SectionDividerProps) {
  return (
    <div className={className}>
      <div className="flex items-center gap-4">
        <span className="shrink-0 font-mono text-sm text-accent">
          {"// "}
          {children}
        </span>
        <div className="h-px flex-1 bg-border" />
      </div>
    </div>
  );
}
