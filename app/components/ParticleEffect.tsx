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
  const [isMobile, setIsMobile] = useState(false);

  // Detect mobile device
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Only set mounted state, defer animation init
  useEffect(() => {
    setIsMounted(true);
    
    // Defer initialization to help with LCP
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 800); // Increased delay to prioritize main content
    
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
    
    // Set high DPI but reduce for mobile
    const dpr = Math.min(window.devicePixelRatio || 1, isMobile ? 1 : 2);
    
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

    // Reduce particle count on mobile
    const deviceBasedParticleCount = isMobile 
      ? Math.min(Math.floor(window.innerWidth / 50), 30)  // Fewer particles on mobile
      : Math.min(Math.floor(window.innerWidth / 30), 60); 

    // Function to create particles for dark mode
    const createParticles = () => {
      particlesRef.current = [];
      
      for (let i = 0; i < deviceBasedParticleCount; i++) {
        particlesRef.current.push({
          x: Math.random() * canvas.width / dpr,
          y: Math.random() * canvas.height / dpr,
          size: Math.random() * 1.5 + 0.5, // Even smaller particles
          speedX: (Math.random() - 0.5) * (isMobile ? 0.1 : 0.2), // Slower on mobile
          speedY: (Math.random() - 0.5) * (isMobile ? 0.1 : 0.2), // Slower on mobile
          opacity: Math.random() * 0.4 + 0.1, // Reduced opacity
        });
      }
    };

    createParticles();

    // Animation function with frame skipping for performance
    function animate() {
      if (!ctx || !canvas) return;
      
      frameCountRef.current++;
      
      // Skip more frames on mobile
      const frameSkip = isMobile ? 4 : 3;
      
      if (frameCountRef.current % frameSkip === 0) {
        ctx.clearRect(0, 0, canvas.width / dpr, canvas.height / dpr);
      
        const particles = particlesRef.current;
        
        // Draw and update particles
        particles.forEach((particle) => {
          ctx.beginPath();
          ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
          
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

        // Draw fewer connections on mobile
        const maxConnections = isMobile ? 1 : 2;
        const connectionDistance = isMobile ? 60 : 80;
        
        for (let i = 0; i < particles.length; i++) {
          let connections = 0;
          
          for (let j = i + 1; j < particles.length; j++) {
            if (connections >= maxConnections) break;
            
            const dx = particles[i].x - particles[j].x;
            const dy = particles[i].y - particles[j].y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            
            if (distance < connectionDistance) {
              connections++;
              ctx.beginPath();
              
              // Reduced opacity on mobile
              const opacity = isMobile ? 0.08 : 0.12;
              ctx.strokeStyle = `rgba(255, 255, 255, ${opacity * (1 - distance / connectionDistance)})`;
              
              ctx.lineWidth = 0.2; // Even thinner lines 
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
  }, [isMounted, isVisible, isMobile]);

  // Don't render canvas on small screens for max performance
  if (isMounted) {
    return (
      <canvas
        ref={canvasRef}
        className="absolute top-0 left-0 w-full h-full opacity-50 z-0 pointer-events-none"
        style={{ 
          display: 'block',
          willChange: 'transform'
        }}
      />
    );
  }
  
  return null;
} 