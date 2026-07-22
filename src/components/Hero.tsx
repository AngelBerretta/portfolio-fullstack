"use client";

import { Mail, ArrowDown } from 'lucide-react';
import { HeroParticles } from './HeroParticles';
import { useTypewriter } from '../hooks/useTypewriter';
import { ArgentinaFlag, GitHubIcon, LinkedInIcon } from './icons';

const roles = [
  'Full Stack Developer',
  'UI / UX Enthusiast',
  'Freelance Developer',
];

export default function Hero() {
  const typedText = useTypewriter(roles);

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-grid"
    >
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-600/20 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-sky-500/20 rounded-full blur-3xl" />
        <div className="hidden md:block absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-500/5 rounded-full blur-3xl" />
      </div>

      <HeroParticles />

      <div className="relative z-10 max-w-6xl mx-auto px-6 py-28 flex flex-col items-center text-center">

        <h1 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tight mb-5 leading-none [color:var(--text-primary)]">
          Angel{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-sky-400 to-cyan-300 glow-text">
            Berretta
          </span>
        </h1>

        <div className="h-12 md:h-14 flex items-center justify-center mb-7 opacity-0 animate-[fade-in-up_0.6s_ease-out_0.3s_forwards]">
          <span className="text-xl md:text-3xl font-semibold text-sky-300 glow-text-cyan font-mono">
            {typedText}
            <span className="cursor-blink text-blue-400 ml-0.5">|</span>
          </span>
        </div>

        <p className="max-w-2xl text-base md:text-lg leading-relaxed mb-8 [color:var(--text-secondary)] opacity-0 animate-[fade-in-up_0.6s_ease-out_0.4s_forwards]">
          Desarrollador Web Full Stack en continua formación{' '}
          <br className="hidden sm:block" />
          de Buenos Aires, Argentina{' '}
          <ArgentinaFlag />
          <br />
          <span className="font-medium [color:var(--text-secondary)]">
            ¡Estoy listo para aportar creatividad y compromiso a nuevos desafíos!
          </span>
        </p>

        <div className="mb-8 inline-flex items-center gap-2 px-5 py-2 rounded-full 
                    bg-green-500/10 dark:bg-green-500/10 
                    border border-green-600/40 dark:border-green-500/30 
                    text-green-700 dark:text-green-300 
                    text-sm font-medium
                    opacity-0 animate-[fade-in-up_0.6s_ease-out_0.45s_forwards]">
          <span className="w-2 h-2 rounded-full bg-green-500 dark:bg-green-400 animate-pulse" />
          Disponible para trabajar
        </div>

        <div className="flex flex-wrap gap-4 justify-center mb-12 opacity-0 animate-[fade-in-up_0.6s_ease-out_0.5s_forwards]">
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
        </div>

        <div className="flex items-center gap-4 mb-16 opacity-0 animate-[fade-in-up_0.6s_ease-out_0.6s_forwards]">
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
        </div>

        <div className="flex gap-10 md:gap-20 justify-center opacity-0 animate-[fade-in-up_0.6s_ease-out_0.7s_forwards]">
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
        </div>
      </div>

      <div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 cursor-pointer hover:text-blue-400 transition-colors opacity-0 animate-[fade-in_0.4s_ease-out_1.5s_forwards]"
        style={{ color: 'var(--text-faint)' }}
        onClick={() =>
          document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })
        }
      >
        <span className="text-[10px] font-semibold tracking-[0.3em] uppercase">Scroll</span>
        <div className="scroll-cue-arrow">
          <ArrowDown size={16} />
        </div>
      </div>
    </section>
  );
}