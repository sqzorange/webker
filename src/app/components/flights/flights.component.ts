import { Component } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { CommonModule } from '@angular/common';
import { FilterPipe } from '../../pipes/filter.pipe';
import flightsData from '../../../assets/repulok.json';
import { SearchComponent } from '../search/search.component';

@Component({
  selector: 'app-flights',
  imports: [NavbarComponent, CommonModule, FilterPipe, SearchComponent],
  templateUrl: './flights.component.html',
  styleUrl: './flights.component.scss',
})
export class FlightsComponent {
  flights: any[] = flightsData;
  flightClasses: string[] = ['economy', 'first', 'business'];
  searchCriteria: any = {};

  updateSearch(values: any) {
    this.searchCriteria = values;
  }

  get filteredFlights() {
    return this.flights.filter((flight) => {
      const {
        departure,
        arrival,
        class: flightClass,
        date,
      } = this.searchCriteria;

      return (
        (!departure ||
          flight.departure.toLowerCase().includes(departure.toLowerCase())) &&
        (!arrival ||
          flight.arrival.toLowerCase().includes(arrival.toLowerCase())) &&
        (!flightClass ||
          flight.class.toLowerCase().includes(flightClass.toLowerCase())) &&
        (!date || flight.date === date)
      );
    });
  }
}
