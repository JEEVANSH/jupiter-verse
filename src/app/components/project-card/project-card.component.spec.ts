import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProjectCardComponent } from './project-card.component';
import { ProjectItem } from '../../shared/models/project.model';

describe('ProjectCardComponent', () => {
  let component: ProjectCardComponent;
  let fixture: ComponentFixture<ProjectCardComponent>;

  const mockProject: ProjectItem = {
    id: 'test-project',
    title: 'Test Project',
    description: 'Test description',
    technologies: ['Angular', 'TypeScript'],
    category: 'angular',
    isFeatured: true,
    achievements: ['Achievement 1', 'Achievement 2']
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProjectCardComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ProjectCardComponent);
    component = fixture.componentInstance;
    component.project = mockProject;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display project title', () => {
    const titleElement = fixture.nativeElement.querySelector('.project-title');
    expect(titleElement.textContent).toContain('Test Project');
  });

  it('should display project description', () => {
    const descElement = fixture.nativeElement.querySelector('.project-desc');
    expect(descElement.textContent).toContain('Test description');
  });

  it('should display category badge', () => {
    const badgeElement = fixture.nativeElement.querySelector('.category-badge');
    expect(badgeElement.textContent).toContain('ANGULAR');
  });

  it('should display technologies', () => {
    const techTags = fixture.nativeElement.querySelectorAll('.tech-tag');
    expect(techTags.length).toBe(2);
  });

  it('should apply featured class when isFeatured is true', () => {
    const cardElement = fixture.nativeElement.querySelector('.project-card');
    expect(cardElement.classList.contains('featured')).toBeTruthy();
  });
});
