"use client";
import Button from "@/components/Button";
import { motion, stagger, useAnimate, useInView } from "framer-motion";

import { FC, useEffect, useRef } from "react";
import SplitType from "split-type";

const Footer: FC = () => {
  const [titleScope, titleAnimate] = useAnimate();
  const footerRef = useRef(null);
  const isInView = useInView(footerRef, { once: true });

  useEffect(() => {
    if (isInView) {
      new SplitType(titleScope.current, {
        types: "lines,words",
        tagName: "span",
      });
      titleAnimate(
        titleScope.current.querySelectorAll(".word"),
        {
          transform: "translateY(0)",
        },
        {
          duration: 0.5,
          delay: stagger(0.2),
        }
      );
    }
  }, [isInView, titleScope, titleAnimate]);

  const navItems = [
    {
      href: "#",
      label: "Home",
    },
    {
      href: "#about",
      label: "About",
    },
    {
      href: "#projects",
      label: "Projects",
    },
    {
      href: "#Testimonials",
      label: "Testimonials",
    },
  
    {
      href: "#contact",
      label: "Contact",
    },
  ];

  return (
    <footer className="bg-stone-900 text-white" ref={footerRef}>
      <div className="container pt-10">
        <div className="section">
          <div className="flex items-center gap-3">
            <div className="size-3 rounded-full bg-orange-400 animate-pulse"></div>
            <span className="uppercase text-white/80">
              One spot available for next month
            </span>
          </div>
          <div className="grid md:grid-cols-3 md:items-center">
            <div className="md:col-span-2">
              <motion.h2
                className="text-4xl mt-8 font-extralight text-white md:text-7xl lg:text-8xl"
                initial={{ opacity: 0 }}
                animate={{ opacity: isInView ? 1 : 0 }}
                ref={titleScope}
              >
                Enough talk. Let&apos;s make something great together.
              </motion.h2>
              <a href="mailto:rayen.maamoun@gmail.com">
                <Button
                  variant="secondary"
                  className="mt-8 text-white"
                  iconAfter={
                  <div className="size-6 overflow-hidden">
                    <div className="w-12 h-6 flex group-hover/button:-translate-x-1/2 transition-transform duration-300">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        className="size-6"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="m4.5 19.5 15-15m0 0H8.25m11.25 0v11.25"
                        />
                      </svg>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        className="size-6"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="m4.5 19.5 15-15m0 0H8.25m11.25 0v11.25"
                        />
                      </svg>
                    </div>
                  </div>
                }
              >
                Rayen.maamoun@gmail.com
                </Button>
              </a>
            </div>
            <div className="md:col-span-1">
              <nav className="flex flex-col gap-8 mt-16 md:items-end md:mt-0">
                {navItems.map(({ href, label }) => (
                  <a href={href} key={label}>
                    <Button variant={"text"} className="text-lg text-white/80">
                      {label}
                    </Button>
                  </a>
                ))}
              </nav>
            </div>
          </div>
        </div>
        <p className="py-16 text-white/30 text-sm">
          Copyright &copy;{" "}
          <Button variant={"text"} className="text-sm text-white/40">
            {" "}
            Daas Houssem{" "}
          </Button>
          &bull; All rights reserved
        </p>
      </div>
    </footer>
  );
};

export default Footer;
