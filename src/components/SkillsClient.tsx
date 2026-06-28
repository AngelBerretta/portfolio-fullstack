'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { Network, MonitorSmartphone, Palette, Terminal, Code2 } from 'lucide-react';

// Registro de íconos Lucide disponibles como fallback (cuando la skill no
// tiene iconUrl). Si agregás una skill nueva con un iconName distinto acá,
// agregalo también a este mapa y a AVAILABLE_FALLBACK_ICONS en lib/constants.ts.
const FALLBACK_ICONS: Record<string, React.ComponentType<{ size?: number }>> = {
  Network,
  MonitorSmartphone,
  Palette,
};

export interface TSkill {
  pkg: string;
  desc: string;
  iconUrl?: string | null;
  iconName?: string | null;
  inv?: boolean;
}

export interface TCategory {
  id: string;
  path: string;
  accent: string;
  hex: string;
  list: TSkill[];
}

/* ── Typewriter hook ──────────────────────────────────────────────────────── */
function useTypewriter(text: string, startDelay: number, go: boolean) {
  const [out, setOut] = useState('');
  const [done, setDone] = useState(false);
  const tmr = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  useEffect(() => {
    if (!go) return;
    let i = 0;
    const tick = () => {
      if (i < text.length) {
        i++;
        setOut(text.slice(0, i));
        tmr.current = setTimeout(tick, 26);
      } else {
        setDone(true);
      }
    };
    const start = setTimeout(tick, startDelay);
    return () => { clearTimeout(start); clearTimeout(tmr.current); };
  }, [text, startDelay, go]);

  return { out, done };
}

