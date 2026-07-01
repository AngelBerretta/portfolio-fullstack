"use client";

import { m } from 'framer-motion';
import { Mail, ArrowDown, Sparkles } from 'lucide-react';
import { HeroParticles } from './HeroParticles';
import { useTypewriter } from '../hooks/useTypewriter';

const roles = [
  'Full Stack Developer',
  'UI / UX Enthusiast',
  'Freelance Developer',
];

const ArgentinaFlag = () => (
  <svg
    viewBox="0 0 27 18"
    className="inline-block w-5 h-4 align-middle mx-1"
    aria-label="Bandera de Argentina"
    role="img"
  >
    <rect width="27" height="6" fill="#74ACDF" />
    <rect y="6" width="27" height="6" fill="#FFFFFF" />
    <rect y="12" width="27" height="6" fill="#74ACDF" />
    <circle cx="13.5" cy="9" r="3.5" fill="#F6B40E" />
  </svg>
);

const GitHubIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
    <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
  </svg>
);

const LinkedInIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
  </svg>
);

export default function Hero() {
  const typedText = useTypewriter(roles);

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-grid"
    >
      {/* Glow orbs — el tercero (600px, el más caro de rasterizar) se oculta en mobile */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-600/20 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-sky-500/20 rounded-full blur-3xl" />
        <div className="hidden md:block absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-500/5 rounded-full blur-3xl" />
      </div>

      <HeroParticles />

      <div className="relative z-10 max-w-6xl mx-auto px-6 py-28 flex flex-col items-center text-center">

        {/* Name — sin framer-motion: es el elemento LCP, pinta instantáneo en vez de
            esperar a que hidrate React + corra la animación de opacidad */}
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tight mb-5 leading-none [color:var(--text-primary)]">
          Angel{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-sky-400 to-cyan-300 glow-text">
            Berretta
          </span>
        </h1>

        {/* Typewriter */}
        <m.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="h-12 md:h-14 flex items-center justify-center mb-7"
        >
          <span className="text-xl md:text-3xl font-semibold text-sky-300 glow-text-cyan font-mono">
            {typedText}
            <span className="cursor-blink text-blue-400 ml-0.5">|</span>
          </span>
        </m.div>

        {/* Description */}
        <m.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="max-w-2xl text-base md:text-lg leading-relaxed mb-8 [color:var(--text-secondary)]"
        >
          Desarrollador Web Full Stack en continua formación{' '}
          <br className="hidden sm:block" />
          de Buenos Aires, Argentina{' '}
          <ArgentinaFlag />
          <br />
          <span className="font-medium [color:var(--text-secondary)]">
            ¡Estoy listo para aportar creatividad y compromiso a nuevos desafíos!
          </span>
        </m.p>

        {/* Status badge */}
        <m.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.45 }}
          className="mb-8 inline-flex items-center gap-2 px-5 py-2 rounded-full 
                    bg-green-500/10 dark:bg-green-500/10 
                    border border-green-600/40 dark:border-green-500/30 
                    text-green-700 dark:text-green-300 
                    text-sm font-medium"
        >
          <span className="w-2 h-2 rounded-full bg-green-500 dark:bg-green-400 animate-pulse" />
          Disponible para trabajar
          {/* <Sparkles size={14} className="text-yellow-500 dark:text-yellow-400" /> */}
        </m.div>

        {/* CTA Buttons */}
        <m.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="flex flex-wrap gap-4 justify-center mb-12"
        >
          <button
            onClick={() =>
              document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })
            }
            className="px-8 py-3.5 rounded-xl bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-semibold shadow-lg shadow-blue-500/30 hover:shadow-blue-500/60 hover:scale-105 transition-all duration-300"
          >
            Ver Proyectos
          </button>
          <button
            onClick={() =>
              document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })
            }
            className="px-8 py-3.5 rounded-xl border border-blue-500/40 font-semibold hover:border-blue-500/80 hover:bg-blue-500/10 transition-all duration-300 [color:var(--text-primary)]"
          >
            Contactame
          </button>
        </m.div>

        {/* Socials */}
        <m.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="flex items-center gap-4 mb-16"
        >
          {[
            {
              icon: <GitHubIcon />,
              href: 'https://github.com/AngelBerretta',
              label: 'GitHub',
              color: 'hover:text-white hover:border-white/30 hover:bg-white/8',
            },
            {
              icon: <LinkedInIcon />,
              href: 'https://linkedin.com/in/angelberretta',
              label: 'LinkedIn',
              color: 'hover:text-blue-400 hover:border-blue-400/40 hover:bg-blue-400/8',
            },
            {
              icon: <Mail size={20} />,
              href: 'mailto:angelcursodeingles2@gmail.com',
              label: 'Email',
              color: 'hover:text-blue-400 hover:border-blue-400/40 hover:bg-blue-400/8',
            },
          ].map((s) => (
            <a
              key={s.label}
              href={s.href}
              target={s.label !== 'Email' ? '_blank' : undefined}
              rel="noopener noreferrer"
              aria-label={s.label}
              className={`p-3 rounded-xl border transition-all duration-300 hover:scale-110 ${s.color}`}
              style={{ color: 'var(--text-muted)', borderColor: 'var(--border-subtle)' }}
            >
              {s.icon}
            </a>
          ))}
        </m.div>

        {/* Stats */}
        <m.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="flex gap-10 md:gap-20 justify-center"
        >
          {[
            { number: '8+', label: 'Proyectos' },
            { number: '1+', label: 'Año freelance' },
            { number: '20+', label: 'Tecnologías' },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="text-3xl md:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-sky-400 mb-1">
                {stat.number}
              </div>
              <div className="text-xs md:text-sm font-medium [color:var(--text-muted)]">
                {stat.label}
              </div>
            </div>
          ))}
        </m.div>
      </div>

      {/* Scroll cue */}
      <m.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 cursor-pointer hover:text-blue-400 transition-colors"
        style={{ color: 'var(--text-faint)' }}
        onClick={() =>
          document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })
        }
      >
        <span className="text-[10px] font-semibold tracking-[0.3em] uppercase">Scroll</span>
        {/* El bounce ahora es CSS puro — la clase scroll-cue-arrow está en globals.css */}
        <div className="scroll-cue-arrow">
          <ArrowDown size={16} />
        </div>
      </m.div>
    </section>
  );
}