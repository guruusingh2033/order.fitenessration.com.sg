import {PipeTransform, Pipe} from '@angular/core'

@Pipe({name: 'display'})
export class DisplayPipe implements PipeTransform {
  transform(value: string) {
    return value.toLowerCase().replace('-', ' ').replace(/\b[a-z]/g, function(letter) {
      return letter.toUpperCase();
    });
  }
}
