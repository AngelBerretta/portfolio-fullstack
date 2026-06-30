"use client";

import { m } from 'framer-motion';
import { useScrollState } from '@/hooks/useScrollState';
import { useActiveSection } from '@/hooks/useActiveSection';

const sections = [
  { id: 'hero',     label: 'Inicio'    },
  { id: 'about',    label: 'Sobre mí'  },
  { id: 'skills',   label: 'Skills'    },
  { id: 'projects', label: 'Proyectos' },
  { id: 'contact',  label: 'Contacto'  },
];

export default function SideNav() {
  const { isSideNavVisible } = useScrollState()
  const active = useActiveSection()

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <m.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: isSideNavVisible ? 1 : 0, x: isSideNavVisible ? 0 : 20 }}
      transition={{ duration: 0.4 }}
      className="fixed right-6 top-1/2 -translate-y-1/2 z-40 hidden lg:flex flex-col gap-3"
    >
      {sections.map((s) => {
        const isActive = active === s.id;
        return (
          <button
            key={s.id}
            onClick={() => scrollTo(s.id)}
            className="group flex items-center justify-end gap-2"
            aria-label={s.label}
          >
            <span
              className={`text-[11px] font-medium transition-all duration-300 ${
                isActive ? 'text-blue-400 opacity-100' : 'opacity-0 group-hover:opacity-100'
              }`}
              style={!isActive ? { color: 'var(--text-muted)' } : undefined}
            >
              {s.label}
            </span>
            <div
              className={`rounded-full transition-all duration-300 ${
                isActive
                  ? 'w-3 h-3 bg-blue-400 shadow-lg shadow-blue-400/50'
                  : 'w-1.5 h-1.5 group-hover:bg-blue-500 group-hover:scale-125'
              }`}
              style={!isActive ? { background: 'var(--text-muted)' } : undefined}
            />
          </button>
        );
      })}
    </m.div>
  );
}