// app/components/ProductParallaxServerComponent.tsx

import { HeroParallax } from "@/components/ui/hero-parrallax";
import { client } from "@/sanity/lib/client";
const ProductParallaxServerComponent = async () => {
  const products = await client.fetch(`*[_type == "product"]{
    title,
    link,
    thumbnail{
      asset->{
        url
      }
    },
    imageThumbnail{
      asset->{
        url
      }
    }
  }`);
  return <HeroParallax products={products} />;
};

export default ProductParallaxServerComponent;