import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ServiceCardComponent } from '../../components/service-card/service-card.component';
import { CtaSectionComponent } from '../../components/cta-section/cta-section.component';
import { ServiceItem } from '../../shared/models/service.model';

@Component({
  selector: 'app-services',
  standalone: true,
  imports: [CommonModule, ServiceCardComponent, CtaSectionComponent],
  templateUrl: './services.component.html',
  styleUrl: './services.component.css'
})
export class ServicesComponent implements OnInit {
  activeCategory: 'all' | 'talent' | 'technology' = 'all';
  allServices: ServiceItem[] = [
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
      id: 'contract',
      title: 'Contract Hiring',
      icon: 'contract',
      description: 'Flexible contract-based talent integration to bolster resource capacity for key development sprints.',
      benefits: [
        'Agile scaling of headcount on short notice',
        'Simple contractual and admin processing',
        'Seamless onboarding into existing team boards'
      ],
      ctaText: 'Hire Contract Talent',
      category: 'talent'
    },
    {
      id: 'web-dev',
      title: 'Website Development',
      icon: 'web-dev',
      description: 'Responsive, premium websites designed to increase business credibility, load quickly, and optimize SEO.',
      benefits: [
        'Modern semantic HTML and vanilla styling',
        'Fully responsive layouts optimized for mobile',
        'Built-in search engine optimization features'
      ],
      ctaText: 'Build Website',
      category: 'technology'
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
    },
    {
      id: 'support',
      title: 'Website Maintenance & Support',
      icon: 'support',
      description: 'Ongoing SLA technical support, analytics monitoring, framework updates, and site feature deployments.',
      benefits: [
        'Guaranteed uptime support models',
        'Continuous performance and security audits',
        'Quick turnarounds for content changes'
      ],
      ctaText: 'Get SLA Support',
      category: 'technology'
    }
  ];

  filteredServices: ServiceItem[] = [];

  ngOnInit(): void {
    this.filteredServices = [...this.allServices];
  }

  setCategory(category: 'all' | 'talent' | 'technology'): void {
    this.activeCategory = category;
    if (category === 'all') {
      this.filteredServices = [...this.allServices];
    } else {
      this.filteredServices = this.allServices.filter(s => s.category === category);
    }
  }
}
