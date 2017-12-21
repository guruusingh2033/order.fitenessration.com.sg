import { Order } from './models';
import { createComponent } from './components';

export abstract class StepComponent {
	static stepName: string;
	showPopup(component, opts:{init?:any, initComponent?:Function, close?:Function, title?:boolean, providers?:Array<any>, fullscreen?:boolean} = {}, type:string = '') {}
	setStep(stepName: string) {}
	addBundle() {}
	initUserData(fn:Function) {}
	next() {}

	ready() { return true; }

	user: any;

	// private order: Order;

	checkAgainstTriggers() {
		var trigger = this['order'].checkAgainstTriggers();
		if (trigger) {
			this.showPopup(createComponent({
			  selector: 'div',
			  template: `
			    <p>${trigger.alert.message}</p>
			    <button (click)="close()" class="button">OK</button>
			  `,
			  styles: [`
			    :host { text-align: center; }
			    :host > *:not(:first-child) { margin-top: 21px; }
			    :host > *:last-child { margin-top: 0; }
			    p { font-size: 17.4px; font-weight: bold; margin-bottom: 1em }
			  `]
			}, {
				title: trigger.alert.title
			}));
		}
	}


}
