'use client';

import { useEffect, useRef, useState, type CSSProperties } from 'react';

type RevealDirection = 'up' | 'left' | 'right';

const OFFSETS: Record<RevealDirection, string> = {
  up: 'translateY(30px)',
  left: 'translateX(-40px)',
  right: 'translateX(40px)',
};

interface RevealOptions {
  duration?: number;
  delay?: number;
  /** Propiedades extra (además de opacity/transform) que deben
   *  transicionar en el mismo elemento — ej: hover states existentes,
   *  para no pisar el `transition` que ya trae el className. */
  extraProperties?: string[];
}

/**
 * Reemplazo liviano (sin framer-motion) del patrón `useInView + m.div`
 * repetido en las secciones públicas. Dispara una sola vez, igual que
 * `once: true` en la versión anterior.
 */
export function useReveal<T extends HTMLElement = HTMLDivElement>(
  margin = '-80px'
) {
  const ref = useRef<T>(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      { rootMargin: `0px 0px ${margin} 0px` }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [margin]);

  function style(
    direction: RevealDirection = 'up',
    { duration = 0.6, delay = 0, extraProperties = [] }: RevealOptions = {}
  ): CSSProperties {
    const properties = ['opacity', 'transform', ...extraProperties];
    return {
      opacity: isInView ? 1 : 0,
      transform: isInView ? 'translate(0, 0)' : OFFSETS[direction],
      transitionProperty: properties.join(', '),
      transitionDuration: `${duration}s`,
      transitionDelay: `${delay}s`,
      transitionTimingFunction: 'ease',
    };
  }

  return { ref, isInView, style };
}