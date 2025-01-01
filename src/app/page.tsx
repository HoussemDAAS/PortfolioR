
import { HeroParallax } from "@/components/ui/hero-parrallax";
import Features from "@/sections/Features";
import Footer from "@/sections/Footer";
import Header from "@/sections/Header";
import Hero from "@/sections/Hero";
import Intro from "@/sections/Intro";


import Tape from "@/sections/Tape";
import Testimonials from "@/sections/Testimonials";

export default function Home() {
   const products = [
    {
      title: "Tunisia through my eyes",
      link: "https://www.instagram.com/reel/C3f-x9HNPMw/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==",
      thumbnail:
        "/videos/video2.mp4",
    },
    {
      title: "Abtal unboxing",
      link: "https://www.instagram.com/rayenelmaamoun/reel/DDUcXDNNA8G/",
      thumbnail:
        "/videos/video3.mp4",
    },
    {
      title: "Itel teaser",
      link: "https://www.instagram.com/rayenelmaamoun/reel/DDSJDQDtIPy/",
      thumbnail:
        "/videos/video.mp4",
    },
   
    {
      title: "mayseen parfum",
      link: "https://www.instagram.com/rayenelmaamoun/reel/DCHjTpaNrP2/",
      thumbnail:
        "/videos/video4.mp4",
    },
    {
      title: "Editrix AI",
      link: "https://editrix.ai",
      thumbnail:
        "/videos/video.mp4",
    },
    {
      title: "Pixel Perfect",
      link: "https://app.pixelperfect.quest",
      thumbnail:
        "/videos/video.mp4",
    },
   
    {
      title: "Algochurn",
      link: "https://algochurn.com",
      thumbnail:
        "/videos/video.mp4",
    },
    {
      title: "Aceternity UI",
      link: "https://ui.aceternity.com",
      thumbnail:
        "/videos/video.mp4",
    },
    {
      title: "Tailwind Master Kit",
      link: "https://tailwindmasterkit.com",
      thumbnail:
        "/videos/video.mp4",
    },
    {
      title: "SmartBridge",
      link: "https://smartbridgetech.com",
      thumbnail:
        "/videos/video.mp4",
    },
    {
      title: "Renderwork Studio",
      link: "https://renderwork.studio",
      thumbnail:
        "/videos/video.mp4",
    },
   
    {
      title: "Creme Digital",
      link: "https://cremedigital.com",
      thumbnail:
        "/videos/video.mp4",
    },
    {
      title: "Golden Bells Academy",
      link: "https://goldenbellsacademy.com",
      thumbnail:
        "/videos/video.mp4",
    },
    {
      title: "Invoker Labs",
      link: "https://invoker.lol",
      thumbnail:
        "/videos/video.mp4",
    },
    {
      title: "E Free Invoice",
      link: "https://efreeinvoice.com",
      thumbnail:
        "/videos/video.mp4",
    },
  ];
  return (
    <>
     <Header />
    <div className="flex flex-col">
    <Hero />
    <Intro />
     </div>
     <HeroParallax products={products} />
     
     <Tape/>
     <Features />
    
     {/* <Projects />  */}
     <Testimonials />
     <Footer/>
     {/* <Portfolio />   */}
    </>
  );
}