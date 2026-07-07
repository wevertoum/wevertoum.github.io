import { SiteLayout } from "@/components/layout/SiteLayout";
import { AboutSection } from "@/sections/AboutSection";
import { ContactSection } from "@/sections/ContactSection";
import { HomeSection } from "@/sections/HomeSection";
import { WorkSection } from "@/sections/WorkSection";

export function PortfolioPage() {
  return (
    <SiteLayout>
      <HomeSection />
      <WorkSection />
      <AboutSection />
      <ContactSection />
    </SiteLayout>
  );
}
