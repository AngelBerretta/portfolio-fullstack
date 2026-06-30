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

// En desktop: 25 partículas. En mobile: 15.
// Mucho menos que las 50 originales, y sin Framer Motion.
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
    // Detectamos mobile para reducir la cantidad
    const isMobile = window.matchMedia('(max-width: 768px)').matches;
    setParticles(generateParticles(isMobile ? 15 : 25));
  }, []);

  if (particles.length === 0) return null;

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
      {particles.map((p) => (
        <div
          key={p.id}
          // La clase "particle" tiene la animación CSS definida en globals.css
          className="particle"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: p.size,
            height: p.size,
            background: p.color,
            // Variables CSS para que cada partícula tenga su propio timing
            '--duration': `${p.duration}s`,
            '--delay': `${p.delay}s`,
          } as React.CSSProperties}
        />
      ))}
    </div>
  );
}
