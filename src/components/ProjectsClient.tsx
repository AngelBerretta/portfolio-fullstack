// ProjectsClient.tsx
'use client';

import { useRef, useState } from 'react';
import { m, useInView, AnimatePresence } from 'framer-motion';
import { Layers, Code2, Layout, Globe, Clock } from 'lucide-react';
import { ProjectCard, UpcomingCard, type ProjectCardData } from './ProjectCards';

type CategoryTab = { id: string; label: string };

const getCategoryIcon = (categoryId: string) => {
  switch (categoryId) {
    case 'all':       return <Layers  size={15} />;
    case 'fullstack': return <Code2   size={15} />;
    case 'frontend':  return <Layout  size={15} />;
    case 'landing':   return <Globe   size={15} />;
    default:          return <Layers  size={15} />;
  }
};

export function ProjectsClient({
  projects,
  upcomingProjects,
  categories,
}: {
  projects: ProjectCardData[];
  upcomingProjects: ProjectCardData[];
  categories: readonly CategoryTab[];
}) {
  const [activeCategory, setActiveCategory] = useState('all');
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const filtered =
    activeCategory === 'all'
      ? projects
      : projects.filter((p) => p.category === activeCategory);

  const showUpcoming =
    activeCategory === 'all' || activeCategory === 'fullstack';

  return (
    <section id="projects" className="relative py-28 overflow-hidden">
      {/* Glow orbs */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-1/4 w-80 h-80 bg-violet-600/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-1/4 w-72 h-72 bg-blue-600/10 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6" ref={ref}>

        {/* ── Header ── */}
        <m.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <span className="text-blue-400 font-mono text-sm font-semibold tracking-widest uppercase mb-3 block">
            03. Proyectos
          </span>
          <h2 className="text-4xl md:text-5xl font-black mb-4 [color:var(--text-primary)]">
            Lo que he construido
          </h2>
          <p className="max-w-xl mx-auto text-base [color:var(--text-muted)]">
            Una selección de proyectos freelance, personales y full stack en desarrollo.
          </p>
          <div className="w-20 h-1 bg-gradient-to-r from-blue-500 to-violet-400 rounded-full mx-auto mt-5" />
        </m.div>

        {/* ── Filter tabs ── */}
        <m.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="flex flex-wrap justify-center gap-2 mb-12"
        >
          {categories.map((cat) => {
            const isActive = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`
                  relative px-5 py-2.5 rounded-xl text-sm font-semibold
                  transition-all duration-300 flex items-center gap-2
                  ${isActive
                    ? 'text-white shadow-lg shadow-blue-500/25 scale-105'
                    : '[background:var(--bg-card)] [border-color:var(--border-subtle)] [color:var(--text-muted)] border hover:border-blue-500/40 hover:bg-blue-500/10 hover:[color:var(--text-primary)]'
                  }
                `}
              >
                {/* Pill animado para el tab activo */}
                {isActive && (
                  <m.span
                    layoutId="filter-pill"
                    className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-500 to-blue-600 -z-10"
                    transition={{ type: 'spring', bounce: 0.2, duration: 0.5 }}
                  />
                )}
                {getCategoryIcon(cat.id)}
                {cat.label}
                {/* Contador de proyectos por categoría */}
                <span className={`
                  text-[10px] font-bold px-1.5 py-0.5 rounded-md min-w-[20px] text-center
                  ${isActive
                    ? 'bg-white/20 text-white'
                    : 'bg-blue-500/10 text-blue-400 [border:1px_solid_rgba(59,130,246,0.2)]'
                  }
                `}>
                  {cat.id === 'all'
                    ? projects.length
                    : projects.filter((p) => p.category === cat.id).length}
                </span>
              </button>
            );
          })}
        </m.div>

        {/* ── Grid proyectos live ── */}
        <AnimatePresence mode="wait">
          <m.div
            key={activeCategory}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {filtered.length > 0 ? (
              filtered.map((project, i) => (
                <ProjectCard key={project.id} project={project} index={i} />
              ))
            ) : (
              /* Empty state */
              <m.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="col-span-full flex flex-col items-center justify-center py-20 gap-4"
              >
                <div className="w-16 h-16 rounded-2xl flex items-center justify-center [background:var(--bg-card)] border [border-color:var(--border-subtle)]">
                  <Layers size={28} className="text-blue-400/50" />
                </div>
                <p className="text-sm font-medium [color:var(--text-muted)]">
                  No hay proyectos en esta categoría aún
                </p>
              </m.div>
            )}
          </m.div>
        </AnimatePresence>

        {/* ── Proyectos en construcción ── */}
        <AnimatePresence>
          {showUpcoming && upcomingProjects.length > 0 && (
            <m.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ duration: 0.4, delay: 0.2 }}
              className="mt-14"
            >
              {/* Separador */}
              <div className="flex items-center gap-4 mb-8">
                <div className="flex-1 h-px [background:var(--border-subtle)]" />
                <div className="flex items-center gap-2 px-4 py-1.5 rounded-full border [border-color:var(--border-subtle)] [background:var(--bg-card)]">
                  <Clock size={12} className="text-amber-500" />
                  <span className="text-xs font-semibold text-amber-500 dark:text-amber-400 tracking-widest uppercase">
                    En construcción
                  </span>
                  <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-md bg-amber-500/10 text-amber-500 border border-amber-500/20">
                    {upcomingProjects.length}
                  </span>
                </div>
                <div className="flex-1 h-px [background:var(--border-subtle)]" />
              </div>

              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {upcomingProjects.map((project, i) => (
                  <UpcomingCard key={project.id} project={project} index={i} />
                ))}
              </div>
            </m.div>
          )}
        </AnimatePresence>

        {/* ── Footer contador ── */}
        <m.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.8 }}
          className="flex items-center justify-center gap-3 mt-12"
        >
          <div className="h-px w-16 [background:var(--border-subtle)]" />
          <p className="text-sm [color:var(--text-muted)]">
            <span className="text-blue-400 font-bold">{filtered.length}</span>
            {' '}proyecto{filtered.length !== 1 ? 's' : ''} live
            {showUpcoming && upcomingProjects.length > 0 && (
              <>
                {' '}·{' '}
                <span className="text-amber-500 font-bold">{upcomingProjects.length}</span>
                {' '}en construcción
              </>
            )}
          </p>
          <div className="h-px w-16 [background:var(--border-subtle)]" />
        </m.div>

      </div>
    </section>
  );
}