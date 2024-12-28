
import Word from "@/components/TextReveal/Word";
import { FC } from "react";


const Intro: FC = () => {

const words="I turn imagination into reality. As a skilled VFX artist and video editor, I specialize in creating visuals that captivate and elevate your story to new heights.";
  return (
    // py-24 mt-12 md:py-32 md:mt-16 lg:py-40 lg:mt-20
    <section className="max-h-[400px] mt-40 md:mt-20 mb-10">
     

<Word value={words} />
    </section>
  );
};

export default Intro;
