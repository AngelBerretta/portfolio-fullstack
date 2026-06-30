"use client";

// ThemeToggle.tsx — botón de cambio de tema claro/oscuro
import { Moon, Sun } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

export function ThemeToggle() {
  const { toggleTheme, isDark } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="theme-toggle"
      // suppressHydrationWarning evita el error en los atributos que
      // difieren entre servidor (siempre 'dark') y cliente (tema real).
      // Es seguro usarlo acá porque el único contenido dinámico es el
      // aria-label y el title — no hay datos sensibles ni estructurales.
      suppressHydrationWarning
      aria-label={isDark ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro'}
      title={isDark ? 'Modo claro' : 'Modo oscuro'}
    >
      <span className="theme-toggle-knob">
        {/*
          Renderizamos ambos íconos siempre.
          El CSS los muestra/oculta según data-theme en el <html>.
          Así el HTML del servidor y del cliente son idénticos
          y React no detecta ninguna diferencia → no hay hydration mismatch.
        */}
        <Moon
          size={10}
          className="text-white theme-icon-dark"
          aria-hidden="true"
        />
        <Sun
          size={10}
          className="text-white theme-icon-light"
          aria-hidden="true"
        />
      </span>
    </button>
  );
}