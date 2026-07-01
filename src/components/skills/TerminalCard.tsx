import { useRef, useState } from 'react';
import { m, useInView, AnimatePresence } from 'framer-motion';
import { Terminal, ChevronRight } from 'lucide-react';
import { SkillIcon } from './SkillIcon';
import type { TCategory } from './types';

export function TerminalCard({
  cat, enterDelay = 0,
}: {
  cat: TCategory; enterDelay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-40px' });
  const [expandedSkill, setExpandedSkill] = useState<string | null>(null);

  return (
    <m.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.45, delay: enterDelay, ease: [0.22, 1, 0.36, 1] }}
      className="term-card relative flex flex-col rounded-xl overflow-hidden font-mono"
    >
      {/* Title bar */}
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

      {/* Body */}
      <div className="term-body relative flex-1 p-5 overflow-hidden">
        <div className="term-scanlines" aria-hidden />
        <div className="term-sweep" aria-hidden />

        <AnimatePresence>
          {isInView && (
            <m.div
              key="banner"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.06 }}
              className="mb-4 text-[11px] space-y-1"
            >
              <p className="font-mono" style={{ color: 'var(--term-banner-init)' }}>
                $ tree skills/{cat.id}/ --levels=2
              </p>
              <p className="font-mono font-bold" style={{ color: cat.hex }}>
                skills/{cat.id}/
              </p>
              <div
                className="pt-3 border-t"
                style={{ borderColor: 'var(--term-separator)' }}
              />
            </m.div>
          )}
        </AnimatePresence>

        {/* Tree */}
        <AnimatePresence>
          {isInView && (
            <m.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.12, duration: 0.35 }}
              className="space-y-[2px]"
            >
              {cat.list.map((skill, i) => {
                const isLast = i === cat.list.length - 1;
                const isExpanded = expandedSkill === skill.pkg;

                return (
                  <div key={skill.pkg}>
                    {/* Línea principal */}
                    <m.button
                      initial={{ opacity: 0, x: -4 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.12 + i * 0.04, duration: 0.2 }}
                      onClick={() => setExpandedSkill(isExpanded ? null : skill.pkg)}
                      style={{ cursor: 'pointer' }}
                      className="skill-row w-full flex items-center gap-2 py-[3px] px-1 rounded
                                 hover:bg-white/[0.03] transition-colors text-left group"
                    >
                      {/* Guías de árbol */}
                      <span className="select-none flex-shrink-0 text-[10px]" style={{ color: 'var(--term-tree-guide)' }}>
                        {isLast ? '└──' : '├──'}
                      </span>

                      {/* Icono */}
                      <span className="skill-glitch-icon flex-shrink-0 flex items-center justify-center w-6 h-6 rounded
                                     bg-white/[0.03]">
                        <SkillIcon skill={skill} hex={cat.hex} />
                      </span>

                      {/* Nombre */}
                      <span
                        className="text-[12px] group-hover:underline truncate"
                        style={{ color: 'var(--text-primary)' }}
                      >
                        {skill.pkg}
                      </span>

                      {/* Flecha expandir */}
                      <m.span
                        animate={{ rotate: isExpanded ? 90 : 0 }}
                        transition={{ duration: 0.15 }}
                        className="flex-shrink-0 ml-auto"
                        style={{ color: 'var(--text-muted)' }}
                      >
                        <ChevronRight size={10} />
                      </m.span>
                    </m.button>

                    {/* Descripción expandible */}
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
            </m.div>
          )}
        </AnimatePresence>

        {/* Footer */}
        <AnimatePresence>
          {isInView && (
            <m.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 + cat.list.length * 0.04 }}
              className="mt-4 pt-3 border-t text-[12px]"
              style={{
                borderColor: 'var(--term-separator)',
                color: 'var(--term-banner-init)',
              }}
            >
              {cat.list.length} skills · 0 vulnerabilities
            </m.div>
          )}
        </AnimatePresence>
      </div>
    </m.div>
  );
}
