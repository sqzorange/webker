import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Component } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule, MatOptionModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';

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
  ],
  templateUrl: './booking.component.html',
  styleUrl: './booking.component.scss',
})
export class BookingComponent {
  flightForm = new FormGroup({
    passengerInfo: new FormGroup({
      firstName: new FormControl(''),
      lastName: new FormControl(''),
      email: new FormControl(''),
      phone: new FormControl('+36'),
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
    console.log(this.flightForm.value);
  }
}
