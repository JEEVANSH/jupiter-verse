export interface ProjectItem {
  id: string;
  title: string;
  description: string;
  technologies: string[];
  category: 'all' | 'talent' | 'technology' | 'featured' | 'angular' | 'springboot';
  isFeatured?: boolean;
  achievements?: string[];
  link?: string;
}
