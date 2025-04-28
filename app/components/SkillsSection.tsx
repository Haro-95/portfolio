"use client";

import { motion } from "framer-motion";
import SplitText from "./SplitText";
import { FaReact } from "react-icons/fa";
import { SiTypescript, SiNextdotjs, SiJavascript, SiTailwindcss, SiPython } from "react-icons/si";

// Define skills with icons from react-icons
const skills = [
  {
    name: "React",
    icon: FaReact,
    color: "text-blue-400"
  },
  {
    name: "TypeScript",
    icon: SiTypescript,
    color: "text-blue-600"
  },
  {
    name: "Next.js",
    icon: SiNextdotjs,
    color: "text-white"
  },
  {
    name: "JavaScript",
    icon: SiJavascript,
    color: "text-yellow-400"
  },
  {
    name: "Python",
    icon: SiPython,
    color: "text-yellow-300"
  },
  {
    name: "Tailwind CSS",
    icon: SiTailwindcss,
    color: "text-cyan-500"
  }
];

export default function SkillsSection() {
  return (
    <section className="py-20 px-4 md:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <SplitText
            text="What I Use"
            className="text-3xl md:text-4xl font-bold text-white"
            delay={50}
            alwaysAnimate={false}
            rootMargin="-20%"
          />
        </div>

        <div className="flex flex-wrap justify-center gap-4">
          {skills.map((skill, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ 
                once: true, 
                margin: "-20%",
                amount: "some" 
              }}
              transition={{ 
                duration: 0.2,
                delay: index * 0.1,
                ease: "easeOut"
              }}
              className="card-gradient p-6 rounded-xl text-center hover:shadow-lg transition border border-white/10 hover:shadow-blue-900/10 will-change-transform w-[calc(50%-0.5rem)] md:w-[calc(33.33%-1rem)] lg:w-[calc(16.66%-1rem)]"
            >
              <div className="w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center bg-slate-800/70">
                <skill.icon className={`w-8 h-8 ${skill.color}`} />
              </div>
              <h3 className="font-medium text-white">
                {skill.name}
              </h3>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
} 