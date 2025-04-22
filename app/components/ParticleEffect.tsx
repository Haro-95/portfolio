"use client";

import { useEffect, useRef, useState } from "react";

interface Particle {
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
  opacity: number;
}

export default function ParticleEffect() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number | null>(null);
  const [isMounted, setIsMounted] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const particlesRef = useRef<Particle[]>([]);
  const frameCountRef = useRef(0);
  const observerRef = useRef<IntersectionObserver | null>(null);

  // Only set mounted state, defer animation init
  useEffect(() => {
    setIsMounted(true);
    
    // Defer initialization to help with LCP
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 600); // Larger delay to prioritize main content
    
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!isMounted || !isVisible) return;
    
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    // Enable alpha blending for smoother rendering
    ctx.globalCompositeOperation = 'lighter';
    
    // Set high DPI for better rendering on high-res screens
    const dpr = Math.min(window.devicePixelRatio || 1, 2); // Cap at 2x for performance
    
    // Set canvas dimensions to match window size with DPI
    const setCanvasDimensions = () => {
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.scale(dpr, dpr);
    };

    setCanvasDimensions();
    
    // Throttle resize handler for better performance
    let resizeTimeout: number;
    const handleResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = window.setTimeout(() => {
        setCanvasDimensions();
        createParticles(); // Recreate particles on resize
      }, 250);
    };
    
    window.addEventListener("resize", handleResize);

    // Create particles - further reduced for better performance
    const particleCount = Math.min(Math.floor(window.innerWidth / 30), 60); 

    // Function to create particles for dark mode
    const createParticles = () => {
      particlesRef.current = [];
      
      for (let i = 0; i < particleCount; i++) {
        particlesRef.current.push({
          x: Math.random() * canvas.width / dpr,
          y: Math.random() * canvas.height / dpr,
          size: Math.random() * 2 + 0.5, // Smaller particles
          speedX: (Math.random() - 0.5) * 0.2, // Slower movement
          speedY: (Math.random() - 0.5) * 0.2, // Slower movement
          opacity: Math.random() * 0.5 + 0.2, // Dark mode opacity
        });
      }
    };

    createParticles();

    // Animation function with frame skipping for performance
    function animate() {
      if (!ctx || !canvas) return;
      
      frameCountRef.current++;
      
      // Only update every third frame for better performance
      if (frameCountRef.current % 3 === 0) {
        ctx.clearRect(0, 0, canvas.width / dpr, canvas.height / dpr);
      
        const particles = particlesRef.current;
        
        // Draw and update particles
        particles.forEach((particle) => {
          ctx.beginPath();
          ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
          
          // Set white color for dark mode
          ctx.fillStyle = `rgba(255, 255, 255, ${particle.opacity})`;
          
          ctx.fill();
          
          // Move particles
          particle.x += particle.speedX;
          particle.y += particle.speedY;
          
          // Wrap particles around edges
          if (particle.x < 0) particle.x = canvas.width / dpr;
          if (particle.x > canvas.width / dpr) particle.x = 0;
          if (particle.y < 0) particle.y = canvas.height / dpr;
          if (particle.y > canvas.height / dpr) particle.y = 0;
        });

        // Draw connections between nearby particles - optimized for dark mode
        const maxConnections = 2; // Dark mode connections
        
        for (let i = 0; i < particles.length; i++) {
          let connections = 0;
          
          for (let j = i + 1; j < particles.length; j++) {
            if (connections >= maxConnections) break;
            
            const dx = particles[i].x - particles[j].x;
            const dy = particles[i].y - particles[j].y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            
            // Dark mode connection distance
            const connectionDistance = 80;
            
            if (distance < connectionDistance) {
              connections++;
              ctx.beginPath();
              
              // White lines for dark mode
              ctx.strokeStyle = `rgba(255, 255, 255, ${0.12 * (1 - distance / connectionDistance)})`;
              
              ctx.lineWidth = 0.3; // Thinner lines
              ctx.moveTo(particles[i].x, particles[i].y);
              ctx.lineTo(particles[j].x, particles[j].y);
              ctx.stroke();
            }
          }
        }
      }
      
      animationRef.current = requestAnimationFrame(animate);
    }

    // Setup intersection observer to pause animation when not visible
    if (!observerRef.current) {
      observerRef.current = new IntersectionObserver(
        (entries) => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              // Resume animation if it was paused
              if (!animationRef.current) {
                animate();
              }
            } else {
              // Pause animation when not visible
              if (animationRef.current) {
                cancelAnimationFrame(animationRef.current);
                animationRef.current = null;
              }
            }
          });
        },
        { threshold: 0.1 }
      );
      
      if (canvas) {
        observerRef.current.observe(canvas);
      }
    }

    // Start animation
    animate();

    return () => {
      window.removeEventListener("resize", handleResize);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      
      if (observerRef.current && canvas) {
        observerRef.current.unobserve(canvas);
        observerRef.current.disconnect();
      }
    };
  }, [isMounted, isVisible]);

  // Only render the canvas when the component is mounted and visible
  if (!isMounted) return null;

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full overflow-hidden -z-5 pointer-events-none"
      style={{ 
        opacity: 1,
        display: isVisible ? 'block' : 'none' // Hide until we're ready to show
      }}
    />
  );
} 