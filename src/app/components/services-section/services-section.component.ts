import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ServiceCardComponent } from '../service-card/service-card.component';
import { ServiceItem } from '../../shared/models/service.model';

@Component({
  selector: 'app-services-section',
  standalone: true,
  imports: [CommonModule, RouterLink, ServiceCardComponent],
  templateUrl: './services-section.component.html',
  styleUrls: ['./services-section.component.css']
})
export class ServicesSectionComponent {
  featuredServices: ServiceItem[] = [
    {
      id: 'recruitment',
      title: 'Recruitment Services',
      icon: 'recruit',
      description: 'End-to-end direct hire placement of senior engineers, developers, and technical managers.',
      benefits: [
        'Curated selection of pre-vetted specialists',
        'Accelerated onboarding timelines',
        '95% candidate retention rating'
      ],
      ctaText: 'Find Core Talent',
      category: 'talent'
    },
    {
      id: 'app-dev',
      title: 'Web App Engineering',
      icon: 'app-dev',
      description: 'Bespoke web applications built on modern frameworks, engineered for high concurrency and security.',
      benefits: [
        'Responsive standalone architectures',
        'State-of-the-art Angular implementations',
        'Secured APIs and microservices integration'
      ],
      ctaText: 'Build Digital Apps',
      category: 'technology'
    },
    {
      id: 'software',
      title: 'Software Development',
      icon: 'software',
      description: 'Enterprise scalable backend and full-stack software tailored to align with business requirements.',
      benefits: [
        'High-velocity delivery standards',
        'Robust Spring Boot integrations',
        'Decoupled and modern architectures'
      ],
      ctaText: 'Engineer Custom Code',
      category: 'technology'
    }
  ];
}
