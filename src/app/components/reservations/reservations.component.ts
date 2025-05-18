import { Component, OnInit } from '@angular/core';
import {
  Firestore,
  collectionData,
  collection,
  deleteDoc,
  doc,
  Timestamp,
} from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '../navbar/navbar.component';
import { FlightClassPipe } from '../../pipes/flight-class.pipe';

@Component({
  selector: 'app-reservations',
  templateUrl: './reservations.component.html',
  imports: [CommonModule, NavbarComponent, FlightClassPipe],
  styleUrls: ['./reservations.component.scss'],
})
export class ReservationsComponent implements OnInit {
  reservations$: Observable<any[]> | null = null;

  constructor(private firestore: Firestore) {}

  ngOnInit() {
    const reservationsRef = collection(this.firestore, 'bookings');
    this.reservations$ = collectionData(reservationsRef, { idField: 'id' });
  }

  async deleteReservation(reservationId: string) {
    try {
      const reservationRef = doc(this.firestore, 'bookings', reservationId);
      await deleteDoc(reservationRef);
      console.log('Foglalás sikeresen törölve!');
      alert('Foglalás sikeresen törölve!');
    } catch (error) {
      console.error('Hiba történt a törlés során:', error);
      alert('Hiba történt a törlés során. Próbáld újra!');
    }
  }
  convertTimestampToDate(timestamp: Timestamp): string {
    const date = new Date(timestamp.seconds * 1000);
    return date.toISOString().split('T')[0];
  }
}
