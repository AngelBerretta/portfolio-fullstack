import { ThemeProvider } from "@/context/ThemeContext";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Skills from "@/components/Skills";
import Projects from "@/components/Projects";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import ScrollProgress from "@/components/ScrollProgress";
import SideNav from "@/components/SideNav";
import BackToTop from "@/components/BackToTop";

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
    </ThemeProvider>
  );
}
