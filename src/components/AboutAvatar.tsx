import Image from 'next/image';
import type { CSSProperties } from 'react';
import { Coffee, Zap, Code2 } from 'lucide-react';

const traits = [
  { icon: <Coffee size={16} />, text: 'Aprendizaje continuo' },
  { icon: <Zap size={16} />, text: 'Entrega rápida' },
  { icon: <Code2 size={16} />, text: 'Clean Code' },
];

export function AboutAvatar({
  isInView,
  avatarUrl,
}: {
  isInView: boolean;
  avatarUrl: string;
}) {
  const revealStyle: CSSProperties = {
    opacity: isInView ? 1 : 0,
    transform: isInView ? 'translate(0, 0)' : 'translateX(-40px)',
    transitionProperty: 'opacity, transform',
    transitionDuration: '0.7s',
    transitionDelay: '0.1s',
    transitionTimingFunction: 'ease',
  };

  return (
    <div style={revealStyle} className="relative flex flex-col items-center gap-6 w-full">
      {}
      <div className="relative">
        {}
        <div className="absolute inset-0 -m-4 rounded-3xl border border-blue-500/20 rotate-3" />
        <div className="absolute inset-0 -m-8 rounded-3xl border border-violet-500/10 -rotate-2" />

        {}
        <div className="relative w-72 h-72 md:w-80 md:h-80 rounded-3xl overflow-hidden border-2 border-blue-500/30 shadow-2xl shadow-blue-500/20 float-anim">
          <Image
            src={avatarUrl}
            alt="Foto de perfil de Angel Berretta"
            fill
            sizes="(max-width: 768px) 288px, 320px"
            className="object-cover"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
        </div>

        {}
        <div
          className="absolute -bottom-4 -right-4 rounded-2xl px-4 py-3 shadow-xl flex items-center gap-2"
          style={{
            background: 'var(--bg-surface)',
            border: '1px solid rgba(59,130,246,0.4)',
          } as CSSProperties}
        >
          <span className="w-2.5 h-2.5 rounded-full bg-green-400 animate-pulse" />
          <span className="text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>
            Open to work
          </span>
        </div>
      </div>

      {}
      <div className="mt-4 flex flex-wrap justify-center gap-2 w-full px-2">
        {traits.map((t) => (
          <div
            key={t.text}
            className="flex items-center gap-1.5 rounded-xl px-3 py-1.5 text-xs shadow-lg whitespace-nowrap"
            style={{
              background: 'var(--bg-card)',
              border: '1px solid var(--border-subtle)',
              color: 'var(--text-secondary)',
            } as CSSProperties}
          >
            <span className="text-blue-400">{t.icon}</span>
            {t.text}
          </div>
        ))}
      </div>
    </div>
  );
}