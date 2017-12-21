import { Component } from '@angular/core';
import { Order } from '../../imports/models';
import { StepComponent } from '../../imports/StepComponent';

@Component({
	selector: 'div.step-container',
	templateUrl: 'app/steps/survey-success/template.html',
	styleUrls: ['dist/app/steps/survey-success/styles.css']
})
export default class SurveySuccessStepComponent extends StepComponent {
	static stepName = 'survey-success';
	static title = 'Thank you';
	static options = {showSteps: false, showPrev: true};
	constructor() {
		super();
	}
}
