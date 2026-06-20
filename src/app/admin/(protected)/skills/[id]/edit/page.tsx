import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';
import { getSkillById, updateSkill } from '@/actions/skills';
import { SkillForm } from '@/components/admin/SkillForm';

export const metadata = { title: 'Admin — Editar tecnología' };

export default async function EditSkillPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const skill = await getSkillById(id);

  if (!skill) {
    notFound();
  }

  const action = updateSkill.bind(null, id);

  return (
    <div className="p-8 max-w-2xl mx-auto space-y-6">
      <Link
        href="/admin/skills"
        className="inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-white transition"
      >
        <ArrowLeft className="w-4 h-4" />
        Volver a tecnologías
      </Link>

      <div>
        <h1 className="text-2xl font-bold text-white">Editar tecnología</h1>
        <p className="text-gray-500 text-sm mt-1">{skill.name}</p>
      </div>

      <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">
        <SkillForm skill={skill} action={action} />
      </div>
    </div>
  );
}
