import { FC, Fragment } from "react";

import memojiAvatar1 from "@/assets/images/memoji-avatar-1.png";
import memojiAvatar2 from "@/assets/images/memoji-avatar-2.png";
import memojiAvatar3 from "@/assets/images/memoji-avatar-3.png";
import memojiAvatar4 from "@/assets/images/memoji-avatar-4.png";
import memojiAvatar5 from "@/assets/images/memoji-avatar-5.png";
import Image from "next/image";
/* eslint-disable-next-line @typescript-eslint/no-unused-vars */
import Grain from "@/assets/images/grain.jpg";

const testimonials = [
  {
    name: "Alex Turner",
    position: "Marketing Manager @ TechStartups",
    text: "Alex was instrumental in transforming our website into a powerful marketing tool. His attention to detail and ability to understand our brand is exceptional. We're thrilled with the results!",
    avatar: memojiAvatar1,
  },
  {
    name: "Olivia Green",
    position: "Head of Design @ GreenLeaf",
    text: "Working with Alex was a pleasure. His expertise in frontend development brought our designs to life in a way we never imagined. The website has exceeded our expectations.",
    avatar: memojiAvatar2,
  },
  {
    name: "Daniel White",
    position: "CEO @ InnovateCo",
    text: "Alex's ability to create seamless user experiences is unmatched. Our website has seen a significant increase in conversions since launching the new design. We couldn't be happier.",
    avatar: memojiAvatar3,
  },
  {
    name: "Emily Carter",
    position: "Product Manager @ GlobalTech",
    text: "Alex is a true frontend wizard. He took our complex product and transformed it into an intuitive and engaging user interface. We're already seeing positive feedback from our customers.",
    avatar: memojiAvatar4,
  },
  {
    name: "Michael Brown",
    position: "Director of IT @ MegaCorp",
    text: "Alex's work on our website has been nothing short of exceptional. He's a talented developer who is also a great communicator. We highly recommend him.",
    avatar: memojiAvatar5,
  },
];

const Testimonials: FC = () => {
  return (
    <div className="py-16 lg:py-24">
      <div className="container">
        <div className="flex justify-center">
          <p className="uppercase font-semibold tracking-widest ">
            Happy Clients
          </p>
        </div>

        <h2>What Clients say about Me</h2>
        <p>Trusted by Creators, Directors, and Visionaries</p>
        <div className="mt-12  lg:mt-20 flex overflow-x-clip py-4 -my-4 [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
          <div className="flex flex-none gap-8 animate-move-left [animation-duration:90s] md:[animation-duration:60s] hover:[animation-play-state:paused]">
            {[...new Array(2)].fill(0).map((_, index) => (
              <Fragment key={index}>
  {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="
        bg-orange-400 relative -z-10 rounded-3xl p-6 overflow-hidden
         after:z-10 after:content-[''] after:absolute after::inset-0
          after::outline-2 after:outline after:-outline-offset-2 
          after:rounded-3xl after:outline-black-500 
          after:pointer-events-none max-w-xs md:p-8 md:max-w-md hover:-rotate-3 transition duration-300"
            >
              <div
                className="absolute inset-0 opacity-5 -z-10"
                style={{
                  backgroundImage: `url(${Grain.src})`,
                }}
              ></div>
              <div className="flex gap-4 items-center ">
                <div className="size-14 bg-orange-200 inline-flex items-center justify-center rounded-full flex-shrink-0">
                  <Image src={testimonial.avatar} alt={testimonial.name} className="max-h-full"/>
                </div>
                <div className="">
                  <div className="font-semibold text-black-900">{testimonial.name}</div>
                  <div className="text-sm text-black-600">{testimonial.position}</div>
                </div>
              </div>

              <p className="mt-4 md:mt-6 text-sm text-black-800 md:text-base">{testimonial.text}</p>
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

export default Testimonials;
