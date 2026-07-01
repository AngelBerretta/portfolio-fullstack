import { Code2, Network, MonitorSmartphone, Palette } from 'lucide-react';
import type { TSkill } from './types';

// Registro de íconos Lucide disponibles como fallback (cuando la skill no
// tiene iconUrl). Si agregás una skill nueva con un iconName distinto acá,
// agregalo también a este mapa y a AVAILABLE_FALLBACK_ICONS en lib/constants.ts.
const FALLBACK_ICONS: Record<string, React.ComponentType<{ size?: number }>> = {
  Network,
  MonitorSmartphone,
  Palette,
};

export function SkillIcon({ skill, hex }: { skill: TSkill; hex: string }) {
  if (skill.iconUrl) {
    return (
      <img
        src={skill.iconUrl}
        alt=""
        loading="lazy"
        className={`w-5 h-5 object-contain skill-icon-img${
          skill.inv ? ' skill-icon-inv' : ''
        }`}
      />
    );
  }

  // Antes esto siempre caía a Code2 — ahora primero busca el ícono real
  // por iconName (Network, MonitorSmartphone, Palette) y solo si no hay
  // ninguno coincidente usa el genérico como último recurso.
  const FallbackIcon = skill.iconName ? FALLBACK_ICONS[skill.iconName] : undefined;

  return (
    <span className="skill-icon-node" style={{ color: hex }}>
      {FallbackIcon ? <FallbackIcon size={17} /> : <Code2 size={17} />}
    </span>
  );
}
