"use client";
import { FC, useRef } from "react";
import Image from "next/image";
import Button from "@/components/Button";
import GlitchText from "@/components/GlitchText/GlitchText";
import { urlFor } from "@/sanity/imageUrl";
import Link from "next/link";

interface HeroData {
  backgroundImage: {
    asset: {
      _ref: string;
      metadata: {
        dimensions: {
          width: number;
          height: number;
        };
      };
    };
  };
  title: string;
}

const Hero: FC<{ heroData: HeroData }> = ({ heroData }) => {
  return (
    <section>
      <div className="grid md:grid-cols-12 md:h-screen items-stretch sticky top-0">
        <div className="md:col-span-7 flex flex-col justify-center bg-cover bg-center pb-10 md:pb-0">
          <div className="container !max-w-full">
            <h1 className="text-5xl mt-[6rem] text-black-900 uppercase md:text-6xl font-robert-medium lg:text-7xl">
              {heroData.title}
            </h1>
            <div className="flex flex-col mt-10 items-start gap-6 md:mt-10 md:flex-row md:items-center">
              <div>
                <Button
                  variant={"secondary"}
                  iconAfter={
                    <div className="size-5">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        className="size-5"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="m4.5 5.25 7.5 7.5 7.5-7.5m-15 6 7.5 7.5 7.5-7.5"
                        />
                      </svg>
                    </div>
                  }
                >
                  <Link href="#projects">View My Work</Link>
                </Button>
              </div>
              <div>
                <Button variant={"text"}>
                  <Link href="#contact">
                  <GlitchText text="Let&apos;s Talk" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
        <div className="md:col-span-5 relative">
          <div className="mt-0 md:size-full md:absolute md:right-0 max-md:!w-full">
            <div className="relative w-full h-[500px] md:h-full">
              <Image
                src={urlFor(heroData.backgroundImage).url()}
                alt="Rayen El maamoun"
                fill
                style={{ objectFit: 'cover' }}
                className="size-full"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;