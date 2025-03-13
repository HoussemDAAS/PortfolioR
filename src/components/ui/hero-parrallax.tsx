"use client";
import React, { useRef, useState, useCallback } from "react";
import { motion } from "framer-motion";
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
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  const handleScroll = useCallback(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const scrollWidth = container.scrollWidth - container.clientWidth;
    const newProgress = scrollWidth > 0 
      ? Math.min((container.scrollLeft / scrollWidth) * 100, 100)
      : 0;
    setScrollProgress(newProgress);
  }, []);

  return (
    <div id="projects" className="w-full relative bg-black-100">
      <section className="relative pt-20 pb-8 px-4 md:pb-12 md:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-3xl md:text-5xl font-bold text-orange-500 mb-4"
          >
            Aerial Visual Stories
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-base md:text-lg text-black-900 max-w-3xl mx-auto"
          >
            Cinematic moments captured from above
          </motion.p>
        </div>
      </section>

      <div className="relative pb-12">
        {/* Mobile: Horizontal scroll with hidden scrollbar */}
        <div className="md:hidden">
          <div 
            ref={scrollContainerRef}
            onScroll={handleScroll}
            className="flex overflow-x-auto pb-4 px-4 snap-x scrollbar-hide"
            style={{ 
              WebkitOverflowScrolling: 'touch',
              scrollBehavior: 'smooth',
              paddingBottom: '2px'
            }}
          >
            {products.map((product, index) => (
              <div 
                key={`mobile-${index}`}
                className="flex-shrink-0 w-[80vw] mr-4 snap-center"
              >
                <ReelCard product={product} index={index} />
              </div>
            ))}
          </div>

          {/* Custom Scroll Progress Indicator */}
          <div className="absolute bottom-0 left-0 right-0 h-1.5 bg-black-200/20">
            <motion.div 
              className="h-full bg-orange-500 origin-left rounded-full" 
              style={{ scaleX: scrollProgress / 100 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            />
          </div>
        </div>

        {/* Desktop: Staggered Grid */}
        <div className="hidden md:grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 p-4 max-w-7xl mx-auto">
          {products.map((product, index) => (
            <motion.div
              key={`desktop-${index}`}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "0px 0px -100px 0px" }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="col-span-1"
            >
              <ReelCard product={product} index={index} />
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

interface ReelCardProps {
  product: Product;
  index: number;
}

const ReelCard: React.FC<ReelCardProps> = ({ product, index }) => {
  return (
    <motion.div
      whileHover={{ scale: 1.03 }}
      transition={{ type: "spring", stiffness: 400 }}
      className="relative w-full overflow-hidden rounded-xl cursor-pointer shadow-xl hover:shadow-2xl hover:shadow-orange-500/20"
    >
      <Link href={product.link} target="_blank" rel="noopener noreferrer">
        <div className="relative w-full aspect-[9/16]">
          <video
            src={product.thumbnail.asset.url}
            muted
            autoPlay
            loop
            playsInline
            className="absolute top-0 left-0 w-full h-full object-cover"
          />
          
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent" />
          
          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="absolute bottom-0 left-0 right-0 p-4 text-white text-lg font-medium"
          >
            {product.title}
          </motion.h2>

          <motion.div
            className="absolute top-4 right-4 bg-black/50 px-3 py-1 rounded-full backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            <span className="text-xs text-orange-400 font-medium">VIEW →</span>
          </motion.div>

          <motion.div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <div className="w-12 h-12 bg-orange-500/90 rounded-full flex items-center justify-center shadow-lg">
              <div className="w-0 h-0 border-t-6 border-b-6 border-l-8 border-transparent border-l-white" />
            </div>
          </motion.div>
        </div>
      </Link>
    </motion.div>
  );
};