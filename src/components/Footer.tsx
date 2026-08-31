"use client";
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { m } from 'framer-motion';          // ← m en vez de motion
import { Code2, Heart } from 'lucide-react';

export default function Footer() {
  const [year, setYear] = useState<number | null>(null);

  useEffect(() => {
    // Se ejecuta solo en el navegador del usuario
    setYear(new Date().getFullYear());
  }, []);

  return (
    <footer className="relative py-10 border-t" style={{ borderColor: 'var(--border-subtle)' }}>
      <div className="max-w-7xl mx-auto px-6">
        <m.div                               // ← m.div en vez de motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="flex flex-col md:flex-row items-center justify-between gap-4"
        >
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-blue-500 flex items-center justify-center">
              <Code2 size={14} className="text-white" />
            </div>
            <span className="text-sm font-bold" style={{ color: 'var(--text-primary)' }}>
              Angel<span className="text-blue-400">.</span>dev
            </span>
          </div>

          {/* Credit */}
          <p className="text-xs flex items-center gap-1.5" style={{ color: 'var(--text-muted)' }}>
            Hecho con{' '}
            <Heart size={11} className="text-rose-500 fill-rose-500" />
            {' '}por{' '}
            <span className="font-medium" style={{ color: 'var(--text-secondary)' }}>Angel Berretta</span>
            {' '}
            <Link
              href="/admin/login"
              className="hover:text-blue-400 transition-colors"
              aria-label="Panel de administración"
            >
              ·
            </Link>
            {' '}
            {/* Si el año aún no cargó en el cliente, mostramos un espacio o texto de carga discreto */}
            <span style={{ color: 'var(--text-muted)' }}>{year || ''}</span>
          </p>

          {/* Stack */}
          <div className="flex items-center gap-2 text-xs" style={{ color: 'var(--text-muted)' }}>
            <span className="px-2 py-0.5 rounded-md" style={{ background: 'var(--footer-stack-bg)', border: '1px solid var(--footer-stack-border)', color: 'var(--text-muted)' }}>Next.js</span>
            <span className="" style={{ color: 'var(--text-faint)' }}>+</span>
            <span className="px-2 py-0.5 rounded-md" style={{ background: 'var(--footer-stack-bg)', border: '1px solid var(--footer-stack-border)', color: 'var(--text-muted)' }}>TypeScript</span>
            <span className="" style={{ color: 'var(--text-faint)' }}>+</span>
            <span className="px-2 py-0.5 rounded-md" style={{ background: 'var(--footer-stack-bg)', border: '1px solid var(--footer-stack-border)', color: 'var(--text-muted)' }}>Tailwind</span>
          </div>
        </m.div>
      </div>
    </footer>
  );
}