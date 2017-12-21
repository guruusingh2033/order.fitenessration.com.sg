import { Component } from '@angular/core';
import { Order } from '../../imports/models';
import { StepComponent } from '../../imports/StepComponent';

@Component({
	selector: 'div.step-container',
	templateUrl: 'app/steps/success/template.html',
	styleUrls: ['dist/app/steps/success/styles.css']
})
export default class SuccessStepComponent extends StepComponent {
	static stepName = 'success';
	static title = 'Order success';
	static options = {showSteps:false, showPrev: false};
	constructor(private order: Order) {
		super();
	}
	invoiceUrl() {
		return `${config.apiBaseUrl}admin/invoices?orders=${this.order.id}`;
	}
}
