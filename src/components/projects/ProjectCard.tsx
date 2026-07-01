import { useRef } from 'react';
import { m, useInView } from 'framer-motion';
import { ExternalLink, Code2, Star } from 'lucide-react';
import Image from 'next/image';
import { GitHubIcon } from '../icons';
import { categoryConfig } from './category-config';
import { TagList } from './TagList';
import type { ProjectCardData } from './types';

export function ProjectCard({
  project,
  index,
}: {
  project: ProjectCardData;
  index: number;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });
  const catCfg = categoryConfig[project.category];

  return (
    <m.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.55, delay: index * 0.07 }}
      className="group relative rounded-2xl overflow-hidden border flex flex-col
        transition-all duration-300
        hover:border-blue-500/40 hover:-translate-y-1
        hover:shadow-xl hover:shadow-blue-500/10
        dark:hover:shadow-blue-500/20
        [background:var(--bg-card)] [border-color:var(--border-subtle)]"
    >
      {/* Featured badge */}
      {project.featured && (
        <div className="absolute top-3 left-3 z-20 flex items-center gap-1.5
          px-2.5 py-1 rounded-lg text-xs font-bold
          bg-gradient-to-r from-yellow-500 to-orange-500
          text-white shadow-lg shadow-yellow-500/30 ring-1 ring-yellow-400/50"
        >
          <Star size={10} fill="currentColor" />
          Destacado
        </div>
      )}

      {/* Imagen */}
      <div className="relative aspect-video overflow-hidden [background:var(--bg-surface)]">
        <Image
          src={project.image}
          alt={project.title}
          fill                                  // ocupa el contenedor relativo
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover object-top
            group-hover:scale-105 transition-transform duration-500
            opacity-90 group-hover:opacity-100"
          loading="lazy"                        // las cards están below-the-fold
        />
        {/* Gradiente base */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />

        {/* Overlay hover — desktop — queda exactamente igual */}
        <div className="hidden md:flex absolute inset-0 opacity-0 group-hover:opacity-100
          transition-opacity duration-300 items-center justify-center gap-3
          bg-gradient-to-t from-black/80 via-black/40 to-transparent"
        >
          <a
            href={project.demoUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="flex items-center gap-1.5 px-4 py-2 rounded-lg
              bg-white text-slate-900 text-xs font-bold
              hover:bg-blue-50 transition-colors shadow-lg
              hover:scale-105 active:scale-95 duration-150"
          >
            <ExternalLink size={13} />
            Demo
          </a>
          <a
            href={project.codeUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="flex items-center gap-1.5 px-4 py-2 rounded-lg
              bg-slate-900/90 text-white text-xs font-bold
              border border-white/20 hover:bg-slate-800
              transition-colors shadow-lg
              hover:scale-105 active:scale-95 duration-150"
          >
            <GitHubIcon className="w-4 h-4" />
            Código
          </a>
        </div>
      </div>

      {/* Contenido */}
      <div className="flex-1 flex flex-col p-5">

        {/* Título + badge categoría */}
        <div className="flex items-start justify-between gap-2 mb-2">
          <h3 className="text-base font-bold leading-snug
            group-hover:text-blue-400 transition-colors [color:var(--text-primary)]"
          >
            {project.title}
          </h3>
          <span className={`shrink-0 text-[10px] font-bold px-2 py-0.5
            rounded-md border ${catCfg.className}`}
          >
            {catCfg.label}
          </span>
        </div>

        {/* Descripción */}
        <p className="text-sm leading-relaxed mb-4 flex-1 [color:var(--text-muted)]">
          {project.description}
        </p>

        {/* Tags con expand */}
        <TagList tags={project.tags} />

        {/* Links footer — solo mobile */}
        <div className="flex md:hidden gap-4 pt-3 border-t [border-color:var(--border-subtle)]">
          <a
            href={project.demoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-xs font-semibold
              text-blue-500 hover:text-blue-400 transition-colors"
          >
            <ExternalLink size={13} />
            Ver demo
          </a>
          <a
            href={project.codeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-xs font-semibold
              transition-colors [color:var(--text-muted)] hover:[color:var(--text-primary)]"
          >
            <Code2 size={13} />
            Ver código
          </a>
        </div>

      </div>
    </m.div>
  );
}
