import { Faq } from "@/components/FAQ/Faq";
import { Features } from "@/components/Features/Features";
import { Footer } from "@/components/Footer/Footer";
import { Header } from "@/components/Header/Header";
import { HeroSection } from "@/components/HeroSection/HeroSection";

export function HomePage() {
  return (
    <>
      <Header />
      <HeroSection />
      <Features />
      <Faq />
      <Footer />
    </>
  );
}
