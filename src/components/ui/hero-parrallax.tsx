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
  imageThumbnail?: {
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
  const controls = useAnimation();
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;

  const handleFirstInteraction = useCallback(() => {
    if (!hasInteracted) setHasInteracted(true);
  }, [hasInteracted]);

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

  const handleHoverStart = useCallback((index: number) => {
    if (isMobile || !hasInteracted) return;
    const video = videoRefs.current[index];
    if (video) {
      video.style.opacity = '1';
      video.play().catch(() => {});
    }
  }, [isMobile, hasInteracted]);

  const handleHoverEnd = useCallback((index: number) => {
    if (isMobile || !hasInteracted) return;
    const video = videoRefs.current[index];
    if (video) {
      video.pause();
      video.style.opacity = video.parentElement?.querySelector('img') ? '0' : '1';
    }
  }, [isMobile, hasInteracted]);

  return (
    <div id="projects" className="w-full relative bg-black-100 min-h-screen" onClick={handleFirstInteraction}>
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
            className="text-base md:text-lg text-gray-600 max-w-3xl mx-auto"
          >
            Cinematic moments captured from above
          </motion.p>
        </div>
      </section>
      <div className="relative pb-24">
        <div className="md:hidden overflow-x-hidden">
          <div
            ref={scrollContainerRef}
            className="flex overflow-x-auto snap-x scrollbar-hide pb-8"
            style={{ scrollSnapType: 'x mandatory' }}
          >
            {products.map((product, index) => (
              <div key={`mobile-${index}`} className="flex-shrink-0 w-[85vw] mx-4 snap-center">
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
    const [showVideo, setShowVideo] = useState(false);
    const [playbackRate, setPlaybackRate] = useState(1);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const localVideoRef = useRef<HTMLVideoElement>(null);
    const hasImage = !!product.imageThumbnail?.asset?.url;

    useEffect(() => {
      const video = localVideoRef.current;
      if (!video) return;

      const updateState = () => setIsPlaying(!video.paused);
      const handleTimeUpdate = () => setCurrentTime(video.currentTime);
      const handleLoadedData = () => setDuration(video.duration);

      video.addEventListener('play', updateState);
      video.addEventListener('pause', updateState);
      video.addEventListener('timeupdate', handleTimeUpdate);
      video.addEventListener('loadeddata', handleLoadedData);
      
      return () => {
        video.removeEventListener('play', updateState);
        video.removeEventListener('pause', updateState);
        video.removeEventListener('timeupdate', handleTimeUpdate);
        video.removeEventListener('loadeddata', handleLoadedData);
      };
    }, []);

    const handleVideoClick = () => {
      const video = localVideoRef.current;
      if (!video) return;
      
      if (video.paused) {
        setShowVideo(true);
        video.play().catch(() => {});
      } else {
        video.pause();
        if (hasImage) setShowVideo(false);
      }
    };

    const handleSpeedChange = () => {
      const newSpeed = playbackRate === 2 ? 1 : playbackRate + 0.5;
      if (localVideoRef.current) {
        localVideoRef.current.playbackRate = newSpeed;
        setPlaybackRate(newSpeed);
      }
    };

    const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
      const video = localVideoRef.current;
      if (!video) return;
      const time = Number(e.target.value);
      video.currentTime = time;
      setCurrentTime(time);
    };

    const formatTime = (seconds: number) => {
      const minutes = Math.floor(seconds / 60);
      const remainingSeconds = Math.floor(seconds % 60);
      return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
    };

    return (
      <motion.div
        initial={{ scale: 1 }}
        animate={{ scale: isActive ? 1.03 : 1 }}
        transition={{ type: "spring", stiffness: 300 }}
        className="relative group overflow-hidden rounded-2xl shadow-xl hover:shadow-2xl bg-black"
      >
        <div className="relative w-full aspect-[9/16]">
          {/* Image Thumbnail */}
          {hasImage && !showVideo && (
            <img
              src={product.imageThumbnail?.asset.url}
              alt={product.title}
              className="absolute inset-0 w-full h-full object-cover"
            />
          )}

          {/* Video Element */}
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
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-300 ${
              hasImage ? (showVideo ? 'opacity-100' : 'opacity-0') : 'opacity-100'
            }`}
            onClick={isMobile ? handleVideoClick : undefined}
          />

          {/* Video Controls Container */}
          <div className="absolute bottom-0 left-0 right-0 p-2 space-y-2 bg-gradient-to-t from-black/90 to-transparent">
            {/* Progress Bar */}
            <input
              type="range"
              min="0"
              max={duration || 0}
              value={currentTime}
              onChange={handleSeek}
              className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer"
            />

            {/* Controls Row */}
            <div className="flex items-center justify-between px-2">
              <div className="flex items-center space-x-4">
                {/* Play/Pause Button */}
                <button
                  onClick={handleVideoClick}
                  className="text-white hover:text-orange-500 transition-colors"
                >
                  {isPlaying ? (
                    <span className="text-xl">⏸</span>
                  ) : (
                    <span className="text-xl">▶</span>
                  )}
                </button>

                {/* Time Display */}
                <div className="text-white text-sm font-mono">
                  {formatTime(currentTime)} / {formatTime(duration)}
                </div>
              </div>

              {/* Speed Control */}
              <button
                onClick={handleSpeedChange}
                className="px-2 py-1 text-sm text-white bg-black/50 rounded hover:bg-black/70 transition-colors"
              >
                {playbackRate}x
              </button>
            </div>
          </div>

          {/* Title Overlay */}
          <div className="absolute bottom-20 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent">
            <motion.h3
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-white text-lg font-semibold"
            >
              {product.title}
            </motion.h3>
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