
import Features from "@/sections/Features";
import Header from "@/sections/Header";
import Hero from "@/sections/Hero";
import Intro from "@/sections/Intro";
import Projects from "@/sections/Projects";
import Tape from "@/sections/Tape";
import Testimonials from "@/sections/Testimonials";

export default function Home() {
  return (
    <>
     <Header />
     <Hero />
     <Intro />
     <Tape/>
     <Features />
     <Projects /> 
     <Testimonials />
    </>
  );
}