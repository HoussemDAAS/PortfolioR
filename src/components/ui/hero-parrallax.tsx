"use client";
import { useState, useRef, useCallback, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import dynamic from "next/dynamic";
import { FaPlay, FaPause, FaArrowRight } from "react-icons/fa";
import { FiClock, FiSettings } from "react-icons/fi";

const ReactPlayer = dynamic(() => import("react-player/lazy"), { ssr: false });

interface SanityAsset {
  _id: string;
  url: string;
}

interface Product {
  _id: string;
  title: string;
  link: string;
  thumbnail: {
    asset: SanityAsset;
  };
  imageThumbnail?: {
    asset: SanityAsset;
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
  isPlayingFromHover: boolean;
}

export const HeroParallax = ({ products }: HeroParallaxProps) => {
  const [playerStates, setPlayerStates] = useState<PlayerState[]>(
    products.map(() => ({
      playing: false,
      playbackRate: 1,
      progress: 0,
      duration: 0,
      isSeeking: false,
      isPlayingFromHover: false,
    }))
  );
  const [hasInteracted, setHasInteracted] = useState(false);
  const players = useRef<(ReactPlayer | null)[]>([]);
  const audioContextRef = useRef<AudioContext | null>(null);

  // Initialize audio context and attempt auto-play
  useEffect(() => {
    const enableAudio = async () => {
      try {
        // Create silent audio buffer
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        const buffer = audioContext.createBuffer(1, 1, 22050);
        const source = audioContext.createBufferSource();
        source.buffer = buffer;
        source.connect(audioContext.destination);
        source.start();
        
        // Set interaction flag if audio plays successfully
        setHasInteracted(true);
        audioContextRef.current = audioContext;
      } catch (error) {
        console.log("Auto-play with sound failed, waiting for user interaction");
      }
    };

    enableAudio();

    return () => {
      audioContextRef.current?.close();
    };
  }, []);

  const handleHoverPlay = useCallback((index: number) => {
    setPlayerStates(prev => prev.map((state, i) => {
      if (i !== index || state.playing) return state;
      return {
        ...state,
        playing: true,
        isPlayingFromHover: true
      };
    }));
  }, []);

  const handleHoverPause = useCallback((index: number) => {
    setPlayerStates(prev => prev.map((state, i) => {
      if (i !== index || !state.isPlayingFromHover) return state;
      return {
        ...state,
        playing: false,
        isPlayingFromHover: false
      };
    }));
  }, []);

  const handlePlayPause = useCallback((index: number) => {
    setPlayerStates(prev => prev.map((state, i) => 
      i === index ? { 
        ...state, 
        playing: !state.playing,
        isPlayingFromHover: false
      } : state
    ));
    setHasInteracted(true);
  }, []);

  const handleSpeedChange = useCallback((index: number) => {
    const rates = [0.5, 1, 1.5, 2];
    setPlayerStates(prev => prev.map((state, i) => {
      if (i !== index) return state;
      const currentIndex = rates.indexOf(state.playbackRate);
      return { ...state, playbackRate: rates[(currentIndex + 1) % rates.length] };
    }));
  }, []);

  const handleProgress = useCallback((index: number, playedSeconds: number) => {
    if (!playerStates[index].isSeeking) {
      setPlayerStates(prev => prev.map((state, i) => 
        i === index ? { ...state, progress: playedSeconds } : state
      ));
    }
  }, [playerStates]);

  const handleDuration = useCallback((index: number, duration: number) => {
    setPlayerStates(prev => prev.map((state, i) => 
      i === index ? { ...state, duration } : state
    ));
  }, []);

  const handleSeek = useCallback((index: number, seconds: number) => {
    players.current[index]?.seekTo(seconds, "seconds");
    setPlayerStates(prev => prev.map((state, i) => 
      i === index ? { ...state, progress: seconds } : state
    ));
  }, []);

  const handleSeekMouseDown = useCallback((index: number) => {
    setPlayerStates(prev => prev.map((state, i) => 
      i === index ? { ...state, isSeeking: true } : state
    ));
  }, []);

  const handleSeekMouseUp = useCallback((index: number, seconds: number) => {
    handleSeek(index, seconds);
    setPlayerStates(prev => prev.map((state, i) => 
      i === index ? { ...state, isSeeking: false } : state
    ));
  }, [handleSeek]);

  const formatTime = useCallback((seconds: number) => {
    const date = new Date(seconds * 1000);
    const isoString = date.toISOString();
    return seconds >= 3600 
      ? isoString.substring(11, 19)
      : isoString.substring(14, 19);
  }, []);

  return (
    <div id="projects" className="w-full relative bg-black-100 min-h-screen">
      {/* Audio Permission Overlay */}
      {!hasInteracted && (
        <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="text-center p-8 max-w-2xl"
          >
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8">
              <h2 className="text-2xl font-bold text-orange-500 mb-4">
                Enable Audio Experience
              </h2>
              <p className="text-gray-300 mb-6">
                Click the button below to enable audio playback for immersive video experiences.
              </p>
              <button
                onClick={() => setHasInteracted(true)}
                className="bg-orange-500 hover:bg-orange-600 text-white font-medium py-3 px-8 rounded-lg transition-colors"
              >
                Enable Sound
              </button>
            </div>
          </motion.div>
        </div>
      )}

      <section className="relative pt-20 pb-8 px-4 md:pb-12 md:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-3xl md:text-5xl font-bold text-orange-500 mb-4"
          >
            Featured Projects
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-base md:text-lg text-gray-600 max-w-3xl mx-auto"
          >
            A collection of my best work — blending storytelling, cinematography, and VFX to create unforgettable visuals.
          </motion.p>
        </div>
      </section>

      <div className="flex snap-x snap-mandatory overflow-x-auto scrollbar-hide space-x-4 px-6 md:grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 md:gap-4 max-w-7xl mx-auto pb-24">        {products.map((product, index) => {
          const state = playerStates[index];
          const progressPercentage = (state.progress / (state.duration || 1)) * 100;
          const showCover = product.imageThumbnail?.asset?.url && 
                          (!hasInteracted || !state.playing);

          return (
            <motion.div
            key={product._id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "0px 0px -100px 0px" }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              
              className="flex-shrink-0 w-[85vw] snap-center md:w-full relative group overflow-hidden rounded-2xl shadow-xl bg-black"              whileHover={{ scale: 1.03 }}
              onMouseEnter={() => handleHoverPlay(index)}
              onMouseLeave={() => handleHoverPause(index)}
            >
  <div className="relative w-full aspect-[9/16]">
                {showCover && (
                  <img
                    src={product.imageThumbnail?.asset.url}
                    alt={product.title}
                    className="absolute inset-0 w-full h-full object-cover z-20 transition-opacity duration-300 pointer-events-none"
                    style={{ opacity: state.playing ? 0 : 1 }}
                  />
                )}

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
                  onProgress={({ playedSeconds }) => handleProgress(index, playedSeconds)}
                  onDuration={(duration) => handleDuration(index, duration)}
                  className="absolute inset-0 z-10"
                  config={{ 
                    file: { 
                      attributes: { 
                        playsInline: true,
                        style: { objectFit: 'cover' }
                      } 
                    } 
                  }}
                />

                <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/90 to-transparent z-40">
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

                <div className="absolute bottom-20 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent z-30">
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