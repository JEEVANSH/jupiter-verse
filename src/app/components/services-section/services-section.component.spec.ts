import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ServicesSectionComponent } from './services-section.component';

describe('ServicesSectionComponent', () => {
  let component: ServicesSectionComponent;
  let fixture: ComponentFixture<ServicesSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ServicesSectionComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ServicesSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display section title', () => {
    const titleElement = fixture.nativeElement.querySelector('.section-title');
    expect(titleElement).toBeTruthy();
    expect(titleElement.textContent).toContain('Our Talent & Technology Solutions');
  });

  it('should have featured services', () => {
    expect(component.featuredServices).toBeDefined();
    expect(component.featuredServices.length).toBe(3);
  });

  it('should render service cards for each featured service', () => {
    const serviceCards = fixture.nativeElement.querySelectorAll('app-service-card');
    expect(serviceCards.length).toBe(component.featuredServices.length);
  });
});
