"use client";

import React, { useEffect, useState } from "react";
import { HeroParallax } from "@/components/ui/hero-parrallax";
import { client } from "@/sanity/lib/client";

const ProductParallaxClientComponent = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const data = await client.fetch(`*[_type == "product"]`);
      setProducts(data);
    };

    fetchProducts();
  }, []);

  if (!products.length) {
    return <div>Loading...</div>; // Optional loading state
  }

  return <HeroParallax products={products} />;
};

export default ProductParallaxClientComponent;
