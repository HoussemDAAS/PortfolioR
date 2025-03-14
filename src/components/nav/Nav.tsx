import React from 'react'
import styles from './Nav.module.scss'
import {links,footerLinks } from './data'
import Link from 'next/link'
import {motion} from 'framer-motion'
const perspective = {

  initial: {

      opacity: 0,

      rotateX: 90,

      translateY: 80,

      translateX: -20,

  },

  enter: (i: number) => ({

      opacity: 1,

      rotateX: 0,

      translateY: 0,

      translateX: 0,

      transition: {

          duration: 0.65, 

          delay: 0.5+ (i * 0.1), 

          ease: [.215,.61,.355,1],

          opacity: { duration: 0.35}

      }

  }),

  exit: {

      opacity: 0,

      transition: { duration: 0.5, type: "linear", ease: [0.76, 0, 0.24, 1]}

  }

}
export const slideIn = {

  initial: {

      opacity: 0,

      y: 20

  },

  enter: (i: number) => ({

      opacity: 1,

      y: 0,

      transition: { 

          duration: 0.5,

          delay: 0.75 + (i * 0.1), 

          ease: [.215,.61,.355,1]

      }

  }),

  exit: {

      opacity: 0,

      transition: { duration: 0.5, type: "tween", ease: "easeInOut"}

  }

}
 const Nav = ({ setIsActive }: { setIsActive: (value: boolean) => void })  => {
  return (
    <div className={styles.nav}>
      <div className={styles.body}>
{
  links.map((link, i) => {
    return  <div key={i} className={styles.linkContainer}>
<motion.div
     
     custom={i}
     variants={perspective}
      initial="initial"
      animate="enter"
      exit="exit"
     >
         <Link 
                href={link.href} 
                onClick={() => setIsActive(false)} // Add onClick handler
 
              >{link.title}</Link>
    </motion.div>

    </div> 
  })
}
      </div>
      <motion.div className={styles.footer}>

            {

                footerLinks.map( (link, i) => {

                    const { title, href } = link;

                    return (

                        <motion.a 
                              href={href}
                            variants={slideIn}

                            custom={i} 

                            initial="initial"

                            animate="enter"

                            exit="exit"

                            key={`f_${i}`}
 onClick={() => setIsActive(false)}
                        >

                            {title}

                        </motion.a>

                    )

                })

            }

       </motion.div>
    </div>
  )
}

export default Nav
