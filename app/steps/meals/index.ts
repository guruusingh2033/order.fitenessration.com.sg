import { Component } from '@angular/core';
import { Bundle, Meal, Order, data } from '../../imports/models';
import { StepComponent} from '../../imports/StepComponent';
import { createComponent } from '../../imports/components';
import { MealDetailsComponent } from '../../components/meal-details/index';
import * as _ from 'lodash';

@Component({
	selector: 'div.step-container',
	templateUrl: 'app/steps/meals/template.html',
	styleUrls: ['dist/app/steps/meals/styles.css']
})
export default class MealsStepComponent extends StepComponent {
	static stepName = 'meals';
	static title = 'Select your meals';
	static options = { showSteps: false, showPrev: true };
	
	constructor(private bundle: Bundle, private order: Order) {
		super();
	}

	tab = 'basic';
	showSelectedMeals = false;
	displayedOutOfStockMessage = false;

	get meals() {
		return {
			basic:_.filter(data.meals.basic, {mealPlan:this.bundle.mealPlan, portion:this.bundle.portion}),
			premium:_.filter(data.meals.premium, {mealPlan:this.bundle.mealPlan, portion:this.bundle.portion}),
		};
	}

	quantity(meal: Meal): number {
		var m = this.bundle.getMeal(meal, false);
		if (m) return m.quantity;
		else return 0;
	}
	totalQuantity(): number {
		var quantity = 0;
		for (let m of this.bundle.mealSelections) {
			quantity += m.quantity;
		}
		return quantity;
	}
	remainingMeals(): number {
		return this.bundle.mealCount - this.totalQuantity();
	}

	increase(meal: any): void {
		var that = this;
		if (this.remainingMeals() > 0) {
			if (!this.bundle.addMeal(meal, this.displayedOutOfStockMessage) && !this.displayedOutOfStockMessage) {
				this.displayedOutOfStockMessage = true;
				var bundle = this.bundle;
				this.showPopup(createComponent({
				  selector: 'div',
				  template: `
				    <p class="sold-out">We're all out of stock for tomorrow's delivery.</p>
				    <button (click)="getMeal()" class="button">Get this meal delivered later</button>
				    <p class="or">or</p>
				    <button (click)="close()" class="button">Select other delicious meals</button>
				  `,
				  styles: [`
				    :host { text-align: center; }
				    :host > *:not(:first-child) { margin-top: 21px; }
				    :host > *:last-child { margin-top: 0; }
				    .sold-out { font-size: 17.4px; font-weight: bold; }
				    .or { text-transform: uppercase; font-weight: bold; margin: 10px 0; }
				  `]
				}, {
				  title: 'Whoops!',
				  getMeal() {
				  	bundle.addMeal(meal, true);
				  	that.checkAgainstTriggers();
				  	this.close();
				  }
				}));
			}
			else {
		  	this.checkAgainstTriggers();
				if (this.bundle.getMeal(meal).quantity == 7) {
					this.showPopup(createComponent({
					  selector: 'div',
					  template: `
					    <p>We'll need some extra time to prepare your order.</p>
					    <p><b>Your earlist fulfillment date is in</b></p>
					    <span class="days">3 Days</span>
					    <button (click)="close()" class="button">Give it to me anyway</button>
					  `,
					  styles: [`
					    :host { text-align: center; }
					    :host > *:not(:first-child) { margin-top: 21px; }
					    .days { font-size: 24.16px; font-weight: bold; display: block; margin-top: 10px; }
					  `]
					}, {
					  title: 'Whoah there!'
					}));
				}
			}
		}
	}
	decrease(meal: any): void {
		this.bundle.removeMeal(meal);
		this.order.checkAgainstTriggers();
	}
	toggleSelectedMeals(): void {
		this.showSelectedMeals = !this.showSelectedMeals;
	}
	showDetails(meal : Meal) {
		this.showPopup(MealDetailsComponent, {
			title: false,
			fullscreen: true,
			providers: [{provide:Meal, useValue:meal}]
		}, 'popup');
		return false;
	}
	premiumPrice(): number {
		var cheapestMeal = this.meals.premium.sort((a, b): number => {
			return a.price - b.price;
		})[0];
		if (cheapestMeal) {
			return cheapestMeal.price;
		}
		else {
			return 0;
		}
	}
}
