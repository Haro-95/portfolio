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
        <meta name="google-site-verification" content="Dc2eFhSEKDVxLOwdLQln5Ad8e1IT8XlfUPltJb6MD-0" />
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
                  "name": "MTG Investments",
                  "description": "A professional corporate website for a property management company, featuring a clean design and intuitive navigation.",
                  "url": "https://www.mtg-investments.com/",
                  "image": "https://www.haroab.dev/screenshots/www.mtg-investments.com_bg.png"
                },
                {
                  "@type": "CreativeWork",
                  "name": "Mova Media",
                  "description": "A modern single-page website for a creative media agency, showcasing their services with smooth animations and elegant design.",
                  "url": "https://mova.bg/",
                  "image": "https://www.haroab.dev/screenshots/mova.bg_bg_.png"
                },
                {
                  "@type": "CreativeWork",
                  "name": "Keyword-App",
                  "description": "A web application for discovering trending keywords across Google, YouTube, Amazon, eBay, Etsy, and Bing platforms.",
                  "url": "https://www.keyword-app.com/",
                  "image": "https://www.haroab.dev/screenshots/www.keyword-app.com_.png"
                },
                {
                  "@type": "CreativeWork",
                  "name": "Toodoo App",
                  "description": "A modern todo application built with Next.js that helps users organize tasks effectively with a clean, user-friendly interface.",
                  "url": "https://toodoo-app-green.vercel.app/",
                  "image": "https://www.haroab.dev/screenshots/toodoo-app-green.vercel.app_.png"
                },
                {
                  "@type": "CreativeWork",
                  "name": "Image Shrink App",
                  "description": "A simple app for shrinking images that helps users reduce file sizes.",
                  "url": "https://image-shrink-psi.vercel.app/",
                  "image": "https://www.haroab.dev/screenshots/image-shrink-psi.vercel.app_.png"
                },
                {
                  "@type": "CreativeWork",
                  "name": "Dev-Quiz-Game",
                  "description": "Interactive programming language quiz game built with Next.js",
                  "url": "https://dev-quiz-game.vercel.app/",
                  "image": "https://www.haroab.dev/screenshots/dev-quiz-game.vercel.app_.png"
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
