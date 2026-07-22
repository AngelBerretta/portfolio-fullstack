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
    // requestIdleCallback: generar 15-20 divs con custom properties justo
    // en el mount compite por el hilo principal con la hidratación de
    // Hero/Navbar (candidato directo al long task de Layout del reporte).
    // Diferirlo a un idle slot saca ese trabajo del path crítico sin
    // cambiar el efecto visual. Fallback a setTimeout para Safari, que
    // no soporta requestIdleCallback.
    const isMobile = window.matchMedia('(max-width: 768px)').matches;
    const generate = () => setParticles(generateParticles(isMobile ? 15 : 20));

    if ('requestIdleCallback' in window) {
      const id = requestIdleCallback(generate, { timeout: 500 });
      return () => cancelIdleCallback(id);
    }
    const id = setTimeout(generate, 0);
    return () => clearTimeout(id);
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