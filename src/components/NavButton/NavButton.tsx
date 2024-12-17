import React from "react";
import styles from "./NavButton.module.scss";
import { motion } from "framer-motion";

interface NavButtonProps {
  isActive: boolean;
  setIsActive: (isActive: boolean) => void;
}
const NavButton: React.FC<NavButtonProps> = ({ isActive, setIsActive }) => {
  return (
    <div
      onClick={() => {
        setIsActive(!isActive);
      }}
      className={styles.button}
    >
      <motion.div
       className={styles.slider}
       animate={{top : isActive ? "-100%" : "0%"}}
       transition={{duration: 0.5, ease :[0.76,0,0.24,1]}}
       >
        <div className={styles.el}>
          <PrespectiveText label="Menu" />
        </div>
        <div className={styles.el}>
          <PrespectiveText label="Close" />
        </div>
      </motion.div>
    </div>
  );
};

export default NavButton;


interface PrespectiveTextProps {
  label: string;
}

const PrespectiveText: React.FC<PrespectiveTextProps> = ({ label }) =>{
  return(
    <div className={styles.perspectiveText}>
     <p>{label}</p>
     <p>{label}</p>
    </div>
  )
}