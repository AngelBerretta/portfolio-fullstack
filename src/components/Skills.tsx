// Skills.tsx — Server Component: trae las skills de la base de datos,
// las agrupa por categoría con la metadata visual (accent color, path de
// terminal) y le pasa todo resuelto a SkillsClient.
import { getSkillsByCategory } from '@/actions/skills';
import { SkillsClient, type TCategory } from './SkillsClient';

// Metadata visual por categoría — no vive en la DB, es la "piel" de cada
// terminal. El id debe coincidir con el campo `category` de cada Skill.
const CATEGORY_META: Record<string, { path: string; accent: string; hex: string }> = {
  frontend: { path: '~/skills/frontend', accent: 'text-cyan-500', hex: '#22d3ee' },
  backend: { path: '~/skills/backend', accent: 'text-emerald-500', hex: '#4ade80' },
  tools: { path: '~/skills/tools', accent: 'text-violet-500', hex: '#c084fc' },
};

const CATEGORY_ORDER = ['frontend', 'backend', 'tools'];

export default async function Skills() {
  const grouped = await getSkillsByCategory();

  const categories: TCategory[] = CATEGORY_ORDER
    .filter((id) => grouped[id]?.length > 0)
    .map((id) => ({
      id,
      path: CATEGORY_META[id]?.path ?? `~/skills/${id}`,
      accent: CATEGORY_META[id]?.accent ?? 'text-blue-500',
      hex: CATEGORY_META[id]?.hex ?? '#3b82f6',
      list: grouped[id].map((skill) => ({
        pkg: skill.name,
        desc: skill.description ?? '',
        iconUrl: skill.iconUrl,
        iconName: skill.iconName,
        inv: skill.invertIcon,
      })),
    }));

  return <SkillsClient categories={categories} />;
}
