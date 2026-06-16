import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ContactService } from '../../core/services/contact.service';

@Component({
  selector: 'app-contact-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './contact-form.component.html',
  styleUrls: ['./contact-form.component.css']
})
export class ContactFormComponent implements OnInit {
  contactForm!: FormGroup;
  isSubmitting = false;
  submitSuccess = false;
  successMessage = '';

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private contactService: ContactService
  ) {}

  ngOnInit(): void {
    this.initForm();
    this.checkQueryParams();
  }

  private initForm(): void {
    this.contactForm = this.fb.group({
      name: ['', Validators.required],
      companyName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
      serviceRequired: ['', Validators.required],
      message: ['', [Validators.required, Validators.minLength(10)]]
    });
  }

  private checkQueryParams(): void {
    this.route.queryParams.subscribe(params => {
      const serviceParam = params['service'];
      if (serviceParam) {
        // Map query params to serviceRequired selection
        if (['recruitment', 'contract', 'web-dev', 'app-dev', 'software', 'support'].includes(serviceParam)) {
          this.contactForm.patchValue({ serviceRequired: serviceParam });
        }
      }
    });
  }

  isFieldInvalid(fieldName: string): boolean {
    const field = this.contactForm.get(fieldName);
    return !!(field && field.invalid && (field.dirty || field.touched));
  }

  onSubmit(): void {
    if (this.contactForm.valid) {
      this.isSubmitting = true;
      this.contactService.submitContactRequest(this.contactForm.value).subscribe({
        next: (response) => {
          this.isSubmitting = false;
          if (response.success) {
            this.submitSuccess = true;
            this.successMessage = response.message;
          }
        },
        error: (err) => {
          this.isSubmitting = false;
          console.error('Submission failed', err);
        }
      });
    } else {
      this.markFormGroupTouched(this.contactForm);
    }
  }

  resetFormState(): void {
    this.submitSuccess = false;
    this.successMessage = '';
    this.contactForm.reset({
      name: '',
      companyName: '',
      email: '',
      phone: '',
      serviceRequired: '',
      message: ''
    });
  }

  private markFormGroupTouched(formGroup: FormGroup) {
    Object.values(formGroup.controls).forEach(control => {
      control.markAsTouched();
      if ((control as any).controls) {
        this.markFormGroupTouched(control as FormGroup);
      }
    });
  }
}

