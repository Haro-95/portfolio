import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "./context/ThemeContext";
import Script from "next/script";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Haro Abdulah | Frontend Developer Portfolio",
  description: "Explore Haro Abdulah's portfolio showcasing innovative web development projects, frontend expertise, and creative solutions in modern web technologies. View my work and get in touch for collaboration opportunities.",
  keywords: "Haro Abdulah, Frontend Developer, Web Developer, Portfolio, React, Next.js, TypeScript, Web Development",
  authors: [{ name: "Haro Abdulah" }],
  creator: "Haro Abdulah",
  publisher: "Haro Abdulah",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://www.haroab.dev'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: "Haro Abdulah | Frontend Developer Portfolio",
    description: "Explore Haro Abdulah's portfolio showcasing innovative web development projects, frontend expertise, and creative solutions in modern web technologies.",
    url: 'https://www.haroab.dev',
    siteName: "Haro Abdulah Portfolio",
    images: [
      {
        url: '/og-image.jpg', 
        width: 1200,
        height: 630,
        alt: 'Haro Abdulah Portfolio Preview',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon.ico',
    apple: '/apple-touch-icon.png',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <head>
        <meta name="google-site-verification" content="googlec0dbe5f20e014772" />
        <Script
          id="structured-data"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              "name": "Haro Abdulah",
              "url": "https://www.haroab.dev",
              "jobTitle": "Frontend Developer",
              "sameAs": [
                "https://github.com/Haro-95",
                "https://www.linkedin.com/in/habdulah"
              ],
              "knowsAbout": [
                "Web Development",
                "Frontend Development",
                "React",
                "Next.js",
                "TypeScript"
              ],
              "hasPart": [
                {
                  "@type": "CreativeWork",
                  "name": "Toodoo App",
                  "description": "A modern todo application built with Next.js that helps users organize tasks effectively with a clean, user-friendly interface.",
                  "url": "https://toodoo-app-green.vercel.app/",
                  "image": "https://res.cloudinary.com/ddbmhlk94/image/upload/f_auto,q_auto/toodoo-welcome-screen_n5dzh6.jpg"
                },
                {
                  "@type": "CreativeWork",
                  "name": "Image Shrink App",
                  "description": "A simple app for shrinking images that helps users reduce file sizes.",
                  "url": "https://image-shrink-psi.vercel.app/",
                  "image": "https://res.cloudinary.com/ddbmhlk94/image/upload/f_auto,q_auto/image-shrink_c30l1h.jpg"
                },
                {
                  "@type": "CreativeWork",
                  "name": "Dev-Quiz-Game",
                  "description": "Interactive programming language quiz game built with Next.js",
                  "url": "https://dev-quiz-game.vercel.app/",
                  "image": "https://res.cloudinary.com/ddbmhlk94/image/upload/f_auto,q_auto/dev-quiz-game_hscreh.jpg"
                }
              ]
            })
          }}
        />
      </head>
      <body className={`${inter.className} dark fullscreen-gradient`}>
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
