"use client";
import { motion, useScroll, useTransform } from "framer-motion";
import { useState, useRef, useEffect } from "react";
import Image from "next/image";

type GridImage = {
  src: string;
  title: string;
  role: string;
  alt: string;
};

const PerspectiveGrid = ({ images }: { images: GridImage[] }) => {
  const ref = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(-1);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const [itemDimensions, setItemDimensions] = useState({ width: 0, height: 0 });
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  useEffect(() => {
    const updateDimensions = () => {
      if (gridRef.current) {
        const gridRect = gridRef.current.getBoundingClientRect();
        const item = gridRef.current.children[0] as HTMLElement;
        const itemRect = item?.getBoundingClientRect();
        
        setDimensions({
          width: gridRect.width,
          height: gridRect.height
        });
        
        if (itemRect) {
          setItemDimensions({
            width: itemRect.width,
            height: itemRect.height
          });
        }
      }
    };

    updateDimensions();
    window.addEventListener('resize', updateDimensions);
    return () => window.removeEventListener('resize', updateDimensions);
  }, []);

  const rotateX = useTransform(scrollYProgress, [0, 1], [-15, 15]);
  const y = useTransform(scrollYProgress, [0, 1], ["-30%", "30%"]);

  const calculateConnectionPath = (index: number) => {
    if (!gridRef.current || itemDimensions.width === 0) return '';
    
    const positions = [
      // Top-left position
      { x: itemDimensions.width / 2, y: itemDimensions.height / 2 },
      // Top-right position
      { x: dimensions.width - itemDimensions.width / 2, y: itemDimensions.height / 2 },
      // Bottom-left position
      { x: itemDimensions.width / 2, y: dimensions.height - itemDimensions.height / 2 },
      // Bottom-right position
      { x: dimensions.width - itemDimensions.width / 2, y: dimensions.height - itemDimensions.height / 2 }
    ];

    const center = {
      x: dimensions.width / 2,
      y: dimensions.height / 2
    };

    return `M ${positions[index].x} ${positions[index].y} Q ${center.x} ${center.y}, ${dimensions.width - positions[index].x} ${dimensions.height - positions[index].y}`;
  };

  return (
    <div ref={ref} className="relative h-[300vh] py-20 overflow-hidden">
      <div className="sticky top-0 h-screen flex items-center justify-center perspective-1000px">
        <motion.div 
          ref={gridRef}
          className="grid grid-cols-2 grid-rows-2 gap-8 w-[90vw] h-[70vh] md:w-[70vw]"
          style={{ rotateX, y }}
        >
          {images.map((img, index) => (
            <motion.div
              key={index}
              className="relative overflow-hidden cursor-pointer rounded-2xl"
              onHoverStart={() => setActiveIndex(index)}
              onHoverEnd={() => setActiveIndex(-1)}
              whileHover={{ zIndex: 10 }}
            >
              <div className="absolute inset-0 overflow-hidden">
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  sizes="(max-width: 768px) 50vw, 33vw"
                  className="object-cover scale-110 hover:scale-100 transition-transform duration-[1200ms] ease-[cubic-bezier(0.23,1,0.32,1)]"
                />
              </div>
              
              <div className="absolute inset-0 border-2 border-orange-500/30 hover:border-orange-500/80 transition-colors duration-500 rounded-2xl" />
            </motion.div>
          ))}
        </motion.div>

        {/* Stabilized connection lines */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none">
          {activeIndex > -1 && itemDimensions.width > 0 && (
            <motion.path
              d={calculateConnectionPath(activeIndex)}
              stroke="#ff7518"
              strokeWidth="2"
              fill="none"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 1.5, ease: "anticipate" }}
            />
          )}
        </svg>
      </div>
    </div>
  );
};

export default PerspectiveGrid;