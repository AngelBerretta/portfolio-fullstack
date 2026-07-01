export interface ProjectCardData {
  id: string;
  title: string;
  description: string;
  image: string;
  tags: string[];
  codeUrl: string;
  demoUrl: string;
  category: 'fullstack' | 'frontend' | 'landing';
  featured?: boolean;
  status?: 'live' | 'coming-soon' | 'in-progress';
  statusLabel?: string;
}
