import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ProjectCardComponent } from '../project-card/project-card.component';
import { ProjectItem } from '../../shared/models/project.model';

@Component({
  selector: 'app-portfolio-section',
  standalone: true,
  imports: [CommonModule, RouterLink, ProjectCardComponent],
  templateUrl: './portfolio-section.component.html',
  styleUrls: ['./portfolio-section.component.css']
})
export class PortfolioSectionComponent {
  featuredProjects: ProjectItem[] = [
    {
      id: 'al-arabi',
      title: 'Al Arabi Group UAE',
      description: 'Full-scale website maintenance, career portal improvements, and high-priority technical support.',
      technologies: ['Angular', 'Web Security', 'Technical Support'],
      category: 'technology',
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
    }
  ];
}
