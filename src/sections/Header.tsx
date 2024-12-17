"use client";
import NavButton from "@/components/NavButton/NavButton";
import Link from "next/link";
import { FC, useState } from "react";
import styles from "./Header.module.scss";
import {motion} from "framer-motion";
/* eslint-disable-next-line @typescript-eslint/no-unused-vars */
const navItems = [
  {
    label: "About",
    href: "#intro",
  },
  {
    label: "Selected Works",
    href: "#projects",
  },
  {
    label: "Testimonials",
    href: "#testimonials",
  },
  {
    label: "FAQs",
    href: "#faqs",
  },
  {
    label: "Contact",
    href: "#contact",
  },
];
const menu = {

  open: {

      width: "480px",

      height: "650px",

      top: "-25px",

      right: "-25px",

      transition: { duration: 0.75, type: "tween", ease: [0.76, 0, 0.24, 1]}
      

  },

  closed: {

      width: "100px",

      height: "40px",

      top: "0px",

      right: "0px",

      transition: { duration: 0.75, delay: 0.35, type: "tween", ease: [0.76, 0, 0.24, 1]}

  }

}

const Header: FC = () => {
  const [isActive, setIsActive] = useState(false);
  return (
    <header className="fixed top-0 left-0 w-full backdrop-blur-md">
      <div className="container !max-w-full">
        <div className="flex justify-between h-20 items-center">
          <div>
            <Link href="/">
              <span className="text-xl font-bold uppercase text-black-950">
                Rayen&nbsp; El&nbsp; maamoun
              </span>
            </Link>
          </div>
          <div className=" flex justify-center  items-center mb-9">
            <div className={styles.header}>
              <motion.div className={styles.menu}
                variants={menu}

                animate={isActive ? "open" : "closed"}

                initial="closed"
              ></motion.div>
              <NavButton isActive={isActive} setIsActive={setIsActive} />
            </div>

    
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
