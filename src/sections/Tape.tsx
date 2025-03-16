/* eslint-disable @next/next/no-img-element */

"use client";
import React, { Fragment } from "react";
import Image from "next/image";
import drone from "@/assets/icons/drone.png";

interface TapeData {
  word: string;
}

interface TapeProps {
  tapeData: TapeData[];
}

const Tape: React.FC<TapeProps> = ({ tapeData }) => {
  return (
    <div className=" md:py-18  overflow-x-clip">
      <div className="bg-gradient-to-r from-orange-500 to-orange-300 overflow-x-clip -rotate-3 -mx-1">
        <div className="flex [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
          <div className="flex flex-none gap-4 py-3 pr-4 -translate-x-1/2 animate-move-left [animation-duration:90s] md:[animation-duration:60s] hover:[animation-play-state:paused]">
            {[...new Array(2)].fill(0).map((_, index) => (
              <Fragment key={index}>
                {tapeData.map((item, index) => (
                  <div key={index} className="inline-flex gap-4 items-center">
                    <span className="text-black-900 uppercase font-extrabold text-sm">{item.word}</span>
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