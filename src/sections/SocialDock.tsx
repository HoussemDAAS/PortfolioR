"use client";
import { motion, AnimatePresence, useDragControls } from "framer-motion";
import { FaInstagram, FaTiktok, FaFacebookF, FaPlus } from "react-icons/fa";
import { useState, useEffect } from "react";

const SocialPortal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const dragControls = useDragControls();

  const socialLinks = [
    {
      icon: <FaFacebookF />,
      href: "https://www.facebook.com/profile.php?id=61556346484595",
      label: "Follow on Facebook",
      color: "#1877F2",
    },
    {
      icon: <FaInstagram />,
      href: "https://www.instagram.com/rayenelmaamoun/",
      label: "Follow on Instagram",
      color: "#E4405F",
    },
    {
      icon: <FaTiktok />,
      href: "https://www.tiktok.com/@rayenelmaamoun",
      label: "Follow on TikTok",
      color: "#000000",
    },
  ];

  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  return (
    <motion.div
      className="fixed right-4 bottom-4 z-[999] md:right-8 md:bottom-8"
      drag
      dragControls={dragControls}
      dragElastic={0.1}
      dragMomentum={false}
    >
      <motion.div className="relative flex flex-col items-end gap-4">
        <AnimatePresence>
          {!isOpen && (
            <motion.span
              className="absolute bottom-full right-0 px-3 py-1 text-sm font-medium text-white rounded-lg shadow-lg backdrop-blur-lg bg-black-900/80 mb-2"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
            >
              Social Media
            </motion.span>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {isOpen && (
            <motion.div
              className="absolute bottom-full right-0 flex flex-col gap-3 mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
            >
              {socialLinks.map((link, index) => (
                <motion.a
                  key={index}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 group"
                  whileHover={{ x: -10 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <motion.span
                    className="px-3 py-1 text-sm font-medium text-white rounded-lg shadow-lg backdrop-blur-lg bg-black-900/80"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -10 }}
                  >
                    {link.label}
                  </motion.span>
                  
                  <motion.div
                    className="p-3 rounded-full shadow-xl backdrop-blur-lg bg-black-900/80 hover:shadow-orange-500/20"
                    whileHover={{
                      scale: 1.1,
                      rotate: [0, -15, 10, 0],
                      background: link.color,
                    }}
                    transition={{ duration: 0.3 }}
                  >
                    <motion.div className="text-2xl text-white">
                      {link.icon}
                    </motion.div>
                  </motion.div>
                </motion.a>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Main trigger button */}
        <motion.button
          onClick={() => setIsOpen(!isOpen)}
          className="rounded-full shadow-xl backdrop-blur-lg bg-black-900/80 hover:bg-orange-500"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          style={{ width: 56, height: 56 }}
        >
          <motion.div
            className="flex items-center justify-center w-full h-full text-white"
            animate={{ rotate: isOpen ? 45 : 0 }}
          >
            <FaPlus className="text-2xl" />
          </motion.div>
        </motion.button>

        {/* Background pulse effect */}
        <motion.div
          className="absolute inset-0 rounded-full -z-10 bg-orange-500/20"
          animate={{
            scale: isOpen ? 2 : 1,
            opacity: isOpen ? 0.3 : 0,
          }}
          transition={{ type: "spring", stiffness: 200 }}
        />
      </motion.div>
    </motion.div>
  );
};

export default SocialPortal;