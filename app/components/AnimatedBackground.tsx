"use client";

import { useEffect, useRef, useState, memo } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Shape {
  x: number;
  y: number;
  size: number;
  color: string;
  speed: number;
  opacity: number;
  delay: number;
}

// Using memo to prevent unnecessary re-renders
const MemoizedShape = memo(({ shape, index }: { 
  shape: Shape; 
  index: number;
}) => {
  return (
    <motion.div
      key={index}
      className="absolute rounded-full blur-element will-change-transform"
      initial={{
        left: `${shape.x}%`,
        top: `${shape.y}%`,
        opacity: 0,
      }}
      animate={{
        opacity: shape.opacity,
        x: [0, 20, -20, 10, -10, 0],
        y: [0, -20, 10, -10, 15, 0],
      }}
      transition={{
        opacity: { duration: 2, delay: shape.delay },
        x: {
          duration: shape.speed,
          repeat: Infinity,
          repeatType: "reverse",
          ease: "easeInOut",
          delay: shape.delay,
        },
        y: {
          duration: shape.speed * 1.3,
          repeat: Infinity,
          repeatType: "reverse",
          ease: "easeInOut",
          delay: shape.delay,
        },
      }}
      style={{
        width: shape.size,
        height: shape.size,
        backgroundColor: shape.color,
        filter: "blur(120px)",
        opacity: shape.opacity,
        contain: "layout paint style",
      }}
    />
  );
});

MemoizedShape.displayName = "MemoizedShape";

export default function AnimatedBackground() {
  const [isMounted, setIsMounted] = useState(false);
  const [isInViewport, setIsInViewport] = useState(false);
  const bgRef = useRef<HTMLDivElement>(null);
  
  // Make sure component is mounted before rendering content
  useEffect(() => {
    setIsMounted(true);
    
    // Defer animation to after first content paint
    const timer = setTimeout(() => {
      setIsInViewport(true);
    }, 300); // Short delay to help with LCP
    
    return () => clearTimeout(timer);
  }, []);
  
  // Setup intersection observer to only animate when in viewport
  useEffect(() => {
    if (!bgRef.current || !isMounted) return;
    
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setIsInViewport(true);
          } else {
            // Optional: pause animations when not in viewport
            // setIsInViewport(false);
          }
        });
      },
      { threshold: 0.1 }
    );
    
    observer.observe(bgRef.current);
    
    return () => {
      if (bgRef.current) {
        observer.unobserve(bgRef.current);
      }
    };
  }, [isMounted]);
  
  // Generate shapes for the background - optimized for dark mode
  const shapes: Shape[] = [
    {
      x: 15,
      y: 20,
      size: 600,
      color: "rgba(59, 130, 246, 0.7)", // blue
      speed: 60,
      opacity: 0.7,
      delay: 0,
    },
    {
      x: 85,
      y: 70,
      size: 550,
      color: "rgba(139, 92, 246, 0.8)", // purple
      speed: 75,
      opacity: 0.6,
      delay: 2,
    },
    {
      x: 40,
      y: 45,
      size: 700,
      color: "rgba(251, 146, 60, 0.7)", // orange
      speed: 90,
      opacity: 0.5,
      delay: 4,
    }
  ];

  // Only render the animation content when the component is mounted
  if (!isMounted) return <div className="fixed inset-0 w-full h-full -z-10" />;

  return (
    <div ref={bgRef} className="fixed inset-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
      <AnimatePresence>
        {isInViewport && shapes.map((shape, index) => (
          <MemoizedShape 
            key={index} 
            shape={shape} 
            index={index}
          />
        ))}
      </AnimatePresence>
      
      {/* Mesh grid overlay - only render if in viewport */}
      {isInViewport && (
        <div className="absolute inset-0 opacity-20 bg-grid-pattern" />
      )}
      
      {/* Noise texture overlay - only if in viewport */}
      {isInViewport && (
        <div className="absolute inset-0 opacity-[0.05] bg-noise-pattern" />
      )}
    </div>
  );
} 