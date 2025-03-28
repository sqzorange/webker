import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter',
})
export class FilterPipe implements PipeTransform {
  transform(items: any[], filterBy: string, filterValue: string): any[] {
    if (!items || !filterBy || !filterValue) {
      return items;
    }
    return items.filter(
      (item) => item[filterBy]?.toLowerCase() === filterValue.toLowerCase()
    );
  }
}
