/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  // Use class strategy for dark mode
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#eff6ff',
          100: '#dbeafe',
          200: '#bfdbfe',
          300: '#93c5fd',
          400: '#60a5fa',
          500: '#3b82f6',
          600: '#2563eb',
          700: '#1d4ed8',
          800: '#1e40af',
          900: '#1e3a8a',
          950: '#172554',
        },
        dark: {
          DEFAULT: '#0f172a', // Slate 900
          50: '#f8fafc',     // Slate 50
          100: '#f1f5f9',    // Slate 100
          200: '#e2e8f0',    // Slate 200
          300: '#cbd5e1',    // Slate 300
          400: '#94a3b8',    // Slate 400
          500: '#64748b',    // Slate 500
          600: '#475569',    // Slate 600
          700: '#334155',    // Slate 700
          800: '#1e293b',    // Slate 800
          900: '#0f172a',    // Slate 900
          950: '#020617',    // Slate 950
        },
      },
      transitionProperty: {
        'colors': 'background-color, border-color, color, fill, stroke',
      },
      transitionDuration: {
        '400': '400ms',
        '600': '600ms',
        '800': '800ms',
      },
    },
  },
  plugins: [],
} 