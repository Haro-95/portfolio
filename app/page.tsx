"use client";

import { useRef, useState, useEffect, lazy, Suspense, FormEvent } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import BlurText from "./components/BlurText";
import SplitText from "./components/SplitText";
import RotatingText from "./components/RotatingText";
import AnimatedBackground from "./components/AnimatedBackground";
import ParticleEffect from "./components/ParticleEffect";
import SkillsSection from "./components/SkillsSection";
import emailjs from '@emailjs/browser';

// Critical element that was identified as LCP
const LCPParagraph = ({ children, className }: { children: React.ReactNode; className: string }) => {
  return (
    <p className={className}>
      {children}
    </p>
  );
};

// Custom ProfileImage component with better control over image positioning
const ProfileImage = () => {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: false }}
      className="w-48 h-48 md:w-64 md:h-64 rounded-full overflow-hidden flex-shrink-0 border border-white/10 relative"
    >
      <Image 
        src="/images/profile.jpg"
        alt="Haro Abdulah"
        width={500}
        height={500}
        className="w-full h-full object-cover"
        style={{ objectPosition: "80% center" }}
        priority
        unoptimized={true}
      />
    </motion.div>
  );
};

// Define your projects - replace with your actual projects
const projects = [
  {
    title: "Toodoo App",
    description: "A modern todo application built with Next.js that helps users organize tasks effectively with a clean, user-friendly interface.",
    image: "/images/projects/toodoo-welcome-screen.png",
    technologies: ["TypeScript", "JavaScript", "CSS", "Next.js"],
    liveUrl: "https://toodoo-app-green.vercel.app/",
    githubUrl: "https://github.com/Haro-95/toodoo-app.git"
  },
  {
    title: "Image Shrink App",
    description: "A simple app for shrinking images that helps users reduce file sizes.",
    image: "/images/projects/image-shrink.png",
    technologies: ["TypeScript", "HTML", "CSS"],
    liveUrl: "https://image-shrink-psi.vercel.app/",
    githubUrl: "https://github.com/Haro-95/image-shrink.git"
  },
  {
    title: "Dev-Quiz-Game",
    description: "Interactive programming language quiz game built with Next.js",
    image: "/images/projects/dev-quiz-game.png",
    technologies: ["TypeScript", "JavaScript", "CSS", "Next.js"],
    liveUrl: "https://dev-quiz-game.vercel.app/",
    githubUrl: "https://github.com/Haro-95/dev-quiz-game.git"
  }
];

