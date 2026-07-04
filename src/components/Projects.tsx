// Projects.tsx — Server Component: trae los proyectos de la base de datos
// y le pasa los datos ya resueltos a ProjectsClient (que mantiene los filtros,
// animaciones y todo lo interactivo).
//
// Igual que en Skills.tsx: ProjectsClient se carga como chunk separado
// (next/dynamic) para no sumar su JS al bundle inicial de la página.
import dynamic from 'next/dynamic';
import { getAllProjects } from '@/actions/projects';
import { PROJECT_FILTER_TABS } from '@/lib/constants';
import type { ProjectCardData } from './projects/types';

const ProjectsClient = dynamic(
  () => import('./ProjectsClient').then((mod) => mod.ProjectsClient),
  { ssr: true }
);

export default async function Projects() {
  const allProjects = await getAllProjects();

  // Mapeamos del shape de Prisma (imageUrl, tags: Tag[]) al shape que
  // esperan ProjectCard/UpcomingCard (image, tags: string[]) sin tocar esos componentes.
  const mapped: ProjectCardData[] = allProjects.map((p) => ({
    id: p.id,
    title: p.title,
    description: p.description,
    image: p.imageUrl,
    tags: p.tags.map((t) => t.name),
    codeUrl: p.codeUrl,
    demoUrl: p.demoUrl,
    category: p.category as 'fullstack' | 'frontend' | 'landing',
    featured: p.featured,
    status: p.status as 'in-progress' | 'coming-soon' | undefined,
    statusLabel: p.statusLabel ?? undefined,
  }));

  // "Live" = sin status. "En construcción" = con status seteado.
  const liveProjects = mapped.filter((p) => !p.status);
  const upcomingProjects = mapped.filter((p) => !!p.status);

  return (
    <ProjectsClient
      projects={liveProjects}
      upcomingProjects={upcomingProjects}
      categories={PROJECT_FILTER_TABS}
    />
  );
}