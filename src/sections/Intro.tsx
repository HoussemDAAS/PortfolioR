"use client";
import Word from "@/components/TextReveal/Word";
import { FC } from "react";

interface IntroData {
  text: string;
}

const Intro: FC<{ introData: IntroData }> = ({ introData }) => {
  return (
    <section className="max-h-[400px] mt-40 md:mt-20 mb-10">
      <Word value={introData.text} />
    </section>
  );
};

export default Intro;