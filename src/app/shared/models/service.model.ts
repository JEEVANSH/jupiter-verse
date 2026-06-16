export interface ServiceItem {
  id: string;
  title: string;
  icon: string; // The icon key for drawing SVG icons
  description: string;
  benefits: string[];
  ctaText: string;
  category: 'talent' | 'technology';
}
