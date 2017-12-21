import { Component } from '@angular/core';
import { Bundle, BundleType, data } from '../../imports/models';
import { StepComponent } from '../../imports/StepComponent';
import * as _ from 'lodash';

@Component({
	selector: 'div.step-container',
	templateUrl: 'app/steps/bundle/template.html',
	styleUrls: ['dist/app/steps/bundle/styles.css']
})
export default class BundleStepComponent extends StepComponent {
	static stepName = 'bundle';
	static title = 'Select your bundle';
	static options = {showPrev: true};	

	constructor(private bundle: Bundle) {
		super();
	}

	get bundleTypes() {
		return data.bundleTypes.find({mealPlan:this.bundle.mealPlan, portion:this.bundle.portion});
	}

	ready(): boolean {
		return !!this.bundle.type;
	}
	premiumPrice(bundleType): number {
		var meals = _.filter(data.meals.premium, {mealPlan:bundleType.mealPlan, portion:bundleType.portion});
		var cheapestMeal = meals.sort((a, b): number => {
			return a.price - b.price;
		})[0];
		if (cheapestMeal) {
			return cheapestMeal.price;
		}
		else {
			return 0;
		}
	}
	perks(bundleType) {
		var perks = [];
		if (!bundleType.deliveryFee) {
			perks.push('Complimentary Delivery');
		}
		else {
			perks.push('$' + data.fulfillmentSettings.deliveryFee  + ' delivery fee');
		}
		if (bundleType.premiumMeals) {
			perks.push(bundleType.premiumMeals + ` Premium Meal${bundleType.premiumMeals > 1 ? 's' : ''} Included`);
		}
		else {
			perks.push('$' + this.premiumPrice(bundleType) + ' onward per premium');
		}
		return perks.join(' + ');
	}
	selectBundleType(bundleType: BundleType): void {
		if (!this.bundle.type || this.bundle.type._id != bundleType._id) {
			this.bundle.type = bundleType;
			this.bundle.mealSelections = [];
		}
	}
	description(bundleType: BundleType): string {
		if (bundleType.basicMeals && bundleType.premiumMeals) {
			return `${bundleType.basicMeals} basic + ${bundleType.premiumMeals} premium meals.`;
		}
		else if (bundleType.basicMeals) {
			return `${bundleType.basicMeals} basic meals.`;
		}
		else if (bundleType.premiumMeals) {
			return `${bundleType.premiumMeals} premium meals.`;
		}
	}
}
