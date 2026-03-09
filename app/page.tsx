import { Footer } from "@/components/sections/footer";
import { FaqSection } from "@/components/sections/faq-section";
import { Header } from "@/components/sections/header";
import { HeroSection } from "@/components/sections/hero-section";
import { PortfolioSection } from "@/components/sections/portfolio-section";
import { ServicesSection } from "@/components/sections/services-section";
import { FloatingCTA } from "@/components/ui/floating-cta";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <HeroSection />
        <ServicesSection />
        <PortfolioSection />
        <FaqSection />
      </main>
      <FloatingCTA />
      <Footer />
    </>
  );
}
