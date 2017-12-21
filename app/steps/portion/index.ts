import { Component } from '@angular/core';
import { Bundle, Portion, data } from '../../imports/models';
import { StepComponent } from '../../imports/StepComponent';

@Component({
	selector: 'div.step-container',
	templateUrl: 'app/steps/portion/template.html',
	styleUrls: ['dist/app/steps/portion/styles.css']
})
export default class PortionStepComponent extends StepComponent {
	static stepName = 'portion';
	static title = 'Select your portion';
	static options = {showPrev: true};
	
	portions = data.portions.list;

	constructor(private bundle: Bundle) {
		super();
	}

	ready(): boolean {
		return !!this.bundle.portion;
	}

	selectPortion(portion:Portion): void {
		if (!this.bundle.portion || this.bundle.portion._id != portion._id) {
			this.bundle.portion = portion;
			this.bundle.type = null;
			this.bundle.mealSelections = [];
		}
	}
}
