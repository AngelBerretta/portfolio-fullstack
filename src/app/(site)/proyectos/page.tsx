// src/app/proyectos/page.tsx
import { Breadcrumb } from '@/components/Breadcrumb';
import { getAllProjects } from '@/actions/projects';
import { ProjectsClient } from '@/components/ProjectsClient';
import { PROJECT_FILTER_TABS } from '@/lib/constants';
import { mapProjectsToCardData, splitLiveUpcoming } from '@/components/projects/mapProjects';

export const metadata = {
  title: 'Proyectos — Angel Berretta',
  description: 'Todos los proyectos full stack, frontend y landing pages desarrollados por Angel Berretta.',
};

export default async function ProyectosPage() {
  const allProjects = await getAllProjects();
  const mapped = mapProjectsToCardData(allProjects);
  const { live, upcoming } = splitLiveUpcoming(mapped);

  return (
    <div className="pt-24"> {/* padding para no quedar tapado por el Navbar fixed */}
      <div className="max-w-7xl mx-auto px-6">
        <Breadcrumb items={[{ label: 'Proyectos' }]} />
      </div>
      <ProjectsClient
        projects={live}
        upcomingProjects={upcoming}
        categories={PROJECT_FILTER_TABS}
      />
    </div>
  );
}