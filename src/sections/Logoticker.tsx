"use client";
import React, { Fragment } from "react";
import { urlFor } from "@/sanity/imageUrl";
import Image from "next/image";
import { motion } from "framer-motion";

interface Logo {
  name: string;
  image: {
    asset: {
      _ref: string;
    };
  };
}
interface LogoTickerProps {
  logos: Logo[];
}
const LogoTicker: React.FC<LogoTickerProps> = ({ logos }) => {
  return (
    <section className="pt-[60px] md:py-[60px] overflow-x-clip">
      <div className="container">
        <h3 className="text-center text-orange-500 uppercase font-semibold tracking-widest text-xl">
          Already trusted by these companies
        </h3>
        <div className="flex my-4 overflow-hidden mt-12 [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
          <motion.div
            animate={{
              x: "-50%",
            }}
            transition={{
              repeat: Infinity,
              duration: 30,
              ease: "linear",
            }}
            className="flex flex-none gap-24 pr-24 bg-black-600 py-4 items-center justify-center"
          >
            {Array.from({ length: 2 }).map((_, i) => (
              <Fragment key={i}>
                {logos.map((logo, index) => (
                  <div
                    key={`${i}-${index}`}
                    className="hover:filter-orange transition duration-300"
                  >
                    <Image
                        src={urlFor(logo.image).url()}
                        alt={logo.name}
                        width={120} // Adjust width as needed
                        height={30} // Adjust height as needed
                        className="w-30 h-auto mx-auto"
                    />
                  </div>
                ))}
              </Fragment>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default LogoTicker;
