import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'flightClass',
})
export class FlightClassPipe implements PipeTransform {
  transform(value: string): string {
    const classMap: { [key: string]: string } = {
      economy: 'Turista',
      business: 'Üzleti',
      first: 'Első osztály',
    };
    return classMap[value] || value;
  }
}
