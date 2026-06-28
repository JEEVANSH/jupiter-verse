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
  submitError = false;
  successMessage = '';
  errorMessage = '';
  private readonly web3FormsUrl = 'https://api.web3forms.com/submit';
  private readonly accessKey = '580a8808-464f-477a-9141-35d52f2a87a3';

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

  async onSubmit(): Promise<void> {
    if (this.contactForm.invalid) {
      this.markFormGroupTouched(this.contactForm);
      return;
    }

    this.isSubmitting = true;
    this.submitError = false;
    this.errorMessage = '';

    const formData = new FormData();
    formData.append('access_key', this.accessKey);
    formData.append('name', this.contactForm.value.name);
    formData.append('companyName', this.contactForm.value.companyName);
    formData.append('email', this.contactForm.value.email);
    formData.append('phone', this.contactForm.value.phone);
    formData.append('serviceRequired', this.contactForm.value.serviceRequired);
    formData.append('message', this.contactForm.value.message);

    try {
      const response = await fetch(this.web3FormsUrl, {
        method: 'POST',
        body: formData
      });

      const data = await response.json();

      if (response.ok && data?.success !== false) {
        this.submitSuccess = true;
        this.successMessage = data?.message || 'Your message has been sent successfully.';
        this.contactForm.reset({
          name: '',
          companyName: '',
          email: '',
          phone: '',
          serviceRequired: '',
          message: ''
        });
      } else {
        this.submitError = true;
        this.errorMessage = data?.message || 'Unable to send your message. Please try again.';
      }
    } catch (error) {
      this.submitError = true;
      this.errorMessage = 'Something went wrong. Please try again.';
      console.error('Submission failed', error);
    } finally {
      this.isSubmitting = false;
    }
  }

  resetFormState(): void {
    this.submitSuccess = false;
    this.submitError = false;
    this.successMessage = '';
    this.errorMessage = '';
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

