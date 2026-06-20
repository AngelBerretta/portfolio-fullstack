// ProjectCards.tsx — tarjetas de proyectos live y en desarrollo
import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { ExternalLink, Code2, Star, Clock } from 'lucide-react';

// Mismo shape que el `Project` original de types/index.ts, salvo `id: string`
// (en la base de datos los IDs son cuid, no números autoincrementales).
export interface ProjectCardData {
  id: string;
  title: string;
  description: string;
  image: string;
  tags: string[];
  codeUrl: string;
  demoUrl: string;
  category: 'fullstack' | 'frontend' | 'landing';
  featured?: boolean;
  status?: 'live' | 'coming-soon' | 'in-progress';
  statusLabel?: string;
}

const GitHubIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
    <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
  </svg>
);

export function ProjectCard({ project, index }: { project: ProjectCardData; index: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.55, delay: index * 0.08 }}
      className="group relative rounded-2xl overflow-hidden border hover:border-blue-500/40 transition-all duration-400 card-glow flex flex-col [background:var(--bg-card)] [border-color:var(--border-subtle)]"
    >
      {/* Featured badge */}
      {project.featured && (
        <div className="absolute top-3 left-3 z-20 flex items-center gap-1.5 
          px-2.5 py-1 rounded-lg text-xs font-bold
          bg-gradient-to-r from-yellow-500 to-orange-500  
          text-white
          shadow-lg shadow-yellow-500/40
          ring-1 ring-yellow-400/60
          drop-shadow-md"
        >
          <Star size={10} fill="currentColor" />
          Destacado
        </div>
      )}

      {/* Image */}
      <div className="relative aspect-video overflow-hidden [background:var(--bg-surface)]">
        <img
          src={project.image}
          alt={project.title}
          className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500 opacity-85 group-hover:opacity-100"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#050816] via-[#050816]/20 to-transparent" />

        {/* Overlay hover — SOLO desktop (hidden en mobile) */}
        <div className="hidden md:flex absolute inset-0 bg-blue-900/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 items-center justify-center gap-3">
          <a
            href={project.demoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-white text-slate-900 text-xs font-bold hover:bg-blue-100 transition-colors shadow-lg"
            onClick={(e) => e.stopPropagation()}
          >
            <ExternalLink size={13} />
            Demo
          </a>
          <a
            href={project.codeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-slate-900/90 text-white text-xs font-bold border border-white/20 hover:bg-slate-800 transition-colors shadow-lg"
            onClick={(e) => e.stopPropagation()}
          >
            <GitHubIcon />
            Código
          </a>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 flex flex-col p-5">
        <div className="flex items-start justify-between gap-2 mb-2">
          <h3 className="text-base font-bold group-hover:text-blue-400 transition-colors [color:var(--text-primary)]">
            {project.title}
          </h3>
          <span className={`shrink-0 text-[10px] font-bold px-2 py-0.5 rounded-md border ${
            project.category === 'fullstack'
              ? 'text-blue-300 bg-blue-500/10 border-blue-500/30'
              : project.category === 'frontend'
              ? 'text-sky-300 bg-sky-500/10 border-sky-500/30'
              : 'text-violet-300 bg-violet-500/10 border-violet-500/30'
          }`}>
            {project.category === 'fullstack' ? 'Full Stack' : project.category === 'frontend' ? 'Frontend' : 'Landing'}
          </span>
        </div>

        <p className="text-sm leading-relaxed mb-4 flex-1 [color:var(--text-muted)]">
          {project.description}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="px-2 py-0.5 rounded-md text-[11px] font-medium border [background:var(--bg-card)] [border-color:var(--border-subtle)] [color:var(--text-muted)]"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Links footer — SOLO mobile (hidden en desktop) */}
        <div className="flex md:hidden gap-3 pt-3 border-t [border-color:var(--border-subtle)]">
          <a
            href={project.demoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-xs font-semibold text-blue-400 hover:text-blue-300 transition-colors"
          >
            <ExternalLink size={13} />
            Ver demo
          </a>
          <a
            href={project.codeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-xs font-semibold transition-colors [color:var(--text-muted)] hover:[color:var(--text-primary)]"
          >
            <Code2 size={13} />
            Ver código
          </a>
        </div>
      </div>
    </motion.div>
  );
}

// ─── Upcoming Card ─────────────────────────────────────────────────────────────
const upcomingConfig: Record<string, {
  initials: string;
  gradient: string;
  glowColor: string;
  accentColor: string;
}> = {
  'BookWise': {
    initials: 'BW',
    gradient: 'from-violet-500/20 via-purple-500/10 to-transparent',
    glowColor: 'rgba(139, 92, 246, 0.3)',
    accentColor: '#8B5CF6',
  },
  'MindMap AI': {
    initials: 'MM',
    gradient: 'from-cyan-500/20 via-blue-500/10 to-transparent',
    glowColor: 'rgba(6, 182, 212, 0.3)',
    accentColor: '#06B6D4',
  },
};

export function UpcomingCard({ project, index }: { project: ProjectCardData; index: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  const config = upcomingConfig[project.title] ?? {
    initials: project.title.slice(0, 2).toUpperCase(),
    gradient: 'from-blue-500/20 via-blue-500/10 to-transparent',
    glowColor: 'rgba(59, 130, 246, 0.3)',
    accentColor: '#3B82F6',
  };

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.55, delay: index * 0.08 }}
      className="group relative rounded-2xl border border-dashed border-blue-500/30
        [background:var(--bg-card)] hover:border-blue-400/50 
        transition-colors duration-300 flex flex-col"
    >
      <div className="relative h-48 rounded-t-2xl overflow-hidden flex items-center 
        justify-center [background:var(--bg-surface)] border-b [border-color:var(--border-subtle)]">

        <div className={`absolute inset-0 bg-gradient-to-br ${config.gradient}`} />

        <div
          className="absolute -top-6 -right-6 w-32 h-32 rounded-full opacity-10"
          style={{ background: config.accentColor }}
        />
        <div
          className="absolute -bottom-6 -left-6 w-24 h-24 rounded-full opacity-10"
          style={{ background: config.accentColor }}
        />

        <div className="relative z-10 flex flex-col items-center gap-3">
          <div
            className="w-20 h-20 rounded-2xl flex items-center justify-center
              border-2 transition-colors duration-300 
              group-hover:scale-105 transition-transform"
            style={{
              borderColor: `${config.accentColor}40`,
              background: `${config.accentColor}15`,
              boxShadow: `0 0 30px ${config.glowColor}`,
            }}
          >
            <span
              className="text-2xl font-black tracking-tight select-none"
              style={{ color: config.accentColor }}
            >
              {config.initials}
            </span>
          </div>

          <span
            className="text-[10px] font-bold tracking-widest uppercase px-3 py-1 
              rounded-full border"
            style={{
              color: config.accentColor,
              borderColor: `${config.accentColor}40`,
              background: `${config.accentColor}10`,
            }}
          >
            En desarrollo
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 flex flex-col p-5">
        <div className="flex items-start justify-between gap-2 mb-2">
          <h3 className="text-base font-bold group-hover:text-blue-400 
            transition-colors [color:var(--text-primary)]">
            {project.title}
          </h3>
          <span className="shrink-0 text-[10px] font-bold px-2 py-0.5 
            rounded-md border text-blue-500 bg-blue-500/10 border-blue-500/30">
            Full Stack
          </span>
        </div>

        <p className="text-sm leading-relaxed mb-4 flex-1 [color:var(--text-muted)]">
          {project.description}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="px-2 py-0.5 rounded-md text-[11px] font-medium border
                [background:var(--bg-card)] [border-color:var(--border-subtle)] 
                [color:var(--text-muted)]"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Footer */}
        <div className="flex items-center gap-2 pt-3 border-t text-xs
          [border-color:var(--border-subtle)] [color:var(--text-faint)]">
          <Clock size={12} className="text-amber-500" />
          <span>Disponible próximamente</span>
        </div>
      </div>
    </motion.div>
  );
}
