// components/ui/hero-parrallax.tsx

"use client";
import React, { useRef, useEffect, useCallback, useState } from "react";
import { motion, useAnimation } from "framer-motion";
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
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);
  const [activeIndex, setActiveIndex] = useState(-1);
  const [hasInteracted, setHasInteracted] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const controls = useAnimation();

  // Hydration-safe mobile detection
  useEffect(() => {
    setIsMobile(window.innerWidth < 768);
    setHasInteracted(false);
  }, []);

  // Handle first user interaction
  const handleGlobalInteraction = useCallback(() => {
    if (!hasInteracted) {
      setHasInteracted(true);
      videoRefs.current.forEach(video => {
        if (video) video.muted = false;
      });
    }
  }, [hasInteracted]);

  // Mobile scroll handler
  const handleScroll = useCallback(() => {
    if (!scrollContainerRef.current || !isMobile) return;

    const container = scrollContainerRef.current;
    const scrollLeft = container.scrollLeft;
    const containerWidth = container.offsetWidth;
    
    products.forEach((_, index) => {
      const child = container.children[index] as HTMLElement;
      if (!child) return;
      
      const childLeft = child.offsetLeft - scrollLeft;
      const childWidth = child.offsetWidth;
      const visibility = Math.max(0, Math.min(1, 
        (containerWidth - Math.abs(childLeft + childWidth / 2 - containerWidth / 2)) / childWidth
      ));
      
      if (visibility > 0.8 && activeIndex !== index) {
        setActiveIndex(index);
      }
    });
  }, [isMobile, products.length, activeIndex]);

  // Video control management
  useEffect(() => {
    videoRefs.current.forEach((video, index) => {
      if (!video) return;
      if (index === activeIndex && hasInteracted) {
        video.play().catch(() => {});
      } else {
        video.pause();
      }
    });
  }, [activeIndex, hasInteracted]);

  // Desktop hover handlers
  const handleHoverStart = useCallback((index: number) => {
    if (isMobile || !hasInteracted) return;
    videoRefs.current[index]?.play().catch(() => {});
  }, [isMobile, hasInteracted]);

  const handleHoverEnd = useCallback((index: number) => {
    if (isMobile || !hasInteracted) return;
    videoRefs.current[index]?.pause();
  }, [isMobile, hasInteracted]);

  return (
    <div id="projects" className="w-full relative bg-black-100 min-h-screen" onClick={handleGlobalInteraction}>
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
            className="text-base md:text-lg text-gray-300 max-w-3xl mx-auto"
          >
            Cinematic moments captured from above
          </motion.p>
        </div>
      </section>

      {/* Sound Permission Banner */}
      {!hasInteracted && (
        <div className="fixed bottom-4 left-1/2 -translate-x-1/2 bg-black/80 text-white px-6 py-3 rounded-full backdrop-blur-sm z-50">
          🔈 Click anywhere to enable sound
        </div>
      )}

      <div className="relative pb-24">
        {/* Mobile Scroll */}
        <div className="md:hidden overflow-x-hidden">
          <div
            ref={scrollContainerRef}
            onScroll={handleScroll}
            className="flex overflow-x-auto snap-x scrollbar-hide pb-8"
            style={{ scrollSnapType: 'x mandatory' }}
          >
            {products.map((product, index) => (
              <div 
                key={`mobile-${index}`}
                className="flex-shrink-0 w-[85vw] mx-4 snap-center"
              >
                <VideoCard
                  product={product}
                  index={index}
                  isActive={index === activeIndex}
                  isMobile={true}
                  hasInteracted={hasInteracted}
                  ref={(el) => (videoRefs.current[index] = el)}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Desktop Grid */}
        <div className="hidden md:block">
          <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 px-6 max-w-7xl mx-auto">
            {products.map((product, index) => (
              <motion.div
                key={`desktop-${index}`}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "0px 0px -100px 0px" }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                onHoverStart={() => handleHoverStart(index)}
                onHoverEnd={() => handleHoverEnd(index)}
                className="col-span-1"
              >
                <VideoCard
                  product={product}
                  index={index}
                  isActive={index === activeIndex}
                  isMobile={false}
                  hasInteracted={hasInteracted}
                  ref={(el) => (videoRefs.current[index] = el)}
                />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

interface VideoCardProps {
  product: Product;
  index: number;
  isActive: boolean;
  isMobile: boolean;
  hasInteracted: boolean;
}

const VideoCard = React.forwardRef<HTMLVideoElement, VideoCardProps>(
  ({ product, index, isActive, isMobile, hasInteracted }, ref) => {
    const [isPlaying, setIsPlaying] = useState(false);
    const [isMuted, setIsMuted] = useState(true);
    const localVideoRef = useRef<HTMLVideoElement>(null);
    const [mounted, setMounted] = useState(false);

    // Sync state with video element
    useEffect(() => {
      setMounted(true);
      const video = localVideoRef.current;
      if (!video) return;

      const updateState = () => {
        setIsPlaying(!video.paused);
        setIsMuted(video.muted);
      };

      video.addEventListener('play', updateState);
      video.addEventListener('pause', updateState);
      video.addEventListener('volumechange', updateState);

      return () => {
        video.removeEventListener('play', updateState);
        video.removeEventListener('pause', updateState);
        video.removeEventListener('volumechange', updateState);
      };
    }, []);

    // Handle video interactions
    const handleVideoClick = useCallback(() => {
      const video = localVideoRef.current;
      if (!video) return;

      if (video.paused) {
        video.play().catch(() => {});
      } else {
        video.pause();
      }
    }, []);

    // Update mute state when global interaction happens
    useEffect(() => {
      if (localVideoRef.current && hasInteracted) {
        localVideoRef.current.muted = false;
        setIsMuted(false);
      }
    }, [hasInteracted]);

    if (!mounted) return null;

    return (
      <motion.div
        initial={{ scale: 1 }}
        animate={{ scale: isActive ? 1.03 : 1 }}
        transition={{ type: "spring", stiffness: 300 }}
        className="relative group overflow-hidden rounded-2xl shadow-xl hover:shadow-2xl bg-black"
      >
        <div className="relative w-full aspect-[9/16]">
          <video
            ref={(node) => {
              localVideoRef.current = node;
              if (typeof ref === "function") ref(node);
              else if (ref) ref.current = node;
            }}
            src={product.thumbnail.asset.url}
            muted={!hasInteracted}
            loop
            playsInline
            className="absolute inset-0 w-full h-full object-cover"
            onClick={isMobile ? handleVideoClick : undefined}
          />
          
          {/* Play/Pause Controls */}
          <div className="absolute inset-0 flex items-center justify-center">
            <button
              onClick={handleVideoClick}
              className={`p-4 rounded-full backdrop-blur-sm transition-all ${
                isPlaying ? 'bg-red-500/80 hover:bg-red-600/80' : 'bg-green-500/80 hover:bg-green-600/80'
              }`}
            >
              {isPlaying ? (
                <span className="text-white text-2xl">⏸</span>
              ) : (
                <span className="text-white text-2xl">▶</span>
              )}
            </button>
          </div>

          {/* Bottom Info Bar */}
          <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent">
            <motion.h3
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-white text-lg font-semibold"
            >
              {product.title}
            </motion.h3>
            <button
              onClick={(e) => {
                e.stopPropagation();
                if (localVideoRef.current) {
                  localVideoRef.current.muted = !localVideoRef.current.muted;
                  setIsMuted(localVideoRef.current.muted);
                }
              }}
              className="absolute right-4 bottom-4 p-2 bg-black/50 rounded-full backdrop-blur-sm hover:bg-black/70"
            >
              {isMuted ? '🔇' : '🔊'}
            </button>
          </div>
        </div>

        <Link
          href={product.link}
          target="_blank"
          rel="noopener noreferrer"
          className="block w-full mt-4"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="w-full bg-orange-500 hover:bg-orange-600 text-white font-medium py-3 px-6 rounded-lg transition-colors duration-200 flex items-center justify-center gap-2"
          >
            <span>View Full Project</span>
            <span className="text-xl">→</span>
          </motion.button>
        </Link>
      </motion.div>
    );
  }
);

VideoCard.displayName = "VideoCard";