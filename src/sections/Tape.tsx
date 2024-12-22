/* eslint-disable @next/next/no-img-element */

import React, { Fragment } from "react";
import drone from "@/assets/icons/drone.png";
import Image from "next/image";
const Tape = () => {
    const words = [
        "Cinematic",
        "Creative",
        "Dynamic",
        "Engaging",
        "Immersive",
        "Aerial",
        "Storytelling",
        "Innovative",
        "Versatile",
        "Cutting-edge",
        "Visual",
        "Striking",
        "Compelling",
        "Expressive",
        "Precision",
        "Fluid",
        "Breathtaking",
        "Artistic",
        "Seamless",
        "Epic",
      ];
      

  return (
    <div className="py-16 overflow-x-clip">
      <div className="bg-gradient-to-r from-orange-500 to-orange-300 overflow-x-clip -rotate-3 -mx-1">
        <div className="flex [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
        <div className="flex flex-none gap-4 py-3  pr-4 -translate-x-1/2 animate-move-left [animation-duration:90s] md:[animation-duration:60s] hover:[animation-play-state:paused]"

        >
            {[...new Array(2)].fill(0).map((_, index) => (
                <Fragment key={index}>
  {words.map((word, index) => (
    <div key={index} className="inline-flex gap-4 items-center">
      <span className="text-black-900 uppercase font-extrabold text-sm">{word}</span>
      <Image
        src={drone.src}
        alt="drone"
        className="size-6 object-contain"
        width={160}
        height={160}
      />
    </div>
  ))}
    </Fragment>
            ))}
        
        </div>
        </div>
        
      </div>
    </div>
  );
};

export default Tape;
