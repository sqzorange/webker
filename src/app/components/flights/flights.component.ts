import { Component, inject, OnInit } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { CommonModule } from '@angular/common';
import { SearchComponent } from '../search/search.component';
import {
  Firestore,
  collectionData,
  collection,
  query,
  where,
} from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { FormatDatePipe } from '../../pipes/format-date.pipe';
import { FlightClassPipe } from '../../pipes/flight-class.pipe';

@Component({
  selector: 'app-flights',
  standalone: true,
  imports: [
    NavbarComponent,
    CommonModule,
    SearchComponent,
    FormatDatePipe,
    FlightClassPipe,
  ],
  templateUrl: './flights.component.html',
  styleUrls: ['./flights.component.scss'],
})
export class FlightsComponent implements OnInit {
  firestore: Firestore = inject(Firestore);
  filteredFlights$: Observable<any[]> | null = null;
  flightClasses: string[] = ['economy', 'first', 'business'];

  ngOnInit() {
    const flightsRef = collection(this.firestore, 'flights');
    this.filteredFlights$ = collectionData(flightsRef, { idField: 'id' });
  }

  updateSearch(values: any) {
    const flightsRef = collection(this.firestore, 'flights');
    const constraints = [];

    if (values.departure) {
      constraints.push(where('departure', '==', values.departure));
    }
    if (values.arrival) {
      constraints.push(where('arrival', '==', values.arrival));
    }
    if (values.class) {
      constraints.push(where('class', '==', values.class));
    }
    if (values.date) {
      constraints.push(where('date', '==', values.date));
    }

    let flightsQuery;
    if (constraints.length > 0) {
      flightsQuery = query(flightsRef, ...constraints);
    } else {
      flightsQuery = flightsRef;
    }

    this.filteredFlights$ = collectionData(flightsQuery, { idField: 'id' });
  }
}
