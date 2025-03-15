"use client";
import { useState, useRef, useCallback } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import dynamic from "next/dynamic";
import { FaPlay, FaPause, FaArrowRight } from "react-icons/fa";
import { FiClock, FiSettings } from "react-icons/fi";

const ReactPlayer = dynamic(() => import("react-player/lazy"), { ssr: false });

interface Product {
  title: string;
  link: string;
  thumbnail: {
    asset: {
      url: string;
    };
    imageThumbnail?: {  // Add this to the Product interface
    asset: {
      url: string;
    };
  };
  };
}

interface HeroParallaxProps {
  products: Product[];
}

interface PlayerState {
  playing: boolean;
  playbackRate: number;
  progress: number;
  duration: number;
  isSeeking: boolean;
}

export const HeroParallax: React.FC<HeroParallaxProps> = ({ products }) => {
  const [playerStates, setPlayerStates] = useState<PlayerState[]>(
    () => products.map(() => ({
      playing: false,
      playbackRate: 1,
      progress: 0,
      duration: 0,
      isSeeking: false
    }))
  );
  const [hasInteracted, setHasInteracted] = useState(false);
  const players = useRef<(ReactPlayer | null)[]>([]);

  const handlePlayPause = useCallback((index: number) => {
    setPlayerStates(prev => {
      const newStates = [...prev];
      newStates[index] = {
        ...newStates[index],
        playing: !newStates[index].playing
      };
      return newStates;
    });
    setHasInteracted(true);
  }, []);

  const handleSpeedChange = useCallback((index: number) => {
    const rates = [0.5, 1, 1.5, 2];
    setPlayerStates(prev => {
      const newStates = [...prev];
      const currentRate = newStates[index].playbackRate;
      const currentIndex = rates.indexOf(currentRate);
      newStates[index].playbackRate = rates[(currentIndex + 1) % rates.length];
      return newStates;
    });
  }, []);

  const handleProgress = useCallback((index: number, playedSeconds: number) => {
    if (!playerStates[index].isSeeking) {
      setPlayerStates(prev => {
        const newStates = [...prev];
        newStates[index].progress = playedSeconds;
        return newStates;
      });
    }
  }, [playerStates]);

  const handleDuration = useCallback((index: number, duration: number) => {
    setPlayerStates(prev => {
      const newStates = [...prev];
      newStates[index].duration = duration;
      return newStates;
    });
  }, []);

  const handleSeek = useCallback((index: number, seconds: number) => {
    players.current[index]?.seekTo(seconds, "seconds");
    setPlayerStates(prev => {
      const newStates = [...prev];
      newStates[index].progress = seconds;
      return newStates;
    });
  }, []);

  const handleSeekMouseDown = useCallback((index: number) => {
    setPlayerStates(prev => {
      const newStates = [...prev];
      newStates[index].isSeeking = true;
      return newStates;
    });
  }, []);

  const handleSeekMouseUp = useCallback((index: number, seconds: number) => {
    handleSeek(index, seconds);
    setPlayerStates(prev => {
      const newStates = [...prev];
      newStates[index].isSeeking = false;
      return newStates;
    });
  }, [handleSeek]);

  const formatTime = useCallback((seconds: number) => {
    const date = new Date(seconds * 1000);
    return seconds >= 3600 
      ? date.toISOString().substr(11, 8)
      : date.toISOString().substr(14, 5);
  }, []);

  return (
    <div id="projects" className="w-full relative bg-black-100 min-h-screen">
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

      <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 px-6 max-w-7xl mx-auto pb-24">
        {products.map((product, index) => {
          const state = playerStates[index];
          const progressPercentage = (state.progress / (state.duration || 1)) * 100;
          
          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "0px 0px -100px 0px" }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="relative group overflow-hidden rounded-2xl shadow-xl bg-black"
              whileHover={{ scale: 1.03 }}
            >
              <div className="relative w-full aspect-[9/16]">
                <ReactPlayer
                  ref={(player) => players.current[index] = player}
                  url={product.thumbnail.asset.url}
                  playing={state.playing}
                  playbackRate={state.playbackRate}
                  controls={false}
                  loop
                  muted={!hasInteracted}
                  width="100%"
                  height="100%"
                  playsinline
                  onPlay={() => setHasInteracted(true)}
                  onProgress={({ playedSeconds }) => handleProgress(index, playedSeconds)}
                  onDuration={(duration) => handleDuration(index, duration)}
                  className="absolute inset-0"
                  config={{ file: { attributes: { style: { objectFit: 'cover' }, playsInline: true }}}}
                />

                <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/90 to-transparent">
                  <div className="mb-2 relative">
                    <input
                      type="range"
                      min={0}
                      max={state.duration || 1}
                      value={state.progress}
                      onChange={(e) => handleSeek(index, parseFloat(e.target.value))}
                      onMouseDown={() => handleSeekMouseDown(index)}
                      onMouseUp={(e) => handleSeekMouseUp(index, parseFloat(e.target.value))}
                      className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer seek-bar"
                      style={{
                        background: `linear-gradient(to right, #f97316 ${progressPercentage}%, #374151 ${progressPercentage}%)`
                      }}
                    />
                  </div>

                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-4">
                      <button
                        onClick={() => handlePlayPause(index)}
                        className="text-white hover:text-orange-500 p-2 transition-colors"
                        aria-label={state.playing ? "Pause" : "Play"}
                      >
                        {state.playing ? (
                          <FaPause className="w-5 h-5" />
                        ) : (
                          <FaPlay className="w-5 h-5" />
                        )}
                      </button>
                      <div className="flex items-center gap-2 text-white text-sm">
                        <FiClock className="w-4 h-4" />
                        <span>
                          {formatTime(state.progress)} / {formatTime(state.duration)}
                        </span>
                      </div>
                    </div>

                    <button
                      onClick={() => handleSpeedChange(index)}
                      className="flex items-center gap-2 text-white text-sm bg-black/50 rounded px-3 py-1 hover:bg-black/70 transition-colors"
                      aria-label="Change playback speed"
                    >
                      <FiSettings className="w-4 h-4" />
                      <span>{state.playbackRate}x</span>
                    </button>
                  </div>
                </div>

                <div className="absolute bottom-20 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent">
                  <h3 className="text-white text-lg font-semibold">
                    {product.title}
                  </h3>
                </div>
              </div>

              <Link href={product.link} className="block w-full mt-4">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-full bg-orange-500 hover:bg-orange-600 text-white font-medium py-3 px-6 rounded-lg flex items-center justify-center gap-2 transition-colors"
                >
                  View Full Project <FaArrowRight className="w-4 h-4" />
                </motion.button>
              </Link>
            </motion.div>
          );
        })}
      </div>

      <style jsx global>{`
        .seek-bar::-webkit-slider-thumb {
          -webkit-appearance: none;
          width: 16px;
          height: 16px;
          background: #f97316;
          border-radius: 50%;
          cursor: pointer;
          transition: transform 0.2s;
        }

        .seek-bar::-webkit-slider-thumb:hover {
          transform: scale(1.2);
        }

        .seek-bar::-moz-range-thumb {
          width: 16px;
          height: 16px;
          background: #f97316;
          border-radius: 50%;
          cursor: pointer;
          transition: transform 0.2s;
        }

        .seek-bar::-moz-range-thumb:hover {
          transform: scale(1.2);
        }
      `}</style>
    </div>
  );
};