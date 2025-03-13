"use client";
import { motion, useInView } from "framer-motion";
import { FC, useRef, useEffect, useState } from "react";
import GlitchText from "@/components/GlitchText/GlitchText";
import Button from "@/components/Button";

interface Particle {
  id: number;
  top: number;
  left: number;
  width: number;
  height: number;
}

const Contact: FC = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px 0px" });
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    setParticles(
      Array.from({ length: 15 }, (_, i) => ({
        id: i,
        top: Math.random() * 100,
        left: Math.random() * 100,
        width: Math.random() * 4 + 2,
        height: Math.random() * 4 + 2,
      }))
    );
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { y: 50, opacity: 0, rotateX: -90 },
    visible: {
      y: 0,
      opacity: 1,
      rotateX: 0,
      transition: { 
        type: "spring", 
        stiffness: 120,
        damping: 12
      }
    }
  };

  const formFields = [
    { type: 'text', label: 'Full Name', placeholder: 'John Doe', colSpan: '' },
    { type: 'email', label: 'Email Address', placeholder: 'john@example.com', colSpan: '' },
    { type: 'text', label: 'Subject', placeholder: 'Project Inquiry', colSpan: 'md:col-span-2' },
    { type: 'textarea', label: 'Message', placeholder: 'Your message...', colSpan: 'md:col-span-2' },
  ];

  return (
    <section 
      id="contact" 
      className="relative py-20 bg-black-100 overflow-hidden"
      ref={ref}
    >
      <motion.div 
        className="absolute inset-0 -z-20 opacity-10"
        initial={{ scale: 0.8 }}
        animate={isInView ? { scale: 1 } : {}}
        transition={{ duration: 2, ease: "easeOut" }}
      >
        <div className="h-full w-full pattern-dots pattern-gray-800 pattern-size-4 pattern-opacity-100" />
      </motion.div>

      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-16 text-center relative"
        >
          <div className="absolute inset-0 -z-10 bg-gradient-to-r from-gray-500/10 to-transparent blur-3xl" />
          <h2 className="text-5xl md:text-7xl font-robert-medium uppercase">
            <GlitchText text="Get In Touch" />
          </h2>
          <motion.p
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.5 }}
            className="mt-4 text-black-900 text-lg md:text-xl"
          >
            Let&apos;s create something <span className="text-gray-500">extraordinary</span> together
          </motion.p>
        </motion.div>

        <motion.form
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="max-w-2xl mx-auto relative"
          style={{ perspective: 1000 }}
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={isInView ? { scale: 1, opacity: 0.1 } : {}}
            transition={{ duration: 1.2, delay: 0.5 }}
            className="absolute inset-0 bg-gradient-to-r from-gray-500/20 to-transparent blur-3xl -z-10"
          />

          <div className="grid md:grid-cols-2 gap-6">
            {formFields.map((field, i) => (
              <motion.div 
                key={i}
                variants={itemVariants}
                className={field.colSpan}
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <label className="block text-gray-500 mb-2">{field.label}</label>
                {field.type === 'textarea' ? (
                  <textarea
                    className="w-full bg-black-200/20 rounded-xl px-6 py-4 
                      border-2 border-gray-800 focus:border-gray-500 
                      focus:ring-2 focus:ring-gray-500/30 transition-all
                      hover:shadow-lg hover:shadow-gray-500/10"
                    placeholder={field.placeholder}
                    rows={4}
                  />
                ) : (
                  <input
                    type={field.type}
                    className="w-full bg-black-200/20 rounded-xl px-6 py-4 
                      border-2 border-gray-800 focus:border-gray-500 
                      focus:ring-2 focus:ring-gray-500/30 transition-all
                      hover:shadow-lg hover:shadow-gray-500/10"
                    placeholder={field.placeholder}
                  />
                )}
              </motion.div>
            ))}

            <motion.div
              variants={itemVariants}
              className="md:col-span-2 mt-6"
              whileHover={{ scale: 1.02 }}
            >
              <Button
                variant="secondary"
                className="w-full group bg-gradient-to-r from-orange-600 to-orange-700 hover:to-orange-800"
                iconAfter={
                  <motion.div 
                    className="size-5 text-orange-500"
                    initial={{ x: 0 }}
                    whileHover={{ 
                      x: 5,
                      rotate: [0, 15, -15, 0],
                      transition: { duration: 0.6 }
                    }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className="size-5"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5"
                      />
                    </svg>
                  </motion.div>
                }
              >
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-orange-300 to-orange-100">
                  Send Message
                </span>
              </Button>
            </motion.div>
          </div>
        </motion.form>
      </div>

      <div className="absolute inset-0 -z-10">
        {particles.map((particle) => (
          <motion.div
            key={particle.id}
            className="absolute bg-gray-500/20 rounded-full"
            style={{
              top: `${particle.top}%`,
              left: `${particle.left}%`,
              width: `${particle.width}px`,
              height: `${particle.height}px`,
            }}
            initial={{ scale: 0 }}
            animate={{
              scale: [0, 1, 0],
              y: [-20, 0, 20],
              x: Math.random() > 0.5 ? [-10, 10, -10] : 0,
            }}
            transition={{
              duration: 3 + Math.random() * 4,
              repeat: Infinity,
              delay: Math.random() * 2,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      <motion.div
        className="absolute inset-0 border-2 border-gray-800/30 pointer-events-none"
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ delay: 0.8 }}
      />
    </section>
  );
};

export default Contact;