import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";

type SiteLayoutProps = {
  children: React.ReactNode;
};

export function SiteLayout({ children }: SiteLayoutProps) {
  return (
    <div className="min-h-dvh bg-grid">
      <SiteHeader />
      <main>{children}</main>
      <div className="border-t border-border/60 px-4 py-8 pb-[max(2rem,env(safe-area-inset-bottom))] sm:px-6">
        <div className="mx-auto max-w-5xl">
          <SiteFooter />
        </div>
      </div>
    </div>
  );
}
