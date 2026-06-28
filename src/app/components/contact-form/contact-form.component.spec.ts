import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ContactFormComponent } from './contact-form.component';
import { ContactService } from '../../core/services/contact.service';
import { ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

describe('ContactFormComponent', () => {
  let component: ContactFormComponent;
  let fixture: ComponentFixture<ContactFormComponent>;
  let mockContactService: jasmine.SpyObj<ContactService>;

  beforeEach(async () => {
    mockContactService = jasmine.createSpyObj('ContactService', ['submitContactRequest']);

    await TestBed.configureTestingModule({
      imports: [ContactFormComponent],
      providers: [
        { provide: ContactService, useValue: mockContactService },
        { provide: ActivatedRoute, useValue: { queryParams: of({}) } }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ContactFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize form with all fields', () => {
    expect(component.contactForm).toBeDefined();
    expect(component.contactForm.get('name')).toBeDefined();
    expect(component.contactForm.get('email')).toBeDefined();
    expect(component.contactForm.get('message')).toBeDefined();
  });

  it('should mark form as invalid when required fields are empty', () => {
    expect(component.contactForm.valid).toBeFalsy();
  });

  it('should validate email field', () => {
    const emailControl = component.contactForm.get('email');
    emailControl?.setValue('invalid-email');
    expect(emailControl?.hasError('email')).toBeTruthy();
  });

  it('should validate message minimum length', () => {
    const messageControl = component.contactForm.get('message');
    messageControl?.setValue('short');
    expect(messageControl?.hasError('minlength')).toBeTruthy();
  });

  it('should submit successfully through Web3Forms', async () => {
    component.contactForm.patchValue({
      name: 'Jane Doe',
      companyName: 'Acme',
      email: 'jane@example.com',
      phone: '+971501234567',
      serviceRequired: 'web-dev',
      message: 'Hello from the test suite.'
    });

    spyOn(window, 'fetch').and.returnValue(Promise.resolve({
      ok: true,
      json: () => Promise.resolve({ success: true, message: 'Message sent.' })
    } as Response));

    await component.onSubmit();

    expect(component.submitSuccess).toBeTrue();
    expect(component.contactForm.get('name')?.value).toBe('');
  });

  it('should reset form state', () => {
    component.submitSuccess = true;
    component.resetFormState();
    expect(component.submitSuccess).toBeFalsy();
    expect(component.contactForm.get('name')?.value).toBe('');
  });
});
