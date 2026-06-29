"use client";

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Code2, Home, User, Zap, FolderOpen, Mail } from 'lucide-react';
import { ThemeToggle } from './ThemeToggle';
import { NavbarMobileMenu } from './NavbarMobileMenu';

const navLinks = [
  { label: 'Inicio',    href: '#hero',     icon: <Home      size={16} /> },
  { label: 'Sobre mí', href: '#about',    icon: <User      size={16} /> },
  { label: 'Skills',   href: '#skills',   icon: <Zap       size={16} /> },
  { label: 'Proyectos',href: '#projects', icon: <FolderOpen size={16} /> },
  { label: 'Contacto', href: '#contact',  icon: <Mail      size={16} /> },
];

export default function Navbar() {
  const [scrolled,  setScrolled]  = useState(false);
  const [active,    setActive]    = useState('hero');
  const [menuOpen,  setMenuOpen]  = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
      const sections = ['hero', 'about', 'skills', 'projects', 'contact'];
      let current = 'hero';
      for (const id of sections) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= 80) current = id;
      }
      setActive(current);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lock body scroll when menu is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  const handleNav = (href: string) => {
    setMenuOpen(false);
    const id = href.replace('#', '');
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? 'backdrop-blur-xl shadow-lg shadow-black/20'
            : 'bg-transparent'
        }`}
        style={scrolled ? { background: 'var(--bg-nav)' } : undefined}
      >
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">

          {/* ── Logo ─────────────────────────────────────────────────── */}
          <button
            onClick={() => handleNav('#hero')}
            className="flex items-center gap-2 group"
          >
            <div className="w-9 h-9 rounded-xl bg-blue-500 flex items-center justify-center shadow-lg shadow-blue-500/30 group-hover:shadow-blue-500/50 transition-all duration-300">
              <Code2 size={18} className="text-white" />
            </div>
            <span className="font-bold tracking-tight" style={{ color: 'var(--text-primary)' }}>
              Angel<span className="text-blue-400">.</span>dev
            </span>
          </button>

          {/* ── Desktop nav ──────────────────────────────────────────── */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => {
              const id = link.href.replace('#', '');
              const isActive = active === id;
              return (
                <button
                  key={link.href}
                  onClick={() => handleNav(link.href)}
                  className={`relative px-4 py-2 text-sm font-medium rounded-lg transition-all duration-300 ${
                    isActive ? '' : 'hover:opacity-100'
                  }`}
                  style={{ color: isActive ? 'var(--text-primary)' : 'var(--text-muted)' }}
                >
                  {isActive && (
                    <motion.span
                      layoutId="nav-active"
                      className="absolute inset-0 rounded-lg"
                      style={{
                        background: 'rgba(59,130,246,0.12)',
                        border: '1px solid rgba(59,130,246,0.28)',
                      }}
                      transition={{ type: 'spring', bounce: 0.3, duration: 0.4 }}
                    />
                  )}
                  <span className="relative z-10">{link.label}</span>
                </button>
              );
            })}

            {/* Theme toggle */}
            <div className="ml-2">
              <ThemeToggle />
            </div>

            <a
              href="/Angel_Berretta_CV_2026.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="ml-3 px-4 py-2 text-sm font-semibold rounded-lg bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg shadow-blue-500/25 hover:from-blue-500 hover:to-blue-700 hover:shadow-blue-500/50 hover:scale-105 transition-all duration-300"
            >
              Descargar CV
            </a>
          </nav>

          {/* ── Mobile right side ─────────────────────────────────────── */}
          <div className="md:hidden flex items-center gap-3">
            <ThemeToggle />
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className={`hamburger-btn ${menuOpen ? 'is-open' : ''}`}
              aria-label={menuOpen ? 'Cerrar menú' : 'Abrir menú'}
              aria-expanded={menuOpen}
            >
              <motion.div
                animate={menuOpen ? 'open' : 'closed'}
                className="flex flex-col justify-center items-center gap-[5px] w-5"
              >
                <motion.span
                  variants={{
                    closed: { rotate: 0,   y: 0,   scaleX: 1 },
                    open:   { rotate: 45,  y: 7,   scaleX: 1 },
                  }}
                  transition={{ duration: 0.25, ease: 'easeInOut' }}
                  className="block h-[1.5px] w-5 rounded-full bg-current origin-center"
                  style={{ color: 'var(--text-secondary)' }}
                />
                <motion.span
                  variants={{
                    closed: { opacity: 1, scaleX: 1 },
                    open:   { opacity: 0, scaleX: 0 },
                  }}
                  transition={{ duration: 0.15 }}
                  className="block h-[1.5px] w-4 rounded-full bg-current origin-center"
                  style={{ color: 'var(--text-secondary)' }}
                />
                <motion.span
                  variants={{
                    closed: { rotate: 0,   y: 0,   scaleX: 0.75 },
                    open:   { rotate: -45, y: -7,  scaleX: 1    },
                  }}
                  transition={{ duration: 0.25, ease: 'easeInOut' }}
                  className="block h-[1.5px] w-5 rounded-full bg-current origin-center"
                  style={{ color: 'var(--text-secondary)' }}
                />
              </motion.div>
            </button>
          </div>
        </div>
      </motion.header>

      <NavbarMobileMenu
        menuOpen={menuOpen}
        active={active}
        navLinks={navLinks}
        onClose={() => setMenuOpen(false)}
        onNavigate={handleNav}
      />
    </>
  );
}
