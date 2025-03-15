import { client } from "@/sanity/lib/client";
import Hero from "@/sections/Hero";

// Add revalidation configuration at the component level
export const revalidate = 30; // Revalidate every 30 seconds
export const dynamic = 'force-dynamic';

const HeroServerComponent = async () => {
  const heroData = await client.fetch(
    `*[_type == "hero"][0]{..., "timestamp": now()}`,
    {},
    {
      // Cache control options
      cache: 'no-store',
      next: { tags: ['hero-content'] }
    }
  );
  
  // Add timestamp for debugging
  console.log(`Hero data fetched at ${new Date().toISOString()}`, heroData);
  
  return <Hero heroData={heroData} />;
};

export default HeroServerComponent;