import type { CSSProperties } from 'react';
import { Clock, Hammer } from 'lucide-react';
import { upcomingConfig } from './upcoming-config';
import { TagList } from './TagList';
import { useReveal } from '@/hooks/useReveal';
import type { ProjectCardData } from './types';

export function UpcomingCard({
  project,
  index,
}: {
  project: ProjectCardData;
  index: number;
}) {
  const { ref, style } = useReveal<HTMLDivElement>('-80px');

  const cfg = upcomingConfig[project.title] ?? {
    initials: project.title.slice(0, 2).toUpperCase(),
    gradient: 'from-blue-500/20 via-blue-500/10 to-transparent',
    glowColor: 'rgba(59, 130, 246, 0.3)',
    accentColor: '***REMOVED***3B82F6',
  };

  const isComingSoon = project.status === 'coming-soon';
  const pillLabel = project.statusLabel ?? (isComingSoon ? 'Próximamente' : 'En desarrollo');
  const footerText = isComingSoon ? 'Disponible próximamente' : 'En desarrollo activo';
  const FooterIcon = isComingSoon ? Clock : Hammer;

  return (
    <div
      ref={ref}
      style={{
        ...style('up', { duration: 0.55, delay: index * 0.08 }),
        '--glow-color': cfg.glowColor,
      } as CSSProperties}
      className="group relative rounded-2xl border border-dashed flex flex-col
        transition-all duration-300
        hover:-translate-y-1 hover-glow
        [background:var(--bg-card)] [border-color:var(--border-subtle)]
        hover:border-blue-400/40"
    >
      {}
      <div className="relative h-44 rounded-t-2xl overflow-hidden flex items-center
        justify-center [background:var(--bg-surface)] border-b [border-color:var(--border-subtle)]"
      >
        <div className={`absolute inset-0 bg-gradient-to-br ${cfg.gradient}`} />

        {}
        <div className="absolute -top-6 -right-6 w-32 h-32 rounded-full opacity-10"
          style={{ background: cfg.accentColor }} />
        <div className="absolute -bottom-6 -left-6 w-24 h-24 rounded-full opacity-10"
          style={{ background: cfg.accentColor }} />

        {}
        <div className="relative z-10 flex flex-col items-center gap-3">
          <div
            className="w-16 h-16 rounded-2xl flex items-center justify-center border-2
              transition-transform duration-300 group-hover:scale-105"
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
          </div>

          {}
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

      {}
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

        {}
        <div className="flex items-center gap-2 pt-3 border-t text-xs
          [border-color:var(--border-subtle)] [color:var(--text-faint)]"
        >
          <FooterIcon size={12} className="text-amber-500 shrink-0" />
          <span>{footerText}</span>
        </div>

      </div>
    </div>
  );
}