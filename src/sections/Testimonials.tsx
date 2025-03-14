"use client";
import { FC, Fragment, useState, useEffect } from "react";
import Image from "next/image";
import { motion } from "framer-motion";

import { urlFor } from "@/sanity/lib/image";
import TestimonialModal from "@/components/TestimonialModal";
import Grain from "@/assets/images/grain.jpg";
import { client } from "@/sanity/lib/client";

interface Testimonial {
  _id: string;
  _createdAt: string;
  name: string;
  position: string;
  text: string;
  avatar?: {
    asset: {
      _ref: string;
    };
    alt?: string;
  };
}

const defaultAvatars = [
  "/memojis/memoji-avatar-1.png",
  "/memojis/memoji-avatar-2.png",
  "/memojis/memoji-avatar-3.png",
  "/memojis/memoji-avatar-4.png",
  "/memojis/memoji-avatar-5.png",
];

const Testimonials: FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const data = await client.fetch(
          `*[_type == "testimonial"] | order(_createdAt desc)`
        );
        setTestimonials(data);
      } catch  {
        setError("Failed to load testimonials");
      } finally {
        setLoading(false);
      }
    };

    fetchTestimonials();
  }, []);

  // Changed to deterministic avatar selection
  const getAvatarForIndex = (index: number) => 
    defaultAvatars[index % defaultAvatars.length];

  const handleSubmitTestimonial = async (testimonial: Omit<Testimonial, '_id' | '_createdAt'>) => {
    try {
      await client.create({
        _type: 'testimonial',
        ...testimonial
      });
      setIsModalOpen(false);
      const updated = await client.fetch(`*[_type == "testimonial"] | order(_createdAt desc)`);
      setTestimonials(updated);
    } catch (error) {
      console.error('Error submitting testimonial:', error);
    }
  };

  if (error) return <div className="text-red-500 p-8">{error}</div>;
  if (loading) return <div className="text-gray-500 p-8">Loading...</div>;

  return (
    <div className="py-16 lg:py-24" id="testimonials">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-orange-500 mb-4">
            What Clients Say About Me
          </h2>
          <p className="text-lg text-black-900 max-w-3xl mx-auto">
            Trusted by Creators, Directors, and Visionaries
          </p>
          <button
            onClick={() => setIsModalOpen(true)}
            className="mt-6 bg-orange-500 text-white px-6 py-3 rounded-lg hover:bg-orange-600 transition-colors"
          >
            Add Testimonial
          </button>
        </motion.div>

        <TestimonialModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onSubmit={handleSubmitTestimonial}
        />

        <div className="mt-12 lg:mt-20 flex overflow-x-clip py-4 -my-4 [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
          <div className="flex flex-none gap-8 animate-move-left [animation-duration:90s] md:[animation-duration:60s] hover:[animation-play-state:paused]">
            {[...new Array(2)].map((_, idx) => (
              <Fragment key={idx}>
                {testimonials.map((testimonial, index) => {
                  // Consistent avatar calculation
                  const avatarUrl = testimonial.avatar?.asset 
                    ? urlFor(testimonial.avatar.asset).url()
                    : getAvatarForIndex(index);

                  return (
                    <div
                      key={`${testimonial._id}-${index}`}
                      className="bg-orange-400 relative rounded-3xl p-6 overflow-hidden max-w-xs md:p-8 md:max-w-md hover:-rotate-3 transition duration-300"
                    >
                      <div className="absolute inset-0 opacity-5 -z-10" style={{ backgroundImage: `url(${Grain.src})` }} />
                      <div className="flex gap-4 items-center">
                        <div className="size-14 bg-orange-200 inline-flex items-center justify-center rounded-full flex-shrink-0">
                          <Image
                            src={avatarUrl}
                            alt={testimonial.avatar?.alt || testimonial.name}
                            width={56}
                            height={56}
                            className="rounded-full object-cover"
                          />
                        </div>
                        <div>
                          <div className="font-semibold text-black-900">{testimonial.name}</div>
                          <div className="text-sm text-black-600">{testimonial.position}</div>
                        </div>
                      </div>
                      <p className="mt-4 md:mt-6 text-sm text-black-800 md:text-base">{testimonial.text}</p>
                    </div>
                  );
                })}
              </Fragment>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Testimonials;