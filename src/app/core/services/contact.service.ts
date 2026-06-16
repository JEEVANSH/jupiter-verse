import { Injectable } from '@angular/core';
import { Observable, of, delay } from 'rxjs';
import { ContactRequest } from '../../shared/models/contact-request.model';

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  constructor() {}

  /**
   * Submit the lead generation contact form.
   * Simulates an HTTP post request with a response latency.
   */
  submitContactRequest(request: ContactRequest): Observable<{ success: boolean; message: string }> {
    console.log('Submitting Contact Lead Form:', request);
    
    // Simulate successful backend submission with a delay
    return of({
      success: true,
      message: `Thank you, ${request.name}! Your consultation request has been received. Our team will contact you shortly.`
    }).pipe(delay(1000));
  }
}
