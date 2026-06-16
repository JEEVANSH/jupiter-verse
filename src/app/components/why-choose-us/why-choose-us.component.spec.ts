import { ComponentFixture, TestBed } from '@angular/core/testing';
import { WhyChooseUsComponent } from './why-choose-us.component';

describe('WhyChooseUsComponent', () => {
  let component: WhyChooseUsComponent;
  let fixture: ComponentFixture<WhyChooseUsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WhyChooseUsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(WhyChooseUsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display section title', () => {
    const titleElement = fixture.nativeElement.querySelector('.section-title');
    expect(titleElement).toBeTruthy();
    expect(titleElement.textContent).toContain('Bridging Excellence in Talent & Technology');
  });

  it('should display advantages list', () => {
    const advantageItems = fixture.nativeElement.querySelectorAll('.advantage-item');
    expect(advantageItems.length).toBe(3);
  });

  it('should display stats grid', () => {
    const statCards = fixture.nativeElement.querySelectorAll('.stat-card');
    expect(statCards.length).toBe(4);
  });
});
