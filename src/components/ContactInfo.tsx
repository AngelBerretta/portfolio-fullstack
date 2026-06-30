// ContactInfo.tsx — stats integrados en el card de disponibilidad, horario compacto
"use client";
import { m } from 'framer-motion';
import { Mail, Phone, MapPin, Clock } from 'lucide-react';

const GitHubIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
    <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
  </svg>
);

const LinkedInIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
  </svg>
);

const contactInfo = [
  {
    icon: <Mail size={20} className="text-blue-400" />,
    label: 'Email',
    value: 'angelcursodeingles2@gmail.com',
    href: 'mailto:angelcursodeingles2@gmail.com',
  },
  {
    icon: <Phone size={20} className="text-sky-400" />,
    label: 'Teléfono',
    value: '+54 9 2346 694273',
    href: 'tel:+5492346694273',
  },
  {
    icon: <MapPin size={20} className="text-violet-400" />,
    label: 'Ubicación',
    value: 'Chivilcoy, Buenos Aires, Argentina',
    href: null,
  },
];

const socialLinks = [
  {
    name: 'GitHub',
    icon: <GitHubIcon />,
    href: 'https://github.com/AngelBerretta',
    color: 'hover:border-white/40 hover:text-white',
  },
  {
    name: 'LinkedIn',
    icon: <LinkedInIcon />,
    href: 'https://linkedin.com/in/angelberretta',
    color: 'hover:border-blue-400/50 hover:text-blue-400',
  },
];

const stats = [
  { value: '2+', label: 'Años exp.' },
  { value: '10+', label: 'Proyectos' },
  { value: '< 24h', label: 'Respuesta' },
];

const schedule = [
  { days: 'Lun — Vie', hours: '9:00 — 21:00' },
  { days: 'Sáb — Dom', hours: '10:00 — 18:00' },
];

export function ContactInfo({ isInView }: { isInView: boolean }) {
  return (
    <m.div
      initial={{ opacity: 0, x: -30 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.6, delay: 0.1 }}
      className="space-y-4"
    >
      {/* ── Availability card + stats integrados ── */}
      <div className="p-6 rounded-2xl bg-gradient-to-br from-blue-500/10 to-violet-500/10 border border-blue-500/25">
        {/* Header del card */}
        <div className="flex items-center gap-3 mb-2">
          <span className="w-3 h-3 rounded-full bg-green-400 animate-pulse" />
          <span className="text-green-400 font-semibold text-sm">Disponible ahora</span>
        </div>
        <h3 className="font-bold text-lg mb-1 [color:var(--text-primary)]">
          Listo para nuevos proyectos
        </h3>
        <p className="text-sm leading-relaxed [color:var(--text-secondary)] mb-4">
          Full Time o por proyecto · Remoto o presencial en Buenos Aires.
        </p>

        {/* Stats dentro del card ── no ocupa bloque extra */}
        <div className="grid grid-cols-3 gap-3 pt-4 border-t [border-color:rgba(59,130,246,0.2)]">
          {stats.map((stat) => (
            <div key={stat.label} className="text-center">
              <p className="text-xl font-black text-blue-400">{stat.value}</p>
              <p className="text-xs mt-0.5 [color:var(--text-muted)]">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ── Contact details ── */}
      <div className="space-y-2">
        {contactInfo.map((item, i) => (
          <m.div
            key={item.label}
            initial={{ opacity: 0, x: -20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.2 + i * 0.1 }}
            className="flex items-center gap-4 p-3.5 rounded-xl border hover:border-blue-500/30 transition-all [background:var(--bg-card)] [border-color:var(--border-subtle)]"
          >
            <div className="p-2 rounded-lg bg-white/5 shrink-0">{item.icon}</div>
            <div className="min-w-0">
              <p className="text-xs font-medium [color:var(--text-muted)]">{item.label}</p>
              {item.href ? (
                <a
                  href={item.href}
                  className="text-sm font-medium truncate block transition-colors [color:var(--text-secondary)] hover:[color:var(--text-primary)]"
                >
                  {item.value}
                </a>
              ) : (
                <p className="text-sm font-medium [color:var(--text-secondary)]">{item.value}</p>
              )}
            </div>
          </m.div>
        ))}
      </div>

      {/* ── Socials + Horario en la misma fila ── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">

        {/* Redes */}
        <div className="p-4 rounded-xl border [background:var(--bg-card)] [border-color:var(--border-subtle)]">
          <p className="text-xs font-semibold uppercase tracking-widest mb-3 [color:var(--text-muted)]">
            Redes
          </p>
          {/* ── gap-3 y w-full para que cada botón ocupe su parte ── */}
          <div className="flex gap-3">
            {socialLinks.map((s) => (
              <a
                key={s.name}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                className={`flex-1 flex items-center justify-center gap-2 p-2.5 rounded-xl border transition-all duration-300 hover:scale-105 ${s.color}`}
                style={{ borderColor: 'var(--border-subtle)', color: 'var(--text-muted)' }}
                aria-label={s.name}
              >
                {s.icon}
                <span className="text-xs font-medium">{s.name}</span>
              </a>
            ))}
          </div>
        </div>

        {/* Horario */}
        <div className="p-4 rounded-xl border [background:var(--bg-card)] [border-color:var(--border-subtle)]">
          <div className="flex items-center gap-1.5 mb-3">
            <Clock size={13} className="text-blue-400 shrink-0" />
            <p className="text-xs font-semibold uppercase tracking-widest [color:var(--text-muted)]">
              Horario
            </p>
          </div>
          <div className="space-y-1">
            {schedule.map((s) => (
              <div key={s.days} className="flex items-center justify-between text-xs">
                <span className="[color:var(--text-secondary)]">{s.days}</span>
                <span className="font-semibold [color:var(--text-primary)]">{s.hours}</span>
              </div>
            ))}
          </div>
          <div className="mt-2.5 pt-2.5 border-t [border-color:var(--border-subtle)] flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse shrink-0" />
            <span className="text-xs [color:var(--text-muted)]">Respondo en &lt; 24hs</span>
          </div>
        </div>

      </div>
    </m.div>
  );
}