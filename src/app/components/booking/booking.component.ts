import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Component } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule, MatOptionModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-booking',
  imports: [
    NavbarComponent,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatOptionModule,
    MatNativeDateModule,
    MatSelectModule,
    MatButtonModule,
  ],
  templateUrl: './booking.component.html',
  styleUrl: './booking.component.scss',
})
export class BookingComponent {
  flightForm = new FormGroup({
    passengerInfo: new FormGroup({
      firstName: new FormControl('', Validators.required),
      lastName: new FormControl('', Validators.required),
      email: new FormControl('', {
        validators: [Validators.required, Validators.email],
      }),
      phone: new FormControl('+36', {
        validators: [Validators.required, Validators.pattern('^\\+36\\d{9}$')],
      }),
    }),
    flightDetails: new FormGroup({
      departure: new FormControl(''),
      arrival: new FormControl(''),
      date: new FormControl(''),
      class: new FormControl('economy'),
    }),
    baggageInfo: new FormGroup({
      checkedBaggage: new FormControl(0),
      cabinBaggage: new FormControl(0),
    }),
  });

  onSubmit(): void {
    if (this.flightForm.invalid) {
      console.warn('Form is invalid');
      return;
    }
  }
}
