import { FC } from "react";
/* eslint-disable-next-line @typescript-eslint/no-unused-vars */
import heroImage from "@/assets/images/rayen.jpg";
import Image from "next/image";
import Button from "@/components/Button";
import GlitchText from "@/components/GlitchText/GlitchText";

const Hero: FC = () => {
  return (
    <section>
      <div className="grid md:grid-cols-12 md:h-screen items-stretch"  >
<div className="md:col-span-7 flex flex-col justify-center bg-cover bg-center pb-10 md:pb-0"
//  style={{
//   backgroundImage: "url('/bgOrnge.jpg')",
// }}
>
<div className="container !max-w-full">
        <h1 className="text-5xl mt-[6rem] text-black-900 uppercase md:text-6xl font-robert-medium lg:text-7xl">Crafting Visual Stories with Stunning VFX & Filmmaking</h1>
      <div className="flex flex-col mt-10 items-start gap-6 md:mt-10 md:flex-row md:items-center">
      <Button variant={"secondary"} iconAfter={<svg
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
          </svg>}>
          <span> View My Work</span>
          
        </Button>
        <Button variant={"text"}> <GlitchText text="Let&apos;s Talk" /></Button>
      </div>
      </div>
</div>
<div className="md:col-span-5">
<div className="mt-0 md:h-full">
        <Image src={heroImage} alt="Rayen El maamoun"  className="size-full object-cover"/>
      </div>
</div>
      </div>

      
    </section>
  );
};

export default Hero;
