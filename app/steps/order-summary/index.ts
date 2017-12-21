import { Component } from '@angular/core';
import { Order, Bundle, MealPlan, data } from '../../imports/models';
import { StepComponent } from '../../imports/StepComponent';
import { AllergyPopupComponent } from '../../components/popup--allergy/index';
import * as _ from 'lodash';

@Component({
	selector: 'div.step-container',
	templateUrl: 'app/steps/order-summary/template.html',
	styleUrls: ['dist/app/steps/order-summary/styles.css']
})
export default class OrderSummaryStepComponent extends StepComponent {
	static stepName = 'order-summary';
	static title = 'Your order';
	static options = {showSteps:false, showPrev: true};

	bundles: Bundle[];
	
	constructor(private order: Order) {
		super();
		this.bundles = _.clone(this.order.bundles);
	}

	addAnotherBundle(): void {
		this.addBundle();
		this.setStep('meal-plan');
	}

	updateAllergyNote(bundle: Bundle): boolean {
		this.showPopup(AllergyPopupComponent, {
			providers: [{provide: 'allergies', useValue: _.clone(bundle.allergies)}, {provide: Bundle, useValue: bundle}],
			close: (allergyPopup: AllergyPopupComponent) => {
				bundle.allergies = allergyPopup.bundleAllergies;
				this.checkAgainstTriggers();
			}
		});
		return false;
	}
	subtotal(bundle: Bundle): number {
		return bundle.total;
	}
}
