import { Component } from '@angular/core';
import { StepComponent } from '../../imports/StepComponent';
import { Order, Portion, MealPlan, BundleType, AddOn, data } from '../../imports/models';
import { AddOnDetailsComponent } from '../../components/add-on-details/index';
import * as _ from 'lodash';

@Component({
	selector: 'div.step-container',
	templateUrl: 'app/steps/add-ons/template.html',
	styleUrls: ['dist/app/steps/add-ons/styles.css']
})
export default class AddOnsStepComponent extends StepComponent {
	static stepName = 'add-ons';
	static title = 'Hold up! Add-ons?';
	static options = {showSteps:false, showPrev: true};	
	constructor(private order: Order) {
		super();
	}
	showSummary = false;
	currentCategory = 'All';

	quantity(addOn: any, component: string): number {
		var addOnSelection = this.order.getAddOnSelection(addOn, component, false);
		if (addOnSelection) {
			return addOnSelection.quantity;
		}
		else {
			return 0;
		}
	}
	increase(addOn: any, component: string): boolean {
		this.order.addAddOn(addOn, component);
		this.checkAgainstTriggers();
		return false;
	}
	decrease(addOn: any, component: string): boolean {
		this.order.removeAddOn(addOn, component);
		this.checkAgainstTriggers();
		return false;
	}
	addOnsForCategory(category: string): any[] {
		if (category == 'All') {
			return data.addOns.list;
		}
		else {
			return _.filter(data.addOns.list, (addOn) => addOn.category == category);
		}
	}
	showDetails(addOn: AddOn): boolean {
		this.showPopup(AddOnDetailsComponent, {
			title: false,
			fullscreen: true,
			providers: [{provide:'add-on', useValue:addOn}]
		}, 'popup');
		return false;
	}
	toggleSummary() {
		this.showSummary = !this.showSummary;
	}
}
