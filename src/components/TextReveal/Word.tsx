"use client";
import React, { useRef } from 'react'
import styles from './Text.module.scss'
import { useScroll, motion, useTransform } from "framer-motion";


interface ParagraphProps {
  value: string;
}

const Word: React.FC<ParagraphProps> = ({ value }) => {
    const element = useRef(null);

  // Track scroll progress
  const { scrollYProgress } = useScroll({
    target: element,
    offset: ['start 0.9', 'start 0.25'], // Adjust offsets as needed
  });
  const words=value.split(" ");
  return (
  <p className={styles.paragraph} ref={element}>
    {words.map((word, index) => {
         const start = index / words.length;
         const end= start + (1/words.length);
 return      <Wo key={index} range={[start, end]} progress={scrollYProgress}>{word}</Wo>
})}
  </p>
  )
}

export default Word


// eslint-disable-next-line @typescript-eslint/no-explicit-any
const  Wo =({children, range, progress}: {children: React.ReactNode, range: number[], progress: any}) =>{
    const opacity =useTransform(progress,range,[0,1]);
    return(
        <span className={styles.word}>
            <span className={styles.shadow}>
                  {children}
            </span>
            <motion.span
        style={{opacity}}>{children}</motion.span>
        </span>
        
    )
}