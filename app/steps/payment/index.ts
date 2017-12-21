import { Component, ChangeDetectorRef, Inject } from '@angular/core';
import { Order, Bundle, MealPlan, data } from '../../imports/models';
import { StepComponent } from '../../imports/StepComponent';
import { ApiService } from '../../imports/ApiService';
import { Calendar } from '../../imports/Calendar';
declare var braintree:any;
import * as _ from 'lodash';

@Component({
	selector: 'div.step-container',
	templateUrl: 'app/steps/payment/template.html',
	styleUrls: ['dist/app/steps/payment/styles.css']
})
export default class PaymentStepComponent extends StepComponent {
	static stepName = 'payment';
	static title = 'Payment';
	static options = {showSteps:false, showPrev: true};
	
	private _calendar: Calendar;

	showCalendar = false;
	errorMessage = null;
	submittedOrder = false;

	showLoading = false;
	loading = true;

	constructor(private order: Order, private apiService: ApiService, private changeDetector: ChangeDetectorRef, @Inject('user') public user: any) {
		super();
		this._calendar = new Calendar(this.apiService, this.order);
		this.apiService.get('payment/client-token').subscribe((response) => {
			var clientToken = response.json();
			braintree.setup(clientToken, 'custom', {
				id: 'checkout-form',
				hostedFields: {
					styles: _.merge({
						'input': {
							'font-size': '25.48px'
						},
						'input.invalid': {
							'box-shadow': '0px 0px 2px 0px #D0021B'
						}
					}, _.reduce({cvv:177, number:262, 'expirationMonth, expirationYear':45}, (styles, width, field):any => {
						var media = `@media screen and (max-width: ${width}px)`;
						styles[media] = {}
						return _.reduce(field.split(', '), (s, f):any => {
							s[media][`input.${f}`] = {
								'font-size': '12px'
							};
							return s;
						}, styles);
					}, {})),
					number: {selector:'#card-number'},
					cvv: {selector:'#cvv'},
					expirationMonth: {selector:'#expiration-month'},
					expirationYear: {selector:'#expiration-year'}
				},
				onPaymentMethodReceived: (obj) => {
					var order = this.order.serialize();
					order.paymentNonce = obj.nonce;
					this.submitOrder(order);
				},
				onReady: () => {
					this.loading = false;
					this.changeDetector.detectChanges();
				}
			});
		});
	}

	submitOrder(order) {
		if (!this.submittedOrder) {
			var timerId = setTimeout(() => {
				this.showLoading = true;
				this.changeDetector.detectChanges();
			}, 200);
			this.submittedOrder = true;
			this.changeDetector.detectChanges();
			// var order = this.order.serialize();
			this.apiService.post('orders', order)
				.subscribe((response) => {
					clearTimeout(timerId);
					this.showLoading = false;
					var json = response.json();
					if (json.success) {
						this.order.id = json.orderId;
						this.next();
					}
					else {
						this.submittedOrder = false;
						if (json.error == 'deliveryDate') {
							this.order.deliveryOptions.date = null;
							for (let meal of data.meals.list) {
								meal.stock = json.stock[meal._id];
							}
							this.showCalendar = true;
						}
						else if (json.error == 'payment') {
							this.errorMessage = json.response.message;
						}
						else {
							this.errorMessage = 'There was an error processing your request. Please try again later.';
						}
					}
					this.changeDetector.detectChanges();
				});
		}
	}

	dateSet() {
		return (month: Date, cb: Function) => {
			this._calendar.dateSet(month, cb);
    }
	}

  _timeSlots() {
    if (this.order && this.order.deliveryOptions.date && this._calendar.timeSlots) {
      return _.map(this._calendar.timeSlots[this.order.deliveryOptions.date], (timeSlotId:string) => { return data.timeSlots.findById(timeSlotId); });
    }
    else {
      return [];
    }
  }

  selectDate(date) {
    this.showCalendar = false;
    this.order.deliveryOptions.date = date.toJSON().substr(0, 10);
  }
	pay() {
		if (!this.user.profile.debug) {
			$('#checkout-form [type=submit]')[0].click();
		}
		else {
			this.submitOrder(this.order.serialize());
		}
	}

}
