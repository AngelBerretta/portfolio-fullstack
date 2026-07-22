'use client';

import { m } from 'framer-motion';
import { TerminalCard } from './TerminalCard';
import type { TCategory } from './types';

export function SkillsClient({ categories }: { categories: TCategory[] }) {
  return (
    <section
      id="skills"
      className="py-24 relative overflow-hidden cv-auto"
      style={{ background: 'var(--bg-base)' }}
    >
      <div className="absolute inset-0 pointer-events-none z-0 global-scanlines" aria-hidden />
      <div className="absolute inset-0 pointer-events-none z-0" aria-hidden>
        <div className="absolute top-0 right-1/4 w-96 h-96 rounded-full blur-3xl bg-cyan-500/[0.04]" />
        <div className="absolute bottom-0 left-1/4 w-96 h-96 rounded-full blur-3xl bg-purple-500/[0.05]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-14 text-center font-mono space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-[11px] border border-green-500/25 bg-green-500/[0.08] text-green-600 dark:text-green-400">
            <span className="w-1.5 h-1.5 rounded-full bg-green-500 dark:bg-green-400 animate-pulse" />
            SYSTEM ONLINE
          </div>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight" style={{ color: 'var(--text-primary)' }}>
            {'> '}&nbsp;Tech_Stack
            <span className="term-blink" style={{ color: 'var(--text-primary)' }}>█</span>
          </h2>
          <p className="font-sans text-sm max-w-md mx-auto" style={{ color: 'var(--text-muted)' }}>
            $ tree skills/ --levels=2
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 lg:gap-6 items-start">
          {categories.map((cat, i) => (
            <TerminalCard key={cat.id} cat={cat} enterDelay={i * 0.1} />
          ))}
        </div>

        {/* Footer */}
        <m.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="text-center text-[11px] font-mono mt-10"
          style={{ color: 'var(--text-faint)' }}
        >
          {'// always learning · always shipping'}
        </m.p>
      </div>
    </section>
  );
}