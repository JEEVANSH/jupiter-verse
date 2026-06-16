import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectCardComponent } from '../../components/project-card/project-card.component';
import { CtaSectionComponent } from '../../components/cta-section/cta-section.component';
import { ProjectItem } from '../../shared/models/project.model';

@Component({
  selector: 'app-portfolio',
  standalone: true,
  imports: [CommonModule, ProjectCardComponent, CtaSectionComponent],
  templateUrl: './portfolio.component.html',
  styleUrl: './portfolio.component.css'
})
export class PortfolioComponent implements OnInit {
  activeCategory: 'all' | 'featured' | 'angular' | 'springboot' = 'all';

  allProjects: ProjectItem[] = [
    {
      id: 'al-arabi',
      title: 'Al Arabi Group UAE',
      description: 'Full-scale website maintenance, career portal improvements, and high-priority technical support.',
      technologies: ['Angular', 'Web Security', 'Technical Support'],
      category: 'featured',
      isFeatured: true,
      achievements: [
        '99.9% application uptime optimization',
        'Built custom recruiting and careers interface',
        'Resolved critical security and performance logs'
      ]
    },
    {
      id: 'quiz-app',
      title: 'Enterprise Quiz Application',
      description: 'An interactive examination and quiz engine built with modern Angular standalone directives and microservice endpoints.',
      technologies: ['Angular', 'RxJS', 'TypeScript'],
      category: 'angular'
    },
    {
      id: 'invoice-gen',
      title: 'Smart Invoice Generator',
      description: 'A robust cloud system generating PDF reports, automated billing schemas, and integrated client billing trackers.',
      technologies: ['Spring Boot', 'Angular', 'PostgreSQL'],
      category: 'springboot'
    },
    {
      id: 'angular-analytics',
      title: 'Angular Real-time Dashboard',
      description: 'High-speed business intelligence dashboard tracking live operations metrics through WebSockets and NgRx.',
      technologies: ['Angular', 'NgRx', 'WebSockets', 'RxJS'],
      category: 'angular'
    },
    {
      id: 'springboot-auth',
      title: 'OAuth2 Authorization Gateway',
      description: 'Enterprise API gateway and token vault delivering secured scopes and multi-tenant routing parameters.',
      technologies: ['Spring Boot', 'Spring Security', 'Docker', 'Redis'],
      category: 'springboot'
    }
  ];

  filteredProjects: ProjectItem[] = [];

  ngOnInit(): void {
    this.filterCategory('all');
  }

  filterCategory(category: 'all' | 'featured' | 'angular' | 'springboot'): void {
    this.activeCategory = category;
    
    // For the list view underneath the big hero project, we filter out Al Arabi from the standard cards grid
    // so we don't repeat the exact same Al Arabi project twice on 'all' or 'featured' filter state.
    if (category === 'all') {
      this.filteredProjects = this.allProjects.filter(p => p.id !== 'al-arabi');
    } else if (category === 'featured') {
      this.filteredProjects = this.allProjects.filter(p => p.isFeatured && p.id !== 'al-arabi');
    } else {
      this.filteredProjects = this.allProjects.filter(p => p.category === category);
    }
  }
}
