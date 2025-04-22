"use client";

import { createContext, useContext, ReactNode, useEffect } from "react";

interface ThemeContextType {
  theme: "dark";
}

// Create context with only dark theme
const ThemeContext = createContext<ThemeContextType>({
  theme: "dark",
});

export function ThemeProvider({ children }: { children: ReactNode }) {
  // Add effect to ensure dark mode is applied to document
  useEffect(() => {
    // Ensure dark class is applied to html element
    document.documentElement.classList.add('dark');
    // Set the data-theme attribute
    document.documentElement.setAttribute('data-theme', 'dark');
  }, []);

  // Always provide dark theme
  return (
    <ThemeContext.Provider value={{ theme: "dark" }}>
      {children}
    </ThemeContext.Provider>
  );
}

export const useTheme = () => useContext(ThemeContext); 