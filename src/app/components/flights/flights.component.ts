import { Component } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { CommonModule } from '@angular/common';
import { FilterPipe } from '../../pipes/filter.pipe';
import flightsData from '../../../assets/teszt.json';

@Component({
  selector: 'app-flights',
  imports: [NavbarComponent, CommonModule, FilterPipe],
  templateUrl: './flights.component.html',
  styleUrl: './flights.component.scss',
})
export class FlightsComponent {
  flights: any[] = flightsData;
}
