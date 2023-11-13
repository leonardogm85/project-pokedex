import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'normalize'
})
export class NormalizePipe implements PipeTransform {

  transform(value: string): string {
    return value.split('-').map(this.titlecase).join(' ');
  }

  titlecase(value: string): string {
    return value.charAt(0).toUpperCase().concat(value.slice(1).toLowerCase());
  }

}
