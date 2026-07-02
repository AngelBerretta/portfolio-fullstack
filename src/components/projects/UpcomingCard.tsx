import { useRef } from 'react';
import { m, useInView } from 'framer-motion';
import { Clock, Hammer } from 'lucide-react';
import { upcomingConfig } from './upcoming-config';
import { TagList } from './TagList';
import type { ProjectCardData } from './types';

export function UpcomingCard({
  project,
  index,
}: {
  project: ProjectCardData;
  index: number;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  const cfg = upcomingConfig[project.title] ?? {
    initials: project.title.slice(0, 2).toUpperCase(),
    gradient: 'from-blue-500/20 via-blue-500/10 to-transparent',
    glowColor: 'rgba(59, 130, 246, 0.3)',
    accentColor: '#3B82F6',
  };

  const isComingSoon = project.status === 'coming-soon';

  // El pill usa el texto cargado en el admin (statusLabel); si no hay,
  // cae a un default según el status.
  const pillLabel = project.statusLabel ?? (isComingSoon ? 'Próximamente' : 'En desarrollo');

  // Texto e ícono del footer también varían según el status.
  const footerText = isComingSoon ? 'Disponible próximamente' : 'En desarrollo activo';
  const FooterIcon = isComingSoon ? Clock : Hammer;

  return (
    <m.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.55, delay: index * 0.08 }}
      className="group relative rounded-2xl border border-dashed flex flex-col
        transition-all duration-300
        hover:-translate-y-1
        [background:var(--bg-card)] [border-color:var(--border-subtle)]
        hover:border-blue-400/40"
      style={{
        boxShadow: 'none',
      }}
      whileHover={{
        boxShadow: `0 16px 40px ${cfg.glowColor}`,
      }}
    >
      {/* Preview placeholder */}
      <div className="relative h-44 rounded-t-2xl overflow-hidden flex items-center
        justify-center [background:var(--bg-surface)] border-b [border-color:var(--border-subtle)]"
      >
        <div className={`absolute inset-0 bg-gradient-to-br ${cfg.gradient}`} />

        {/* Círculos decorativos */}
        <div className="absolute -top-6 -right-6 w-32 h-32 rounded-full opacity-10"
          style={{ background: cfg.accentColor }} />
        <div className="absolute -bottom-6 -left-6 w-24 h-24 rounded-full opacity-10"
          style={{ background: cfg.accentColor }} />

        {/* Logo / initials */}
        <div className="relative z-10 flex flex-col items-center gap-3">
          <m.div
            whileHover={{ scale: 1.08 }}
            transition={{ type: 'spring', stiffness: 300 }}
            className="w-16 h-16 rounded-2xl flex items-center justify-center border-2"
            style={{
              borderColor: `${cfg.accentColor}40`,
              background: `${cfg.accentColor}15`,
              boxShadow: `0 0 28px ${cfg.glowColor}`,
            }}
          >
            <span className="text-xl font-black tracking-tight select-none"
              style={{ color: cfg.accentColor }}
            >
              {cfg.initials}
            </span>
          </m.div>

          {/* Status pill — ahora usa el statusLabel real del proyecto */}
          <span className="text-[10px] font-bold tracking-widest uppercase
            px-3 py-1 rounded-full border flex items-center gap-1.5"
            style={{
              color: cfg.accentColor,
              borderColor: `${cfg.accentColor}40`,
              background: `${cfg.accentColor}10`,
            }}
          >
            <span className="w-1.5 h-1.5 rounded-full animate-pulse"
              style={{ background: cfg.accentColor }} />
            {pillLabel}
          </span>
        </div>
      </div>

      {/* Contenido */}
      <div className="flex-1 flex flex-col p-5">

        <div className="flex items-start justify-between gap-2 mb-2">
          <h3 className="text-base font-bold leading-snug
            group-hover:text-blue-400 transition-colors [color:var(--text-primary)]"
          >
            {project.title}
          </h3>
          <span className="shrink-0 text-[10px] font-bold px-2 py-0.5
            rounded-md border text-blue-600 dark:text-blue-300
            bg-blue-500/10 border-blue-500/30"
          >
            Full Stack
          </span>
        </div>

        <p className="text-sm leading-relaxed mb-4 flex-1 [color:var(--text-muted)]">
          {project.description}
        </p>

        <TagList tags={project.tags} />

        {/* Footer — ícono y texto según status */}
        <div className="flex items-center gap-2 pt-3 border-t text-xs
          [border-color:var(--border-subtle)] [color:var(--text-faint)]"
        >
          <FooterIcon size={12} className="text-amber-500 shrink-0" />
          <span>{footerText}</span>
        </div>

      </div>
    </m.div>
  );
}