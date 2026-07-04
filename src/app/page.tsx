import dynamic from "next/dynamic";
import { ThemeProvider } from "@/context/ThemeContext";
import { ScrollProvider } from "@/context/ScrollContext";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Skills from "@/components/Skills";
import Projects from "@/components/Projects";
import Footer from "@/components/Footer";
import ScrollProgress from "@/components/ScrollProgress";
import SideNav from "@/components/SideNav";
import BackToTop from "@/components/BackToTop";

// Contact ya es un Client Component (usa framer-motion + hooks propios).
// Iría igual empaquetado en el bundle inicial si se importa de forma
// estática; con next/dynamic queda en su propio chunk, separado del JS
// que sí es crítico para el primer render (Hero/Navbar).
const Contact = dynamic(() => import("@/components/Contact"), { ssr: true });

/**
 * ISR: la página se genera estáticamente y se revalida como máximo
 * cada 1 hora. Si publicás un cambio desde el admin, revalidatePath('/')
 * la invalida al instante sin esperar la hora.
 * 
 * Resultado: el visitante recibe HTML pre-generado desde el edge de Vercel
 * en vez de esperar que Next consulte la DB en cada request.
 */
export const revalidate = 3600; // 1 hora en segundos

export default function Home() {
  return (
    <ThemeProvider>
      <ScrollProvider>
        <ScrollProgress />
        <Navbar />
        <SideNav />
        <main>
          <Hero />
          <About />
          <Skills />
          <Projects />
          <Contact />
        </main>
        <Footer />
        <BackToTop />
      </ScrollProvider>
    </ThemeProvider>
  );
}