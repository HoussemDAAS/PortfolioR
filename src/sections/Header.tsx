"use client";
import NavButton from "@/components/NavButton/NavButton";
import Link from "next/link";
import { FC, useEffect, useState } from "react";
import styles from "./Header.module.scss";
import {AnimatePresence, motion} from "framer-motion";
import Nav from "@/components/nav/Nav";



const Header: FC = () => {
  const [isMobile, setIsMobile] = useState(false);

useEffect(() => {
  const handleResize = () => setIsMobile(window.innerWidth <= 768);
  window.addEventListener("resize", handleResize);
  handleResize(); // Check initial size
  return () => window.removeEventListener("resize", handleResize);
}, []);
const menu = {
  open: {
    width: isMobile ? "786px" :  "480px",
    height: isMobile ?"1000px" :"550px",
    top: isMobile ? "-27px" : '-10px',
    right:  isMobile ? "-25px" : '-25px',
    transition: { duration: 0.75, type: "tween", ease: [0.76, 0, 0.24, 1] },
  },
  closed: {
    width: "100px",
    height: "40px",
    top: "0px",
    right: "0px",
    transition: { duration: 0.75, delay: 0.35, type: "tween", ease: [0.76, 0, 0.24, 1] },
  },
};
  const [isActive, setIsActive] = useState(false);
  return (
    <header className="fixed top-0 left-0 w-full backdrop-blur-md z-50 ">
      <div className="container !max-w-full">
        <div className="flex justify-between h-20 items-center">
          <div>
            <Link href="/">
              <span className="text-xl font-bold uppercase text-black-950 md:text-lg">
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
              >
                <AnimatePresence>

                {isActive && <Nav/>}
                </AnimatePresence>
              </motion.div>
              <NavButton isActive={isActive} setIsActive={setIsActive} />
            </div>

    
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
