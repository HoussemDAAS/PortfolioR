"use client";
import Word from "@/components/TextReveal/Word";
import { FC } from "react";

interface IntroData {
  text: string;
}

const Intro: FC<{ introData: IntroData }> = ({ introData }) => {
  return (
    <section className="max-h-[400px]" id="about">
      <Word value={introData.text} />
    </section>
  );
};

export default Intro;