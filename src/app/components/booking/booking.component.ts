import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import {
  Firestore,
  collectionData,
  collection,
  addDoc,
} from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { NavbarComponent } from '../navbar/navbar.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule, MatOptionModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { getAuth } from 'firebase/auth';

@Component({
  selector: 'app-booking',
  standalone: true,
  imports: [
    CommonModule,
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
  styleUrls: ['./booking.component.scss'],
})
export class BookingComponent implements OnInit {
  firestore: Firestore = inject(Firestore);
  flights$: Observable<any[]> | null = null;

  flightForm = new FormGroup({
    passengerInfo: new FormGroup({
      firstName: new FormControl('', Validators.required),
      lastName: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      phone: new FormControl('+36', [
        Validators.required,
        Validators.pattern('^\\+36\\d{9}$'),
      ]),
    }),
    flightDetails: new FormGroup({
      departure: new FormControl('', Validators.required),
      arrival: new FormControl('', Validators.required),
      date: new FormControl('', Validators.required),
      class: new FormControl('economy'),
    }),
    baggageInfo: new FormGroup({
      checkedBaggage: new FormControl(0),
      cabinBaggage: new FormControl(0),
    }),
  });

  ngOnInit() {
    const flightsRef = collection(this.firestore, 'flights');
    this.flights$ = collectionData(flightsRef, { idField: 'id' });
  }
  async onSubmit(): Promise<void> {
    if (this.flightForm.invalid) {
      console.warn('Az űrlap hibás! Kérlek, töltsd ki a kötelező mezőket.');
      alert('Az űrlap hibás! Kérlek, töltsd ki a kötelező mezőket.');
      return;
    }

    const auth = getAuth();
    const user = auth.currentUser;
    if (!user) {
      console.warn('Be kell jelentkezni a foglaláshoz!');
      alert('Be kell jelentkezni a foglaláshoz!');
      return;
    }

    const bookingData = {
      userId: user.uid,
      passengerInfo: this.flightForm.get('passengerInfo')?.value,
      flightDetails: this.flightForm.get('flightDetails')?.value,
      baggageInfo: this.flightForm.get('baggageInfo')?.value,
      createdAt: new Date(),
    };

    try {
      const bookingsRef = collection(this.firestore, 'bookings');
      await addDoc(bookingsRef, bookingData);
      console.log('Foglalás sikeresen létrehozva!');

      alert('Foglalás sikeresen rögzítve!');

      this.flightForm.reset();
    } catch (error) {
      console.error('Hiba történt a foglalás mentésekor:', error);
      alert('Hiba történt a foglalás mentésekor. Kérlek, próbáld újra!');
    }
  }
}
