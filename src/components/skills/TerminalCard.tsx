import './terminal.css';
import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, m } from 'framer-motion';
import { Terminal, ChevronRight } from 'lucide-react';
import { SkillIcon } from './SkillIcon';
import type { TCategory } from './types';

export function TerminalCard({
  cat, enterDelay = 0,
}: {
  cat: TCategory; enterDelay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [isInView, setIsInView] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [expandedSkill, setExpandedSkill] = useState<string | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Dispara una sola vez — controla la animación de entrada.
    const entranceObserver = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          entranceObserver.disconnect();
        }
      },
      { rootMargin: '0px 0px -40px 0px' }
    );

    // Continuo — controla el barrido de scanline (term-card--active)
    // mientras la card esté cerca del viewport.
    const proximityObserver = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { rootMargin: '200px 0px' }
    );

    entranceObserver.observe(el);
    proximityObserver.observe(el);

    return () => {
      entranceObserver.disconnect();
      proximityObserver.disconnect();
    };
  }, []);

  return (
    <div
      ref={ref}
      style={{
        opacity: isInView ? 1 : 0,
        transform: isInView ? 'translateY(0)' : 'translateY(24px)',
        transitionProperty: 'opacity, transform',
        transitionDuration: '0.45s',
        transitionDelay: `${enterDelay}s`,
        transitionTimingFunction: 'cubic-bezier(0.22, 1, 0.36, 1)',
      }}
      className={`term-card relative flex flex-col rounded-xl overflow-hidden font-mono ${isVisible ? 'term-card--active' : ''}`}
    >
      {}
      <div className="term-titlebar flex items-center px-4 py-[10px] border-b flex-shrink-0">
        <div className="flex gap-1.5 flex-shrink-0">
          <div className="w-[11px] h-[11px] rounded-full bg-red-400" />
          <div className="w-[11px] h-[11px] rounded-full bg-yellow-400" />
          <div className="w-[11px] h-[11px] rounded-full bg-green-400" />
        </div>
        <div
          className="flex-1 flex items-center justify-center gap-1.5 text-[11px]"
          style={{ color: 'var(--term-path-color)' }}
        >
          <Terminal size={11} className="flex-shrink-0" />
          <span>user@portfolio:<span className={cat.accent}> {cat.path}</span></span>
        </div>
      </div>

      {}
      <div className="term-body relative flex-1 p-5 overflow-hidden">
        <div className="term-scanlines" aria-hidden />
        <div className="term-sweep" aria-hidden />

        {isInView && (
          <div className="mb-4 text-[11px] space-y-1 animate-[fade-in_0.3s_ease-out_0.06s_backwards]">
            <p className="font-mono" style={{ color: 'var(--term-banner-init)' }}>
              $ tree skills/{cat.id}/ --levels=2
            </p>
            <p className="font-mono font-bold" style={{ color: cat.hex }}>
              skills/{cat.id}/
            </p>
            <div className="pt-3 border-t" style={{ borderColor: 'var(--term-separator)' }} />
          </div>
        )}

        {}
        {isInView && (
          <div className="space-y-[2px] animate-[fade-in_0.35s_ease-out_0.12s_backwards]">
            {cat.list.map((skill, i) => {
              const isLast = i === cat.list.length - 1;
              const isExpanded = expandedSkill === skill.pkg;

              return (
                <div key={skill.pkg}>
                  {}
                  <button
                    onClick={() => setExpandedSkill(isExpanded ? null : skill.pkg)}
                    style={{ animation: `fade-in-row 0.2s ease-out ${0.12 + i * 0.04}s backwards` }}
                    className="skill-row w-full flex items-center gap-2 py-[3px] px-1 rounded
                               hover:bg-white/[0.03] transition-colors text-left group cursor-pointer"
                  >
                    {}
                    <span className="select-none flex-shrink-0 text-[10px]" style={{ color: 'var(--term-tree-guide)' }}>
                      {isLast ? '└──' : '├──'}
                    </span>

                    {}
                    <span className="skill-glitch-icon flex-shrink-0 flex items-center justify-center w-6 h-6 rounded
                                   bg-white/[0.03]">
                      <SkillIcon skill={skill} hex={cat.hex} />
                    </span>

                    {}
                    <span
                      className="text-[12px] group-hover:underline truncate"
                      style={{ color: 'var(--text-primary)' }}
                    >
                      {skill.pkg}
                    </span>

                    {}
                    <span
                      className="flex-shrink-0 ml-auto transition-transform duration-150"
                      style={{
                        color: 'var(--text-muted)',
                        transform: isExpanded ? 'rotate(90deg)' : 'rotate(0deg)',
                      }}
                    >
                      <ChevronRight size={10} />
                    </span>
                  </button>

                  {}
                  <AnimatePresence>
                    {isExpanded && (
                      <m.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.2 }}
                        className="overflow-hidden"
                      >
                        <div
                          className="ml-[28px] mb-1 px-3 py-2 rounded-md text-[11px] leading-relaxed"
                          style={{
                            background: `${cat.hex}08`,
                            borderLeft: `1.5px solid ${cat.hex}40`,
                            color: 'var(--term-desc-color)',
                          }}
                        >
                          {skill.desc}
                        </div>
                      </m.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        )}

        {}
        {isInView && (
          <div
            style={{
              animation: `fade-in 0.25s ease-out ${0.3 + cat.list.length * 0.04}s backwards`,
              borderColor: 'var(--term-separator)',
              color: 'var(--term-banner-init)',
            }}
            className="mt-4 pt-3 border-t text-[12px]"
          >
            {cat.list.length} skills · 0 vulnerabilities
          </div>
        )}
      </div>
    </div>
  );
}