export default function Home() {
  const [isLoaded, setIsLoaded] = useState(true);
  const [shouldAnimateHero, setShouldAnimateHero] = useState(true);
  const [showBackgrounds, setShowBackgrounds] = useState(false);
  const rotatingTextRef = useRef<any>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const [formStatus, setFormStatus] = useState({ 
    submitting: false, 
    success: false, 
    error: false,
    message: ''
  });
  
  // Stagger animations to improve performance
  useEffect(() => {
    // Load background effects after a small delay
    const bgTimer = setTimeout(() => {
      setShowBackgrounds(true);
    }, 300);
    
    return () => clearTimeout(bgTimer);
  }, []);
  
  // Clear form status message after delay
  useEffect(() => {
    if (formStatus.message) {
      const timer = setTimeout(() => {
        setFormStatus(prev => ({ ...prev, message: '' }));
      }, 5000); // 5 seconds
      
      return () => clearTimeout(timer);
    }
  }, [formStatus.message]);

  // Handle form submission
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormStatus({ submitting: true, success: false, error: false, message: '' });

    if (!formRef.current) return;

    // EmailJS configuration with environment variables
    emailjs.sendForm(
      process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || '',
      process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID || '',
      formRef.current,
      process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY || ''
    )
      .then((result) => {
        setFormStatus({
          submitting: false,
          success: true,
          error: false,
          message: 'Message sent successfully!'
        });
        // Clear form
        formRef.current?.reset();
      }, (error) => {
        setFormStatus({
          submitting: false,
          success: false,
          error: true,
          message: 'Failed to send message. Please try again.'
        });
        console.error('EmailJS error:', error);
      });
  };

  return (
    <div className="min-h-screen text-white">
      {/* Background effects - only shown after content loads */}
      {showBackgrounds && (
        <>
          <AnimatedBackground />
          <ParticleEffect />
        </>
      )}
      
      {/* Hero Section */}
      <header className="relative flex flex-col justify-center items-center min-h-screen px-4 md:px-8 overflow-hidden">
        {/* Preload critical content */}
        <motion.div
          initial={{ opacity: 0, y: 0 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="absolute top-6 left-6 flex items-center space-x-2 z-20"
        >
          <span className="font-bold text-3xl">HA</span>
        </motion.div>

        <div 
          className="text-center max-w-4xl mx-auto z-20 relative"
        >
          {/* Hero heading with improved animation */}
          <h1 
            className="text-4xl md:text-6xl font-bold mb-2 text-white"
          >
            <BlurText
              text="Hi, I'm Haro Abdulah"
              className=""
              animateBy="words"
              delay={40}
              direction="bottom"
              alwaysAnimate={false}
              rootMargin="0px"
              animationFrom={{ 
                filter: 'blur(4px)', 
                opacity: 0.2, 
                transform: 'translate3d(0,10px,0)' 
              }}
              animationTo={[
                { filter: 'blur(0px)', opacity: 1, transform: 'translate3d(0,0,0)' }
              ]}
            />
          </h1>

          <div className="mt-4 mb-6">
            <div className="flex flex-col items-center">
              <p className="text-xl md:text-2xl font-medium text-gray-300 mb-2">I build</p>
              <div className="h-8 md:h-10 flex items-center justify-center">
                <RotatingText
                  ref={rotatingTextRef}
                  texts={[
                    "websites with React",
                    "apps with Next.js",
                    "styles with Tailwind",
                    "scripts with Python",
                    "experiences with TypeScript"
                  ]}
                  rotationInterval={3000}
                  className="text-blue-400 text-xl md:text-2xl font-medium text-center"
                  splitBy="character"
                  staggerDuration={0.01}
                />
              </div>
            </div>
          </div>

          {/* This is the LCP element - prioritize it */}
          <LCPParagraph 
            className="text-lg md:text-xl text-white mt-8 max-w-2xl mx-auto"
          >
            I have a passion for building simple websites and applications using modern web technologies.
          </LCPParagraph>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 20 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mt-8 flex flex-col md:flex-row justify-center gap-4"
          >
            <a href="#projects" className="bg-blue-600 text-white px-6 py-3 rounded-full font-medium hover:bg-blue-700 transition text-center">
              View my work
            </a>
            <a href="#contact" className="bg-blue-600 text-white px-6 py-3 rounded-full font-medium hover:bg-blue-700 transition text-center">
              Contact me
            </a>
          </motion.div>
        </div>
      </header>

      {/* Projects Section */}
      <section id="projects" className="py-20 px-4 md:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <SplitText
              text="My Projects"
              className="text-3xl md:text-4xl font-bold text-white"
              delay={50}
              alwaysAnimate={true}
              rootMargin="-50px"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Project cards with actual data */}
            {projects.map((project, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                viewport={{ once: true, margin: "-10%" }}
                className="card-gradient rounded-xl overflow-hidden hover:shadow-lg transition border border-white/10 flex flex-col h-full will-change-transform"
              >
                <div className="h-48 bg-blue-900/20 relative overflow-hidden">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover hover:scale-105 transition duration-500"
                    loading="lazy"
                  />
                </div>
                <div className="p-6 flex flex-col flex-grow">
                  <h3 className="text-xl font-bold mb-2 text-white">
                    {project.title}
                  </h3>
                  <p className="mb-4 text-gray-300 flex-grow">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.technologies.map((tech, techIndex) => (
                      <span key={techIndex} className="text-xs px-2 py-1 rounded bg-blue-900/30 text-blue-300">
                        {tech}
                      </span>
                    ))}
                  </div>
                  <div className="flex gap-3 mt-auto">
                    <a 
                      href={project.liveUrl} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-sm px-3 py-1.5 bg-blue-600 text-white rounded hover:bg-blue-700 transition flex-grow text-center"
                    >
                      Live Demo
                    </a>
                    {project.githubUrl && (
                      <a 
                        href={project.githubUrl} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-sm px-3 py-1.5 bg-blue-800/50 text-white rounded hover:bg-blue-800/70 transition flex items-center justify-center"
                      >
                        <FaGithub className="mr-1" /> Code
                      </a>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 px-4 md:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <SplitText
              text="About Me"
              className="text-3xl md:text-4xl font-bold text-white"
              delay={50}
              alwaysAnimate={true}
              rootMargin="-50px"
            />
          </div>

          <div className="flex flex-col md:flex-row gap-8 items-center">
            <ProfileImage />
            
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: false }}
              className="card-gradient p-6 rounded-xl border border-white/10"
            >
              <p className="text-lg mb-4 text-gray-300">
                Hey there!
              </p>
              <p className="text-lg mb-4 text-gray-300">
                I'm someone who actually enjoys creating websites and apps. It started out as a hobby and somehow ended up being one of my favourite things to do. I like to keep things clean, fast, and easy to use, whether I'm working on a small idea or trying with something new just for fun.
              </p>
              <p className="text-lg mb-4 text-gray-300">
                If I'm not building anything, I'm probably looking at memes or watching shows like Mr. Robot, Breaking Bad, or Rick and Morty.
              </p>
              <p className="text-lg text-gray-300 font-bold">
                If you ever want to say hi or chat about something cool, feel free to shoot me an email.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <SkillsSection />

      {/* Contact Section */}
      <section id="contact" className="py-20 px-4 md:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <SplitText
              text="Get In Touch"
              className="text-3xl md:text-4xl font-bold text-white"
              delay={50}
              alwaysAnimate={true}
              rootMargin="-50px"
            />
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: false }}
            className="card-gradient p-8 rounded-xl border border-white/10"
          >
            <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium mb-1 text-gray-300">Name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    className="w-full px-4 py-2 rounded-lg bg-gray-900/50 border border-white/10 text-white focus:outline-none focus:ring-1 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium mb-1 text-gray-300">Email</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    className="w-full px-4 py-2 rounded-lg bg-gray-900/50 border border-white/10 text-white focus:outline-none focus:ring-1 focus:ring-blue-500"
                  />
                </div>
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium mb-1 text-gray-300">Message</label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={5}
                  className="w-full px-4 py-2 rounded-lg bg-gray-900/50 border border-white/10 text-white focus:outline-none focus:ring-1 focus:ring-blue-500 resize-none"
                ></textarea>
              </div>
              
              {formStatus.message && (
                <div className={`text-sm px-4 py-2 rounded ${formStatus.success ? 'bg-green-900/50 text-green-300' : 'bg-red-900/50 text-red-300'}`}>
                  {formStatus.message}
                </div>
              )}
              
              <div className="flex justify-end">
                <button
                  type="submit"
                  disabled={formStatus.submitting}
                  className={`bg-blue-600 text-white px-6 py-3 rounded-lg font-medium transition md:w-auto ${formStatus.submitting ? 'opacity-70 cursor-not-allowed' : 'hover:bg-blue-700'}`}
                >
                  {formStatus.submitting ? 'Sending...' : 'Send Message'}
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-4 md:px-8 border-t border-white/10">
        <div className="max-w-6xl mx-auto flex flex-col items-center justify-center text-center">
          <div className="text-gray-400 mb-4">
            © {new Date().getFullYear()} Haro Abdulah. All rights reserved.
          </div>
          <div className="flex space-x-6">
            <a href="https://github.com/Haro-95" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-blue-400 transition flex items-center">
              <FaGithub className="w-5 h-5 mr-2" />
              GitHub
            </a>
            <a href="https://www.linkedin.com/in/habdulah" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-blue-400 transition flex items-center">
              <FaLinkedin className="w-5 h-5 mr-2" />
              LinkedIn
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
