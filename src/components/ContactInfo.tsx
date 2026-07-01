// ContactInfo.tsx — stats integrados en el card de disponibilidad, horario compacto
"use client";
import { m } from 'framer-motion';
import { Mail, Phone, MapPin, Clock } from 'lucide-react';
import { GitHubIcon, LinkedInIcon } from './icons';

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