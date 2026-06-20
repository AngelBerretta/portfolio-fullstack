import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';
import { getProjectById, updateProject } from '@/actions/projects';
import { getAllTags } from '@/actions/tags';
import { ProjectForm } from '@/components/admin/ProjectForm';

export const metadata = { title: 'Admin — Editar proyecto' };

export default async function EditProjectPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const [project, tags] = await Promise.all([getProjectById(id), getAllTags()]);

  if (!project) {
    notFound();
  }

  // bindeamos el id del proyecto como primer argumento del Server Action
  const action = updateProject.bind(null, id);

  return (
    <div className="p-8 max-w-3xl mx-auto space-y-6">
      <Link
        href="/admin/projects"
        className="inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-white transition"
      >
        <ArrowLeft className="w-4 h-4" />
        Volver a proyectos
      </Link>

      <div>
        <h1 className="text-2xl font-bold text-white">Editar proyecto</h1>
        <p className="text-gray-500 text-sm mt-1">{project.title}</p>
      </div>

      <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">
        <ProjectForm
          project={project}
          allTags={tags.map((t) => t.name)}
          action={action}
        />
      </div>
    </div>
  );
}
