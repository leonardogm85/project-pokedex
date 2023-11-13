import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'padStart'
})
export class PadStartPipe implements PipeTransform {

  transform(value: number, targetLength: number, padString: string): string {
    return value.toString().padStart(targetLength, padString);
  }

}
