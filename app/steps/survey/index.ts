import { Component, Inject } from '@angular/core';
import { Order } from '../../imports/models';
import { StepComponent } from '../../imports/StepComponent';
import { ApiService } from '../../imports/ApiService';

@Component({
	selector: 'div.step-container',
	templateUrl: 'app/steps/survey/template.html',
	styleUrls: ['dist/app/steps/survey/styles.css']
})
export default class SurveyStepComponent extends StepComponent {
	static stepName = 'survey';
	static title = 'Survey';
	static options = {showSteps:false, showPrev: true};
	constructor(private apiService: ApiService, private order: Order, @Inject('user') public user: any) {
		super();
	}
	survey: any = {};
	submit(): void {
		this.survey.userId = this.user._id;
		this.apiService.post('surveys', this.survey).subscribe((response) => {
			this.next();
		});
	}
}
