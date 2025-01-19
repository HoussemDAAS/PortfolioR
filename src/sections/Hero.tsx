"use client";
import { FC, useEffect, useRef } from "react";


import Image from "next/image";
import Button from "@/components/Button";
import GlitchText from "@/components/GlitchText/GlitchText";
import SplitType from "split-type";
import { useAnimate,motion, stagger, useScroll, useTransform } from "framer-motion";
import { urlFor } from "@/sanity/imageUrl";

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

const  Hero: FC<{ heroData: HeroData }> = ({ heroData }) =>  {
 const [titleScope,titleAnimate] = useAnimate();
 const scrollingDiv=useRef<HTMLDivElement>(null);
 const { scrollYProgress }=useScroll({
target:scrollingDiv,
offset:["start end","end end"],
 });

 const portraitWidth=useTransform(scrollYProgress,[0,1],['100%','240%']);
 
 useEffect(() => {
  new SplitType(titleScope.current, {
    types:'lines,words',
    tagName:'span',
  });
  titleAnimate(titleScope.current.querySelectorAll('.word'),{
    transform :'translateY(0)',
  },{
    duration :0.5,
    delay: stagger(0.2)
  },)
 }, [ titleScope,titleAnimate]);
  return (
    <section>
      <div className="grid md:grid-cols-12 md:h-screen items-stretch sticky top-0" >
<div className="md:col-span-7 flex flex-col justify-center bg-cover bg-center pb-10 md:pb-0"
>
<div className="container !max-w-full">
        <motion.h1 className="text-5xl mt-[6rem] text-black-900 uppercase md:text-6xl font-robert-medium lg:text-7xl"
        initial={{opacity :0}}
        animate={{opacity :1}}
    
        ref={titleScope}>{heroData.title}</motion.h1>
      <div className="flex flex-col mt-10 items-start gap-6 md:mt-10 md:flex-row md:items-center">
       <motion.div 
       initial={{opacity :0,y:'100%'}}
       animate ={{opacity:1,y:0}}
       transition={{duration:0.5,delay:1.75}}
       >
        
       <Button variant={"secondary"} iconAfter={
      <div className="overflow-hidden size-5">
        <div className="h-5 w-10 flex group-hover/button:-translate-x-1/2 transition-transform duration-500">
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
          </div>
        }>
          <span> View My Work</span>
          
        </Button>
       </motion.div>
   <motion.div
    initial={{opacity :0,y:'100%'}}
    animate ={{opacity:1,y:0}}
    transition={{duration:0.5,delay:2.2}}>
        <Button variant={"text"}> <GlitchText text="Let&apos;s Talk" /></Button>

   </motion.div>
      </div>
      </div>
</div>
<div className="md:col-span-5 relative">
        <motion.div
          className="mt-0 md:size-full md:absolute md:right-0 max-md:!w-full"
          style={{ width: portraitWidth }}
        >
          <div className="relative w-full h-[500px] md:h-full"> {/* Ensure the parent container has a defined height */}
            <Image
              src={urlFor(heroData.backgroundImage).url()}
              alt="Rayen El maamoun"
              layout="fill"
              objectFit="cover"
              className="size-full"
            />
          </div>
        </motion.div>
      </div>
      </div>
      <div className="md:h-[200vh]" ref={scrollingDiv}></div>

      
    </section>
  );
};

export default Hero;
