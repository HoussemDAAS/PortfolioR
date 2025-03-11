/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import Link from "next/link";

interface Product {
  title: string;
  link: string;
  thumbnail: {
    asset: {
      url: string;
    };
  };
}

interface HeroParallaxProps {
  products: Product[];
}

export const HeroParallax: React.FC<HeroParallaxProps> = ({ products }) => {
  const ref = React.useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const translateY = useSpring(useTransform(scrollYProgress, [0, 1], [0, 200]));

  return (
    <div
      ref={ref}
      className="w-full overflow-hidden relative bg-black-100"
      style={{ height: `${Math.ceil(products.length / 4) * 100}vh` }}
    >
      {/* Project Title Section */}
      <section className="relative pt-20 pb-12 px-4">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-7xl mx-auto text-center"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-orange-500 mb-4">
            Aerial Visual Stories
          </h1>
          <p className="text-lg text-black-900 max-w-3xl mx-auto">
            Cinematic moments captured from above
          </p>
        </motion.div>
      </section>

      {/* Compact Grid Container */}
      <motion.div 
        style={{ translateY }}
        className="mx-auto grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 p-2 max-w-7xl"
      >
        {products.map((product, index) => (
          <ReelCard
            key={product.title}
            product={product}
            index={index}
          />
        ))}
      </motion.div>
    </div>
  );
};

const ReelCard: React.FC<{ product: Product; index: number }> = ({
  product,
}) => {
  const [isHovered, setIsHovered] = React.useState(false);

  return (
    <motion.div
      className="group relative aspect-[9/16] w-full overflow-hidden rounded-lg cursor-pointer"
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      whileHover={{ scale: 1.02 }}
      transition={{ type: "spring", stiffness: 400, damping: 20 }}
    >
      <Link href={product.link} target="_blank" rel="noopener noreferrer">
        <video
          src={product.thumbnail.asset.url}
          muted
          autoPlay
          loop
          playsInline
          className="object-cover w-full h-full absolute inset-0"
        />

        {/* Subtle Overlay */}
        <motion.div
          className="absolute inset-0 bg-black/40"
          animate={{ opacity: isHovered ? 0.6 : 0.3 }}
        />

        {/* Title */}
        <motion.h2
          className="absolute bottom-2 left-2 text-white text-sm font-medium"
          animate={{ y: isHovered ? 0 : 10, opacity: isHovered ? 1 : 0 }}
        >
          {product.title}
        </motion.h2>

        {/* Orange Play Indicator */}
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
          animate={{ scale: isHovered ? 1 : 0, opacity: isHovered ? 1 : 0 }}
        >
          <div className="w-12 h-12 bg-orange-500/90 rounded-full flex items-center justify-center">
            <div className="w-0 h-0 border-t-6 border-b-6 border-l-8 border-transparent border-l-white" />
          </div>
        </motion.div>
      </Link>
    </motion.div>
  );
};