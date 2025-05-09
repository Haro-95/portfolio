import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import Image from 'next/image';

// Cloudinary loader for Next.js Image
const cloudinaryLoader = ({ src, width, quality }: { src: string; width: number; quality?: number }) => {
  return `https://res.cloudinary.com/ddbmhlk94/image/upload/f_auto,q_auto,w_${width}${quality ? ",q_" + quality : ""}/${src}.jpg`;
};

const projects = [
  {
    title: 'Toodoo App',
    image: 'toodoo-welcome-screen_n5dzh6',
  },
  {
    title: 'Image Shrink App',
    image: 'image-shrink_c30l1h',
  },
  {
    title: 'Dev-Quiz-Game',
    image: 'dev-quiz-game_hscreh',
  },
];

const ProjectsSection = () => {
  const prefersReducedMotion = useReducedMotion();

  // Simple animation that respects user preferences
  const animation = prefersReducedMotion
    ? { opacity: 1 }
    : {
        initial: { opacity: 0 },
        whileInView: { opacity: 1 },
        transition: { 
          duration: 0.2
        }
      };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {projects.map((project, index) => (
        <motion.div
          key={index}
          {...animation}
          viewport={{ 
            once: true,
            margin: "50px 0px"
          }}
          className="relative group overflow-hidden rounded-xl border border-white/10"
        >
          <Image
            loader={cloudinaryLoader}
            src={project.image}
            alt={project.title}
            width={1280}
            height={720}
            className="w-full aspect-video object-cover transition-transform duration-300 group-hover:scale-105"
            loading="lazy"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            quality={75}
          />
        </motion.div>
      ))}
    </div>
  );
};

export default ProjectsSection; 