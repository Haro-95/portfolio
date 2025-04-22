"use client";

import { useEffect, useState } from "react";
import { useTheme } from "../context/ThemeContext";
import dynamic from 'next/dynamic';

// Dynamically import heavy background components to improve initial page load
const AnimatedBackground = dynamic(() => import('./AnimatedBackground'), { 
  ssr: false,
  loading: () => null 
});

const ParticleEffect = dynamic(() => import('./ParticleEffect'), { 
  ssr: false,
  loading: () => null 
});

export default function ClientThemeWrapper({ children }: { children: React.ReactNode }) {
  const [isMounted, setIsMounted] = useState(false);
  const [showBackgrounds, setShowBackgrounds] = useState(false);
  const { theme } = useTheme();

  useEffect(() => {
    setIsMounted(true);
    
    // Defer loading of background components until after main content is loaded
    const timer = setTimeout(() => {
      setShowBackgrounds(true);
    }, 300);
    
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {/* Background effects - only render after initial content is loaded */}
      {showBackgrounds && (
        <>
          <AnimatedBackground />
          <ParticleEffect />
        </>
      )}
      
      {/* Main content */}
      {children}
    </>
  );
} 