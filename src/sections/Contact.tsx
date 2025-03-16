"use client";
import { motion, useInView } from "framer-motion";
import { FC, useRef, useEffect, useState } from "react";
import GlitchText from "@/components/GlitchText/GlitchText";
import Button from "@/components/Button";
import { client } from "@/sanity/lib/client";
import { toast, Toaster } from "sonner";

interface Particle {
  id: number;
  top: number;
  left: number;
  width: number;
  height: number;
}

interface FormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

const Contact: FC = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px 0px" });
  const [particles, setParticles] = useState<Particle[]>([]);
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [submitting, setSubmitting] = useState(false);

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
    { type: 'text', name: 'name', label: 'Full Name', placeholder: 'John Doe' },
    { type: 'email', name: 'email', label: 'Email Address', placeholder: 'john@example.com' },
    { type: 'text', name: 'subject', label: 'Subject', placeholder: 'Project Inquiry', colSpan: 'md:col-span-2' },
    { type: 'textarea', name: 'message', label: 'Message', placeholder: 'Your message...', colSpan: 'md:col-span-2' },
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    
    try {
      await client.create({
        _type: 'contact',
        ...formData,
        _createdAt: new Date().toISOString()
      });

      toast.custom((t) => (
        <div className="bg-green-500 text-white px-6  rounded-lg flex items-center gap-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
              clipRule="evenodd"
            />
          </svg>
          <span>Message sent successfully!</span>
        </div>
      ));
      setFormData({ name: '', email: '', subject: '', message: '' });
    } catch (error) {
      console.error('Submission error:', error);
      toast.error('Failed to send message. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const isFormValid = Object.values(formData).every(value => value.trim() !== '');

  return (
    <section 
      id="contact" 
      className="relative py-20 bg-black-100 overflow-hidden"
      ref={ref}
    >
         <Toaster position="top-center" richColors />
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
          onSubmit={handleSubmit}
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
                className={field.colSpan || ''}
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <label className="block text-gray-500 mb-2">{field.label}</label>
                {field.type === 'textarea' ? (
                  <textarea
                    name={field.name}
                    value={formData[field.name as keyof FormData]}
                    onChange={handleChange}
                    className="w-full bg-black-200/20 rounded-xl px-6 py-4 
                      border-2 border-gray-800 focus:border-gray-500 
                      focus:ring-2 focus:ring-gray-500/30 transition-all
                      hover:shadow-lg hover:shadow-gray-500/10"
                    placeholder={field.placeholder}
                    rows={4}
                    required
                  />
                ) : (
                  <input
                    type={field.type}
                    name={field.name}
                    value={formData[field.name as keyof FormData]}
                    onChange={handleChange}
                    className="w-full bg-black-200/20 rounded-xl px-6 py-4 
                      border-2 border-gray-800 focus:border-gray-500 
                      focus:ring-2 focus:ring-gray-500/30 transition-all
                      hover:shadow-lg hover:shadow-gray-500/10"
                    placeholder={field.placeholder}
                    required
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
            type="submit"
            variant={"secondary"}
            className={`w-full group ${submitting ? 'opacity-50 cursor-not-allowed' : ''}`}
            disabled={submitting || !isFormValid}
            iconAfter={
              <div className="size-8 flex items-center justify-center">
                <motion.div 
                  className="size-5 text-black-800"
                  initial={{ y: 0 }}
                  animate={{
                    y: submitting ? 0 : [0, 5, 0],
                    transition: { repeat: Infinity, duration: 1.5 }
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
                      d="m4.5 5.25 7.5 7.5 7.5-7.5m-15 6 7.5 7.5 7.5-7.5"
                    />
                  </svg>
                </motion.div>
              </div>
            }
          >
            <span className=" ">
              {submitting ? 'Sending...' : 'Send Message'}
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