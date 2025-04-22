import { motion } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';
import SplitText from './SplitText';
import Typewriter from './Typewriter';

const HeroSection = () => {
  const { theme } = useTheme();
  
  return (
    <section className="relative h-screen flex items-center justify-center px-4 overflow-hidden">
      <div className="absolute inset-0 flex items-center justify-center z-0">
        <div className="w-full md:w-4/5 lg:w-3/4 xl:w-2/3 aspect-square rounded-full bg-blue-600 blur-[120px] opacity-30"></div>
      </div>
      
      <div className="container max-w-6xl mx-auto z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-6"
        >
          <SplitText
            text="Hello, I'm Haro Abdulah"
            className={`text-3xl md:text-5xl font-bold ${theme === "dark" ? "text-white" : "text-slate-900"}`}
            delay={50}
          />
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mb-8"
        >
          <Typewriter
            text="Frontend Developer | UI/UX Designer | React Specialist"
            className={`text-xl md:text-2xl font-medium ${theme === "dark" ? "text-blue-300" : "text-blue-600"}`}
            delay={50}
            startDelay={1000}
          />
        </motion.div>
        
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className={`max-w-2xl mx-auto mb-8 text-lg ${theme === "dark" ? "text-gray-300" : "text-slate-600"}`}
        >
          I build stunning, performant websites with modern technologies.
          Let's create something amazing together.
        </motion.p>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.9 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <a 
            href="#projects" 
            className={`px-6 py-3 rounded-lg font-medium transition-colors ${
              theme === "dark"
                ? "bg-blue-600 text-white hover:bg-blue-700" 
                : "bg-blue-600 text-white hover:bg-blue-700"
            }`}
          >
            View My Work
          </a>
          <a 
            href="#contact" 
            className={`px-6 py-3 rounded-lg font-medium transition-colors ${
              theme === "dark"
                ? "bg-transparent border border-white/20 text-white hover:bg-white/10" 
                : "bg-transparent border border-blue-300 text-blue-700 hover:bg-blue-50"
            }`}
          >
            Contact Me
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection; 