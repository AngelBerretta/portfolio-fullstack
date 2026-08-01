import dynamic from 'next/dynamic';
import { getAllProjects } from '@/actions/projects';
import { PROJECT_FILTER_TABS } from '@/lib/constants';
import { mapProjectsToCardData, splitLiveUpcoming } from './projects/mapProjects';

const ProjectsClient = dynamic(
  () => import('./ProjectsClient').then((mod) => mod.ProjectsClient),
  { ssr: true }
);

export default async function Projects() {
  const allProjects = await getAllProjects();
  const mapped = mapProjectsToCardData(allProjects);

  // Home: solo destacados. El resto vive en /proyectos.
  const featured = mapped.filter((p) => p.featured);
  const { live, upcoming } = splitLiveUpcoming(featured);

  return (
    <ProjectsClient
      projects={live}
      upcomingProjects={upcoming}
      categories={PROJECT_FILTER_TABS}
      totalCount={mapped.length}
      viewAllHref="/proyectos"
    />
  );
}