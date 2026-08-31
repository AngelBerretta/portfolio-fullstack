"use client";

import { useReveal } from '@/hooks/useReveal';
import { ContactInfo } from './ContactInfo';
import { ContactForm } from './ContactForm';

export default function Contact() {
  const { ref, isInView, style } = useReveal<HTMLDivElement>('-80px');

  return (
    <section id="contact" className="relative py-28 overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-64 bg-blue-600/15 rounded-full blur-3xl" />
        <div className="absolute top-0 right-0 w-72 h-72 bg-violet-600/10 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6" ref={ref}>
        {}
        <div style={style('up')} className="text-center mb-16">
          <span className="text-blue-400 font-mono text-sm font-semibold tracking-widest uppercase mb-3 block">
            04. Contacto
          </span>
          <h2 className="text-4xl md:text-5xl font-black mb-4 [color:var(--text-primary)]">
            Trabajemos juntos
          </h2>
          <p className="max-w-lg mx-auto text-base [color:var(--text-muted)]">
            ¿Tenés un proyecto en mente? Estoy disponible para trabajar Full Time. ¡Hablemos!
          </p>
          <div className="w-20 h-1 bg-gradient-to-r from-blue-500 to-violet-400 rounded-full mx-auto mt-5" />
        </div>

        {}
        <div className="grid lg:grid-cols-2 gap-10 items-start">
          <ContactInfo isInView={isInView} />
          <ContactForm isInView={isInView} />
        </div>
      </div>
    </section>
  );
}