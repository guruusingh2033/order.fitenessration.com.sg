import {PipeTransform, Pipe} from '@angular/core'
import * as _ from 'lodash';

@Pipe({name:'currency'})
export class PricePipe implements PipeTransform {
  transform(value: string) {
		return '$' + parseFloat(value).toFixed(2).replace(/./g, function(c, i, a) {
	    return i && c !== "." && ((a.length - i) % 3 === 0) ? ',' + c : c;
		});
  }
}
