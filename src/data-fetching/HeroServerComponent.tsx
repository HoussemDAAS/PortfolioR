import { client } from "@/sanity/lib/client";

import Hero from "@/sections/Hero";
const HeroServerComponent = async () => {
  const heroData = await client.fetch(`*[_type == "hero"][0]`);

  return <Hero heroData={heroData} />;
};

export default HeroServerComponent;