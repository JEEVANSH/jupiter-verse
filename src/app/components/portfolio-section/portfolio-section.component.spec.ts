import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PortfolioSectionComponent } from './portfolio-section.component';

describe('PortfolioSectionComponent', () => {
  let component: PortfolioSectionComponent;
  let fixture: ComponentFixture<PortfolioSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PortfolioSectionComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(PortfolioSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display section title', () => {
    const titleElement = fixture.nativeElement.querySelector('.section-title');
    expect(titleElement).toBeTruthy();
    expect(titleElement.textContent).toContain('Success Stories In Action');
  });

  it('should have featured projects', () => {
    expect(component.featuredProjects).toBeDefined();
    expect(component.featuredProjects.length).toBeGreaterThan(0);
  });

  it('should render project cards for each featured project', () => {
    const projectCards = fixture.nativeElement.querySelectorAll('app-project-card');
    expect(projectCards.length).toBe(component.featuredProjects.length);
  });
});
