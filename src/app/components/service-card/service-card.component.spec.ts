import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ServiceCardComponent } from './service-card.component';
import { ServiceItem } from '../../shared/models/service.model';

describe('ServiceCardComponent', () => {
  let component: ServiceCardComponent;
  let fixture: ComponentFixture<ServiceCardComponent>;

  const mockService: ServiceItem = {
    id: 'test-service',
    title: 'Test Service',
    icon: 'recruit',
    description: 'Test description',
    benefits: ['Benefit 1', 'Benefit 2'],
    ctaText: 'Learn More',
    category: 'talent'
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ServiceCardComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ServiceCardComponent);
    component = fixture.componentInstance;
    component.service = mockService;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display service title', () => {
    const titleElement = fixture.nativeElement.querySelector('.card-title');
    expect(titleElement.textContent).toContain('Test Service');
  });

  it('should display service description', () => {
    const descElement = fixture.nativeElement.querySelector('.service-desc');
    expect(descElement.textContent).toContain('Test description');
  });

  it('should display benefits list', () => {
    const benefitItems = fixture.nativeElement.querySelectorAll('.benefits-list li');
    expect(benefitItems.length).toBe(2);
  });

  it('should apply tech-icon class when category is technology', () => {
    component.service = { ...mockService, category: 'technology' };
    fixture.detectChanges();
    const iconWrapper = fixture.nativeElement.querySelector('.icon-wrapper');
    expect(iconWrapper.classList.contains('tech-icon')).toBeTruthy();
  });
});
