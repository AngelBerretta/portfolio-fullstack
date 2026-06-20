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
      aria-label={isDark ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro'}
      title={isDark ? 'Modo claro' : 'Modo oscuro'}
    >
      <span className="theme-toggle-knob">
        {isDark
          ? <Moon  size={10} className="text-white" />
          : <Sun   size={10} className="text-white" />}
      </span>
    </button>
  );
}
