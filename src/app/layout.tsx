import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";
import { MotionProvider } from "@/components/MotionProvider";
import { ThemeProvider } from "@/context/ThemeContext";
import { ScrollProvider } from "@/context/ScrollContext";
import Navbar from "@/components/Navbar";
import SideNav from "@/components/SideNav";
import Footer from "@/components/Footer";
import ScrollProgress from "@/components/ScrollProgress";
import BackToTop from "@/components/BackToTop";
import { Analytics } from "@vercel/analytics/react";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-inter",
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-space-grotesk",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Angel Berretta — Full Stack Developer",
  description:
    "Portfolio de Angel Berretta, Desarrollador Full Stack Freelance. Especializado en React, Node.js, Firebase y más.",
  keywords: [
    "Angel Berretta",
    "desarrollador full stack",
    "portfolio",
    "React",
    "JavaScript",
    "Node.js",
    "Firebase",
    "freelance",
  ],
  authors: [{ name: "Angel Berretta" }],
  openGraph: {
    title: "Angel Berretta — Full Stack Developer",
    description:
      "Portfolio de Angel Berretta, Desarrollador Full Stack Freelance. React, Node.js, Firebase y más.",
    type: "website",
    url: "https://portfolio-fullstack-angel.vercel.app/",
  },
  twitter: {
    card: "summary_large_image",
    title: "Angel Berretta — Full Stack Developer",
    description: "Portfolio de Angel Berretta, Desarrollador Full Stack Freelance.",
  },
  icons: {
    icon: "/favicon.svg",
  },
};

const themeScript = `
(function() {
  try {
    var stored = localStorage.getItem('portfolio-theme');
    var theme = (stored === 'dark' || stored === 'light')
      ? stored
      : (window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark');
    document.documentElement.setAttribute('data-theme', theme);
    document.documentElement.classList.toggle('dark', theme === 'dark');
  } catch (e) {}
})();
`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" data-scroll-behavior="smooth" data-theme="dark" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className={`${inter.variable} ${spaceGrotesk.variable} font-sans`}>
        <MotionProvider>
          <ThemeProvider>
            <ScrollProvider>
              <ScrollProgress />
              <Navbar />
              <SideNav />
              <main>{children}</main>
              <Footer />
              <BackToTop />
            </ScrollProvider>
          </ThemeProvider>
        </MotionProvider>
        <Analytics />
      </body>
    </html>
  );
}