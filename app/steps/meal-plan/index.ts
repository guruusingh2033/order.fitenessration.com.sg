import { Component, Inject } from '@angular/core';
import { Bundle, MealPlan, data } from '../../imports/models';
import { AccountComponent } from '../../components/account/index';
import { StepComponent } from '../../imports/StepComponent';

@Component({
	selector: 'div.step-container',
	templateUrl: 'app/steps/meal-plan/template.html',
	styleUrls: ['dist/app/steps/meal-plan/styles.css']
})
export default class MealPlanStepComponent extends StepComponent {
	static stepName = 'meal-plan';
	static title = 'Select your meal plan';
	static options = {showPrev: false};
	
	mealPlans = data.mealPlans.list;

	constructor(@Inject('user') public user: any, private bundle: Bundle) {
		super();
	}

	selectMealPlan(mealPlan: MealPlan): void {
		if (!this.bundle.mealPlan || this.bundle.mealPlan._id != mealPlan._id) {
			this.bundle.mealPlan = mealPlan;
			this.bundle.type = null;
			this.bundle.mealSelections = [];					
		}
	}
	account(): void {
		this.showPopup(AccountComponent, {
			init: {
				type: 'login',
			},
			initComponent: (component) => {
				component.onLogin = () => {
					this.initUserData(() => {

					});
				};
			}
		});
	}
}
