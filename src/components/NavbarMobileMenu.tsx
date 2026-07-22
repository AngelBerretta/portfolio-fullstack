"use client";

import './navbar-mobile.css';
import { m, AnimatePresence } from 'framer-motion';   // ← m en vez de motion
import { ChevronRight } from 'lucide-react';

interface NavLink {
  label: string;
  href: string;
  icon: React.ReactNode;
}

interface NavbarMobileMenuProps {
  menuOpen: boolean;
  active: string;
  navLinks: NavLink[];
  onClose: () => void;
  onNavigate: (href: string) => void;
}

export function NavbarMobileMenu({
  menuOpen,
  active,
  navLinks,
  onClose,
  onNavigate,
}: NavbarMobileMenuProps) {
  return (
    <>
      {/* ── Mobile overlay ────────────────────────────────────────────── */}
      <AnimatePresence>
        {menuOpen && (
          <m.div
            key="overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="mobile-menu-overlay md:hidden"
            onClick={onClose}
          />
        )}
      </AnimatePresence>

      {/* ── Mobile menu panel ─────────────────────────────────────────── */}
      <AnimatePresence>
        {menuOpen && (
          <m.div
            key="menu"
            initial={{ opacity: 0, y: -8, scaleY: 0.95 }}
            animate={{ opacity: 1, y: 0,  scaleY: 1 }}
            exit={{ opacity: 0,  y: -8, scaleY: 0.95 }}
            transition={{ duration: 0.22, ease: [0.4, 0, 0.2, 1] }}
            className="mobile-menu-panel md:hidden"
            style={{ transformOrigin: 'top center' }}
          >
            <div className="px-4 py-4">
              <p
                className="text-[11px] font-semibold uppercase tracking-widest mb-2 px-2"
                style={{ color: 'var(--text-muted)' }}
              >
                Navegación
              </p>
              <div className="flex flex-col gap-1 mb-4">
                {navLinks.map((link, i) => {
                  const id = link.href.replace('#', '');
                  const isActive = active === id;
                  return (
                    <m.button
                      key={link.href}
                      initial={{ opacity: 0, x: -12 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.045, duration: 0.2 }}
                      onClick={() => onNavigate(link.href)}
                      className={`mobile-nav-item ${isActive ? 'active' : ''}`}
                    >
                      <span className="nav-icon">
                        <span
                          className={isActive ? 'text-blue-400' : ''}
                          style={!isActive ? { color: 'var(--text-muted)' } : undefined}
                        >
                          {link.icon}
                        </span>
                      </span>
                      <span>{link.label}</span>
                      <ChevronRight size={14} className="nav-chevron text-blue-400" />
                    </m.button>
                  );
                })}
              </div>

              <div className="h-px mb-4" style={{ background: 'var(--border-subtle)' }} />

              <m.a
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.25 }}
                href="/Angel_Berretta_CV_2026.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 w-full px-4 py-3 text-sm font-semibold rounded-xl bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg shadow-blue-500/25 hover:from-blue-500 hover:to-blue-700 hover:shadow-blue-500/50 transition-all duration-300"
                onClick={onClose}
              >
                Descargar CV
              </m.a>
            </div>
          </m.div>
        )}
      </AnimatePresence>
    </>
  );
}
