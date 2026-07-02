import { Code2, Network, MonitorSmartphone, Palette } from 'lucide-react';
import type { TSkill } from './types';

const FALLBACK_ICONS: Record<string, React.ComponentType<{ size?: number }>> = {
  Network,
  MonitorSmartphone,
  Palette,
};

export function SkillIcon({ skill, hex }: { skill: TSkill; hex: string }) {
  if (skill.iconUrl) {
    return (
      // eslint-disable-next-line @next/next/no-img-element -- iconUrl es una URL externa arbitraria cargada desde el admin (devicon.dev u otros CDNs); no podemos precomputar remotePatterns fijos para next/image
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

  const FallbackIcon = skill.iconName ? FALLBACK_ICONS[skill.iconName] : undefined;

  return (
    <span className="skill-icon-node" style={{ color: hex }}>
      {FallbackIcon ? <FallbackIcon size={17} /> : <Code2 size={17} />}
    </span>
  );
}