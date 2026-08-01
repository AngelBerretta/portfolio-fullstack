import type { Project, Tag } from '@prisma/client';
import type { ProjectCardData } from './types';

type ProjectWithTags = Project & { tags: Tag[] };

export function mapProjectsToCardData(projects: ProjectWithTags[]): ProjectCardData[] {
  return projects.map((p) => ({
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
}

export function splitLiveUpcoming(projects: ProjectCardData[]) {
  return {
    live: projects.filter((p) => !p.status),
    upcoming: projects.filter((p) => !!p.status),
  };
}