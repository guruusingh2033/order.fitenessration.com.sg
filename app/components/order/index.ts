import { Component, Input } from '@angular/core'
import { Order } from '../../imports/models';
import { humanDateFormat } from '../../imports/helpers';
import * as _ from 'lodash';

const NAME = 'order';

@Component({
  selector: NAME,
  templateUrl: 'app/components/order/template.html',
  styleUrls: ['dist/app/components/order/styles.css']
})
export class OrderComponent {
	@Input()
	order: Order;

	@Input()
  deliveryInfo: boolean;

  dateFormat(date) {
  	return humanDateFormat(date);
  }
}
