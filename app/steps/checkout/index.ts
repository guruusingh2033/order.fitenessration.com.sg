import { Component } from '@angular/core';
import { Order, Bundle, MealPlan, data } from '../../imports/models';
import { StepComponent } from '../../imports/StepComponent';
import { humanDateFormat } from '../../imports/helpers';

@Component({
	selector: 'div.step-container',
	templateUrl: 'app/steps/checkout/template.html',
	styleUrls: ['dist/app/steps/checkout/styles.css']
})
export default class CheckoutStepComponent extends StepComponent {
	static stepName = 'checkout';
	static title = 'Checkout';
	static options = {showSteps:false, showPrev: true};
	constructor(private order: Order) {
		super();
	}
}
