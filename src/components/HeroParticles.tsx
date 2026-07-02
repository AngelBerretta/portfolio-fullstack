"use client";

import { useEffect, useState } from 'react';

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  delay: number;
  duration: number;
  color: string;
}

function generateParticles(count: number): Particle[] {
  return Array.from({ length: count }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 2.5 + 0.5,
    delay: Math.random() * 6,
    duration: Math.random() * 5 + 3,
    color: i % 2 === 0 ? '#60A5FA' : '#38BDF8',
  }));
}

export function HeroParticles() {
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    // window no existe en SSR — esto tiene que correr después del mount
    // para no generar un mismatch de hidratación (server renderiza null,
    // acá recién generamos las partículas). No se puede calcular esto
    // durante el render sin romper la hidratación.
    const isMobile = window.matchMedia('(max-width: 768px)').matches;
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setParticles(generateParticles(isMobile ? 15 : 25));
  }, []);

  if (particles.length === 0) return null;

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
      {particles.map((p) => (
        <div
          key={p.id}
          className="particle"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: p.size,
            height: p.size,
            background: p.color,
            '--duration': `${p.duration}s`,
            '--delay': `${p.delay}s`,
          } as React.CSSProperties}
        />
      ))}
    </div>
  );
}