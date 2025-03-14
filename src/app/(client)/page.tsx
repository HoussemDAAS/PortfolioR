// app/page.tsx
import FeatureServerComponent from "@/data-fetching/FeatureServerComponent";
import ProductParallaxServerComponent from "@/data-fetching/HeroParallaxServerComponent";
import HeroServerComponent from "@/data-fetching/HeroServerComponent";
import IntroServerComponent from "@/data-fetching/IntroServerComponent";
import LogoTickerServerComponent from "@/data-fetching/LogoTickerServerComponent";
import TapeServerComponent from "@/data-fetching/TapeServerComponent";
import Footer from "@/sections/Footer";
import Header from "@/sections/Header";
import Testimonials from "@/sections/Testimonials";
import { AnimatedSection } from "@/components/AnimatedSection";
import Contact from "@/sections/Contact";

 //src/app/(client)/page.tsx
export default function Home() {
  return (
    <>
      <Header /> 
      <HeroServerComponent />

      <div className="flex flex-col gap-16 md:gap-24">
        <AnimatedSection>
          <LogoTickerServerComponent />
        </AnimatedSection>

        <AnimatedSection>
          <IntroServerComponent />
        </AnimatedSection>
        <AnimatedSection>
          <TapeServerComponent />
        </AnimatedSection>
     
        <AnimatedSection>
          <FeatureServerComponent />
        </AnimatedSection>
        {/* Parallax section needs to be client component */}
        <ProductParallaxServerComponent />
        <AnimatedSection>
          <Testimonials />
        </AnimatedSection>
        <AnimatedSection>
  <Contact />
      </AnimatedSection>
      </div>


      <Footer />
      {/* <div className="flex flex-col gap-16 md:gap-24 overflow-hidden" /> */}
    </>
  );
}