/* ── SkillLine ────────────────────────────────────────────────────────────── */
function SkillLine({
  skill, index, go, hex,
}: {
  skill: TSkill; index: number; go: boolean; hex: string;
}) {
  const [showResult, setShowResult] = useState(false);
  const { out, done } = useTypewriter(`npm install ${skill.pkg}`, index * 280, go);

  useEffect(() => {
    if (!done) return;
    const t = setTimeout(() => setShowResult(true), 160);
    return () => clearTimeout(t);
  }, [done]);

  const fakeDuration = useRef(
    ((index * 0.37 + 0.42) % 1.5 + 0.3).toFixed(1)
  ).current;

  // Resuelve el ícono: URL (devicon, etc.) o fallback Lucide por nombre.
  const FallbackIcon = skill.iconName ? FALLBACK_ICONS[skill.iconName] : undefined;

  const iconEl = skill.iconUrl ? (
    <img
      src={skill.iconUrl}
      alt=""
      loading="lazy"
      className={`w-5 h-5 object-contain skill-icon-img${
        skill.inv ? ' skill-icon-inv' : ''
      }`}
    />
  ) : (
    <span className="skill-icon-node" style={{ color: hex }}>
      {FallbackIcon ? <FallbackIcon size={17} /> : <Code2 size={17} />}
    </span>
  );

  if (!go && !out) return null;

  return (
    <div>
      {/* Command line */}
      <div className="flex items-center gap-2 font-mono text-[12.5px] py-[2px]">
        <span
          className="select-none flex-shrink-0 font-bold"
          style={{ color: 'var(--term-prompt)' }}
        >
          ❯
        </span>

        <span style={{ color: 'var(--term-cmd-color)' }}>{out}</span>

        {!done && (
          <span
            className="inline-block w-[7px] h-[13px] rounded-[1px] term-blink"
            style={{ background: 'var(--term-cursor-bg)' }}
          />
        )}

        {showResult && (
          <motion.span
            initial={{ opacity: 0, scale: 0.7 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: 'spring', stiffness: 280, damping: 18 }}
            className="term-glow-green select-none text-sm ml-0.5 font-bold"
            style={{ color: 'var(--term-check-color)' }}
          >
            ✓
          </motion.span>
        )}
      </div>

      {/* Result row */}
      <AnimatePresence>
        {showResult && (
          <motion.div
            initial={{ opacity: 0, x: -8, height: 0 }}
            animate={{ opacity: 1, x: 0, height: 'auto' }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.22, ease: 'easeOut' }}
            className="skill-row ml-5 mb-3 mt-0.5 flex items-start gap-2.5 p-2.5 rounded-md"
            style={{
              borderLeft: `1.5px solid ${hex}33`,
              background: 'var(--term-row-bg)',
            }}
          >
            <div
              className="skill-glitch-icon flex-shrink-0 flex items-center
                         justify-center w-7 h-7 rounded-md mt-0.5"
              style={{ background: `${hex}12` }}
            >
              {iconEl}
            </div>

            <div>
              <p
                className="font-mono text-[10px] mb-1.5 tracking-wide
                          flex items-center gap-1.5"
                style={{ color: 'var(--term-added-label)' }}
              >
                added in
                <span
                  className="px-1 py-[1px] rounded text-[9px] font-semibold"
                  style={{
                    color: 'var(--term-added-value)',
                    background: 'var(--term-added-badge-bg)',
                    border: '1px solid var(--term-added-badge-border)',
                    letterSpacing: '0.03em',
                  }}
                >
                  {fakeDuration}s
                </span>
              </p>

              <p
                className="font-sans text-[11.5px] leading-relaxed"
                style={{ color: 'var(--term-desc-color)' }}
              >
                {skill.desc}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ── TerminalCard ─────────────────────────────────────────────────────────── */
function TerminalCard({
  cat, enterDelay = 0,
}: {
  cat: TCategory; enterDelay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-60px' });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 28 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.52, delay: enterDelay, ease: [0.22, 1, 0.36, 1] }}
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
          <span>
            user@portfolio:
            <span className={cat.accent}> {cat.path}</span>
          </span>
        </div>
      </div>

      {/* Body */}
      <div className="term-body relative flex-1 p-5 overflow-hidden">
        <div className="term-scanlines" aria-hidden />
        <div className="term-sweep" aria-hidden />

        <AnimatePresence>
          {isInView && (
            <motion.div
              key="banner"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.08 }}
              className="mb-5 text-[11px] space-y-0.5"
            >
              <p
                className="font-mono"
                style={{ color: 'var(--term-banner-init)' }}
              >
                {`// Initiating skill deployment...`}
              </p>

              <p className={`font-mono ${cat.accent}`}>
                {`$ cd `}{cat.path}&nbsp;
                <span className="term-blink">█</span>
              </p>

              <div
                className="pt-3 border-t"
                style={{ borderColor: 'var(--term-separator)' }}
              />
            </motion.div>
          )}
        </AnimatePresence>

        <div className="relative z-10">
          {cat.list.map((skill, i) => (
            <SkillLine
              key={skill.pkg}
              skill={skill}
              index={i}
              go={isInView}
              hex={cat.hex}
            />
          ))}
        </div>
      </div>
    </motion.div>
  );
}

/* ── Section ──────────────────────────────────────────────────────────────── */
export function SkillsClient({ categories }: { categories: TCategory[] }) {
  return (
    <section
      id="skills"
      className="py-24 relative overflow-hidden"
      style={{ background: 'var(--bg-base)' }}
    >
      <div
        className="absolute inset-0 pointer-events-none z-0 global-scanlines"
        aria-hidden
      />

      <div className="absolute inset-0 pointer-events-none z-0" aria-hidden>
        <div className="absolute top-0 right-1/4 w-96 h-96 rounded-full
                        blur-3xl bg-cyan-500/[0.04]" />
        <div className="absolute bottom-0 left-1/4 w-96 h-96 rounded-full
                        blur-3xl bg-purple-500/[0.05]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-14 text-center font-mono space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full
                          text-[11px] border border-green-500/25
                          bg-green-500/[0.08] text-green-600
                          dark:text-green-400">
            <span className="w-1.5 h-1.5 rounded-full bg-green-500
                             dark:bg-green-400 animate-pulse" />
            SYSTEM ONLINE
          </div>

          <h2
            className="text-4xl md:text-5xl font-bold tracking-tight"
            style={{ color: 'var(--text-primary)' }}
          >
            {'> '}&nbsp;Tech_Stack
            <span
              className="term-blink"
              style={{ color: 'var(--text-primary)' }}
            >
              █
            </span>
          </h2>

          <p
            className="font-sans text-sm max-w-md mx-auto"
            style={{ color: 'var(--text-muted)' }}
          >
            Initializing module dependencies.
            Scroll to execute installation scripts.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 lg:gap-6 items-start">
          {categories.map((cat, i) => (
            <TerminalCard key={cat.id} cat={cat} enterDelay={i * 0.12} />
          ))}
        </div>

        {/* Footer */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="text-center text-[11px] font-mono mt-10"
          style={{ color: 'var(--text-faint)' }}
        >
          {'// always learning · always shipping'}
        </motion.p>
      </div>
    </section>
  );
}
