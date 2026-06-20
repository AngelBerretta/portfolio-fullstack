'use client';

import { useRef, useState } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { Layers, Code2, Layout, Globe, Clock } from 'lucide-react';
import { ProjectCard, UpcomingCard, type ProjectCardData } from './ProjectCards';

type CategoryTab = { id: string; label: string };

const getCategoryIcon = (categoryId: string) => {
  switch (categoryId) {
    case 'all':       return <Layers   size={16} />;
    case 'fullstack': return <Code2    size={16} />;
    case 'frontend':  return <Layout   size={16} />;
    case 'landing':   return <Globe    size={16} />;
    default:          return <Layers   size={16} />;
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

  const filtered = activeCategory === 'all'
    ? projects
    : projects.filter((p) => p.category === activeCategory);

  const showUpcoming = activeCategory === 'all' || activeCategory === 'fullstack';

  return (
    <section id="projects" className="relative py-28 overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-1/4 w-80 h-80 bg-violet-600/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-1/4 w-72 h-72 bg-blue-600/10 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6" ref={ref}>
        {/* Header */}
        <motion.div
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
        </motion.div>

        {/* Filter tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="flex flex-wrap justify-center gap-2 mb-10"
        >
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`relative px-5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-300 flex items-center gap-1.5 ${
                activeCategory === cat.id
                  ? 'bg-blue-500 text-white shadow-lg shadow-blue-500/30 scale-105'
                  : 'border hover:border-blue-500/40 hover:bg-blue-500/10 [background:var(--bg-card)] [border-color:var(--border-subtle)] [color:var(--text-muted)] hover:[color:var(--text-primary)]'
              }`}
            >
              {getCategoryIcon(cat.id)}
              {cat.label}
              {activeCategory === cat.id && (
                <motion.span
                  layoutId="filter-pill"
                  className="absolute inset-0 rounded-xl bg-blue-500 -z-10"
                />
              )}
            </button>
          ))}
        </motion.div>

        {/* Grid — proyectos live */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5"
          >
            {filtered.map((project, i) => (
              <ProjectCard key={project.id} project={project} index={i} />
            ))}
          </motion.div>
        </AnimatePresence>

        {/* Proyectos en construcción */}
        <AnimatePresence>
          {showUpcoming && upcomingProjects.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ duration: 0.4, delay: 0.2 }}
              className="mt-10"
            >
              <div className="flex items-center gap-3 mb-5">
                <div className="flex-1 h-px bg-white/5" />
                <span className="flex items-center gap-2 text-xs font-semibold text-amber-400/80 tracking-widest uppercase">
                  <Clock size={12} />
                  En construcción
                </span>
                <div className="flex-1 h-px bg-white/5" />
              </div>

              <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                {upcomingProjects.map((project, i) => (
                  <UpcomingCard key={project.id} project={project} index={i} />
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Count */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.8 }}
          className="text-center text-sm mt-8 [color:var(--text-muted)]"
        >
          Mostrando{' '}
          <span className="text-blue-400 font-semibold">{filtered.length}</span> proyectos live
          {showUpcoming && upcomingProjects.length > 0 && (
            <> + <span className="text-amber-400 font-semibold">{upcomingProjects.length}</span> en construcción</>
          )}
        </motion.p>
      </div>
    </section>
  );
}
