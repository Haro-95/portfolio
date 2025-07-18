import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import Image from 'next/image';

// Cloudinary loader for Next.js Image
const cloudinaryLoader = ({ src, width, quality }: { src: string; width: number; quality?: number }) => {
  return `https://res.cloudinary.com/ddbmhlk94/image/upload/f_auto,q_auto,w_${width}${quality ? ",q_" + quality : ""}/${src}.jpg`;
};

type Project = {
  title: string;
  image: {
    src: string;
    width: number;
    height: number;
    sizes: string;
  };
  description: string;
  technologies: string[];
  liveUrl: string;
  githubUrl: string;
};

const projects: Project[] = [
  {
    title: 'Toodoo App',
    description: 'A modern todo application built with Next.js that helps users organize tasks effectively with a clean, user-friendly interface.',
    image: {
      src: 'toodoo-welcome-screen_n5dzh6',
      width: 1280,
      height: 800,
      sizes: '(max-width: 768px) 100vw, 33vw'
    },
    technologies: ["TypeScript", "JavaScript", "CSS", "Next.js"],
    liveUrl: "https://toodoo-app-green.vercel.app/",
    githubUrl: "https://github.com/Haro-95/toodoo-app.git"
  },
  {
    title: 'Image Shrink App',
    description: 'A simple app for shrinking images that helps users reduce file sizes.',
    image: {
      src: 'image-shrink_c30l1h',
      width: 1280,
      height: 800,
      sizes: '(max-width: 768px) 100vw, 33vw'
    },
    technologies: ["TypeScript", "HTML", "CSS"],
    liveUrl: "https://image-shrink-psi.vercel.app/",
    githubUrl: "https://github.com/Haro-95/image-shrink.git"
  },
  {
    title: 'Dev-Quiz-Game',
    description: 'Interactive programming language quiz game built with Next.js',
    image: {
      src: 'dev-quiz-game_hscreh',
      width: 1280,
      height: 800,
      sizes: '(max-width: 768px) 100vw, 33vw'
    },
    technologies: ["TypeScript", "JavaScript", "CSS", "Next.js"],
    liveUrl: "https://dev-quiz-game.vercel.app/",
    githubUrl: "https://github.com/Haro-95/dev-quiz-game.git"
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
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {projects.map((project, index) => (
        <motion.article
          key={project.title}
          {...animation}
          viewport={{ 
            once: true,
            margin: "50px 0px"
          }}
          className="relative group overflow-hidden rounded-xl border border-white/10 hover:border-white/20 transition-colors duration-300"
        >
          <div className="relative aspect-video overflow-hidden">
            <Image
              loader={cloudinaryLoader}
              src={project.image.src}
              alt={project.title}
              width={project.image.width}
              height={project.image.height}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              loading="lazy"
              sizes={project.image.sizes}
              quality={75}
              placeholder="blur"
              blurDataURL={`data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMjgwIiBoZWlnaHQ9IjgwMCI+PHJlY3Qgd2lkdGg9IjEyODAiIGhlaWdodD0iODAwIiBmaWxsPSIjMWUxZTIzIi8+PC9zdmc+`}
            />
          </div>
          <div className="p-4">
            <h3 className="text-lg font-semibold mb-2">{project.title}</h3>
            <p className="text-gray-300 text-sm mb-3 line-clamp-2">{project.description}</p>
            <div className="flex flex-wrap gap-2 mb-3">
              {project.technologies.map(tech => (
                <span key={tech} className="text-xs bg-white/10 px-2 py-1 rounded">
                  {tech}
                </span>
              ))}
            </div>
            <div className="flex gap-3 mt-4">
              <a 
                href={project.liveUrl} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-sm font-medium text-white hover:text-blue-400 transition-colors"
              >
                Live Demo →
              </a>
              <a 
                href={project.githubUrl} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-sm font-medium text-white hover:text-blue-400 transition-colors"
              >
                View Code
              </a>
            </div>
          </div>
        </motion.article>
      ))}
    </div>
  );
};

export default ProjectsSection;