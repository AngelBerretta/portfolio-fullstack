'use client';

import { motion, useInView } from 'framer-motion';
import type { CSSProperties } from 'react';
import { useRef } from 'react';
import { MapPin, GraduationCap, Briefcase, Code2 } from 'lucide-react';
import { AboutAvatar } from './AboutAvatar';

export function AboutClient({
  bio,
  avatarUrl,
  location,
  education,
  experience,
  currentFocus,
  cvUrl,
}: {
  bio: string;
  avatarUrl: string;
  location: string;
  education: string;
  experience: string;
  currentFocus: string;
  cvUrl: string | null;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  // La bio se guarda en la DB como párrafos separados por línea en blanco.
  const bioParagraphs = bio.split(/\n\s*\n/).filter(Boolean);

  const infoCards = [
    { icon: <MapPin size={18} className="text-blue-400" />, label: 'Ubicación', value: location },
    { icon: <GraduationCap size={18} className="text-sky-400" />, label: 'Educación', value: education },
    { icon: <Briefcase size={18} className="text-violet-400" />, label: 'Experiencia', value: experience },
    { icon: <Code2 size={18} className="text-green-400" />, label: 'Foco actual', value: currentFocus },
  ];

  return (
    <section id="about" className="relative py-28 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-72 h-72 bg-blue-600/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-80 h-80 bg-violet-600/10 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6" ref={ref}>
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-blue-400 font-mono text-sm font-semibold tracking-widest uppercase mb-3 block">
            01. Sobre mí
          </span>
          <h2 className="text-4xl md:text-5xl font-black" style={{ color: 'var(--text-primary)' } as CSSProperties}>
            ¿Quién soy?
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-blue-500 to-violet-400 rounded-full mx-auto mt-4" />
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-14 items-start">
          {/* Left — avatar + decorative */}
          <AboutAvatar isInView={isInView} avatarUrl={avatarUrl} />

          {/* Right — text + cards */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="space-y-6"
          >
            <div className="space-y-4 leading-relaxed text-base md:text-lg" style={{ color: 'var(--text-secondary)' } as CSSProperties}>
              {bioParagraphs.map((paragraph, i) => (
                <p key={i}>{paragraph}</p>
              ))}
            </div>

            {/* Info grid */}
            <div className="grid sm:grid-cols-2 gap-3 pt-2">
              {infoCards.map((card, i) => (
                <motion.div
                  key={card.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.3 + i * 0.08 }}
                  className="p-4 rounded-xl border hover:border-blue-500/30 hover:bg-blue-500/5 transition-all duration-300 group"
                  style={{ background: 'var(--bg-card)', borderColor: 'var(--border-subtle)' } as CSSProperties}
                >
                  <div className="flex items-start gap-3">
                    <div className="mt-0.5 shrink-0">{card.icon}</div>
                    <div>
                      <p className="text-xs font-medium mb-0.5" style={{ color: 'var(--text-muted)' }}>{card.label}</p>
                      <p className="text-sm font-medium leading-snug" style={{ color: 'var(--text-secondary)' }}>{card.value}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* CV download */}
            {cvUrl && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : {}}
                transition={{ delay: 0.7 }}
                className="pt-2"
              >
                <a
                  href={cvUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-blue-500 to-violet-600 text-white font-semibold text-sm shadow-lg shadow-blue-500/25 hover:shadow-blue-500/50 hover:scale-105 transition-all duration-300"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                  </svg>
                  Descargar CV completo
                </a>
              </motion.div>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
