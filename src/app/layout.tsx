import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";
import { MotionProvider } from "@/components/MotionProvider";

const inter = Inter({
  subsets: ["latin"],
  // Antes: ["300", "400", "500", "600", "700", "800", "900"] — 7 archivos
  // Ahora: solo los 4 pesos que realmente usa el sitio público
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

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" data-scroll-behavior="smooth">
      <body className={`${inter.variable} ${spaceGrotesk.variable} font-sans`}>
        {/* MotionProvider habilita LazyMotion para todos los componentes hijos.
            Todos los motion.X → m.X del sitio quedan cubiertos desde acá. */}
        <MotionProvider>
          {children}
        </MotionProvider>
      </body>
    </html>
  );
}