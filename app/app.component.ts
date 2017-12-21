import { Component, ViewContainerRef, ViewChild, ReflectiveInjector, ChangeDetectorRef, ApplicationRef, Compiler, Injector, ElementRef } from '@angular/core'

import { RequestOptions, Http, Headers } from '@angular/http';
import { Bundle, Order, MealSelection, AddOnSelection, initData, data } from './imports/models';

import { AuthService } from './imports/AuthService';
import { ApiService } from './imports/ApiService';
import { IUser } from './imports/User';
import { getSearchParameters } from './imports/getSearchParameters';
import { showPopup, ShowPopupOptions } from './imports/showPopup';

import { AppModule } from './app.module';

import { StepComponent } from './imports/StepComponent';
import { AccountComponent } from './components/account/index';

import * as _ from 'lodash';
import * as moment from 'moment';
declare var config: any;
declare var trackJs: any;

var GET : {bundle?: string, reorder?: string, step?: string} = getSearchParameters();

@Component({
	selector: 'order-wizard',
	templateUrl: 'app/layout.html',
	styleUrls: ['dist/app/styles/order-wizard.css']
})
export class AppComponent {
	currentStep: string;
	showPrev: boolean = false;
	stepTitle: string = '';
	bundle: Bundle;
	order: Order = new Order();
	user: IUser;
	stepComponent: StepComponent;
	config = config;
	mod: any;
	steps = _.transform(require('./steps/index').default, (steps, stepComponent: {stepName: string}) => {
		steps[stepComponent.stepName] = stepComponent;
	}, {});

	@ViewChild('stepPlaceholder', {read: ViewContainerRef}) stepPlaceholder: ViewContainerRef;
	
	constructor(private element: ElementRef,
		private viewContainer: ViewContainerRef,
		private changeDetector: ChangeDetectorRef,
		private http: Http,
		private authService: AuthService,
		private apiService: ApiService,
		private app: ApplicationRef,
		private compiler: Compiler,
		private injector: Injector) {
		window['g_order'] = this.order;
		window['g_appComponent'] = this;
		window['g_moment'] = moment;
	}
	addBundle(): void {
		var bundle = new Bundle();
		if (this.user && this.user.profile.preferences.allergies) {
			bundle.allergies = _.map(this.user.profile.preferences.allergies, (allergyId) => { return data.ingredients.findById(allergyId._str); });
		}
		this.order.addBundle(bundle);
		this.bundle = bundle;
	}
	close(): void {
		// this.bodyPlaceholder.clear();
	}
	prev(): boolean {
		var steps = _.keys(this.steps);
		var nextStep = steps[steps.indexOf(this.currentStep) - 1];
		if (nextStep) {
			this.setStep(nextStep);
		}
		return false;
	}
	next(): void {
		if (this.stepComponent.ready()) {
			var steps = _.keys(this.steps);
			var nextStep = steps[steps.indexOf(this.currentStep) + 1];
			if (nextStep == 'delivery' && !this.user) {
				this.showPopup(AccountComponent, {
					init: {
						type: 'sign-up',
					},
					initComponent: (component) => {
						component.onSignup = (user) => {
							this.user = user;
							if (typeof trackJs != 'undefined') trackJs.configure({userId:this.user._id});
							this.stepComponent.user = user;
							this.setStep(nextStep);
						};
						component.onLogin = () => {
							this.initUserData(() => {
								this.setStep(nextStep);
							});
						};
					}
				});
			}
			else if (nextStep) {
				this.setStep(nextStep);
			}      
		}
	}
	setStep(stepName: string): void {
		console.log(`setting step to "${stepName}"...`);
		var step = this.steps[stepName];
		this.currentStep = stepName;
		this.stepTitle = step.title;
		this.showPrev = step.options.showPrev;
		this.changeDetector.detectChanges();
		this.element.nativeElement.className = stepName;

		var i = this.viewContainer.injector['parent'];

		var injector = ReflectiveInjector.resolveAndCreate([
			{provide: Bundle, useValue: this.bundle},
			{provide: Order, useValue: this.order},
			{provide: 'user', useValue: this.user},
		], this.viewContainer.injector);

		this.stepPlaceholder.clear(); 
    var factory: any = _.find(this.mod.componentFactories, { componentType: step });
    var res = this.stepPlaceholder.createComponent(factory, 0, injector);
    this.stepComponent = <StepComponent>res.instance;

		var methods = {
			next: this.next.bind(this),
			setStep: this.setStep.bind(this),
			addBundle: this.addBundle.bind(this),
			showPopup: this.showPopup.bind(this),
			initUserData: this.initUserData.bind(this)
		};
		for (var prop in methods) {
			this.stepComponent[prop] = methods[prop];
		}
		console.log(`step set to ${stepName}.`);
	}
	showPopup(component, opts: ShowPopupOptions={}, type: string = 'basic-popup-with-title') {
		opts.mod = this.mod;
		opts.compiler = this.compiler;
		showPopup(this.viewContainer, component, opts, type);
	}
	initUserData(cb:()=>void = null) {
		console.log('initializing user data...');
		this.apiService.get('users/' + this.authService.auth.userId).subscribe((response) => {
			console.log('user data received');
			this.user = response.json().data;
			if (this.user.profile.preferences.mealPlan && !this.bundle.mealPlan) {
				this.bundle.mealPlan = data.mealPlans.findById(this.user.profile.preferences.mealPlan._str);							
			}
			if (this.user.profile.preferences.portion && !this.bundle.portion) {
				this.bundle.portion = data.portions.findById(this.user.profile.preferences.portion._str);
			}
			if (!this.order.deliveryOptions.firstName) {
				this.order.deliveryOptions.firstName = this.user.profile.firstName;
			}
			if (!this.order.deliveryOptions.surname) {
				this.order.deliveryOptions.surname = this.user.profile.surname;
			}
			if (!this.order.deliveryOptions.contactNumber) {
				this.order.deliveryOptions.contactNumber = this.user.profile.phoneNumber;
			}
			if (typeof this.user.profile.selectedDeliveryAddress == 'number') {
				if (!this.order.deliveryOptions.address) {
					this.order.deliveryOptions.address = this.user.profile.deliveryAddresses[this.user.profile.selectedDeliveryAddress].address;			
				}
				if (!this.order.deliveryOptions.postalCode) {
					this.order.deliveryOptions.postalCode = this.user.profile.deliveryAddresses[this.user.profile.selectedDeliveryAddress].postalCode;				
				}				
			}
			// if (this.user.profile.preferences.allergies) {
			// 	this.bundle.allergies = _.map(this.user.profile.preferences.allergies, (allergyId) => { return data.ingredients.findById(allergyId._str); });
			// }
			this.order.userId = this.user._id;
			if (typeof trackJs != 'undefined') trackJs.configure({userId:this.user._id});
			if (this.stepComponent) {
				this.stepComponent.user = this.user;
			}
			console.log('user data initialized.');
			if (cb) cb();
			this.app.tick();
		}, (error) => {
			console.error('failed to get user', error);
		});
	}
	ngAfterViewInit(): void {
		console.log('initializing order wizard...');
		var timeoutId = setTimeout(() => {
			console.error('load timeout');
		}, 15000);
		var reordering = !!GET.reorder;

		var next = () => {
			var auth:any = this.authService.auth;
			if (!reordering) {
				this.bundle = new Bundle();
				this.order.addBundle(this.bundle);
			}
			if (auth) {
				this.initUserData(start);
			}
			else {
				start();
			}
		};
		var start = () => {
			var firstStep;
			if (reordering) {
				firstStep = 'delivery';
			}
			else if (GET.bundle) {
				firstStep = 'meals';
				this.bundle.type = data.bundleTypes.findById(GET.bundle);
				this.bundle.portion = this.bundle.type.portion;
				this.bundle.mealPlan = this.bundle.type.mealPlan;
			}
			else if (GET.step == 'bundle' && this.bundle.mealPlan && this.bundle.portion) {
				firstStep = 'bundle';
			}
			else {
				firstStep = _.keys(this.steps)[0];
			}

			this.compiler.compileModuleAndAllComponentsAsync(AppModule).then((mod) => {
				console.log('order wizard initialized.');
				this.mod = mod;
				if (false) {
					this.bundle.mealPlan = data.mealPlans.findById('579a227277c840cd0d2a8087');
					this.bundle.portion = data.portions.findById('579a21d277c840cd0d2a8083');
					this.bundle.type = data.bundleTypes.findById('57c39e79d4c6973faec91f54');
					this.bundle.mealSelections = [
						// new MealSelection(data.meals.findById('57c44f98d4c606e3399a80e7'), 3)
					];
					this.setStep('meals');
				}
				else {
					clearTimeout(timeoutId);
					this.setStep(firstStep);
				}
			});
		};

		initData(this.http, GET.reorder, (response) => {
			if (response.order) {
				console.log('loading order data...');
				for (let orderBundle of response.order.bundles) {
					var bundle = new Bundle();
					bundle.mealPlan = data.mealPlans.findById(orderBundle.mealPlan._id);
					bundle.portion = data.portions.findById(orderBundle.portion._id);
					bundle.type = data.bundleTypes.findById(orderBundle.type._id);
					for (let orderMeal of orderBundle.mealSelections) {
						bundle.mealSelections.push(new MealSelection(data.meals.findById(orderMeal.meal._id), orderMeal.quantity));
					}
					for (let orderAllergy of orderBundle.allergies) {
						bundle.allergies.push(data.ingredients.findById(orderAllergy._id));
					}
					this.order.addBundle(bundle);
				}
				this.bundle = this.order.bundles[this.order.bundles.length - 1];
				for (let orderAddOn of response.order.addOnSelections) {
					this.order.addOnSelections.push(new AddOnSelection(data.addOns.findById(orderAddOn.addOn._id), orderAddOn.variant, orderAddOn.quantity));
				}
				this.order.deliveryOptions.address = response.order.deliveryOptions.address;
				this.order.deliveryOptions.postalCode = response.order.deliveryOptions.postalCode;
				this.order.deliveryOptions.firstName = response.order.deliveryOptions.firstName;
				this.order.deliveryOptions.surname = response.order.deliveryOptions.surname;
				this.order.deliveryOptions.selfCollection = response.order.deliveryOptions.selfCollection;
				this.order.deliveryOptions.contactNumber = response.order.deliveryOptions.contactNumber;
				this.order.deliveryOptions.disposableCutlery = response.order.deliveryOptions.disposableCutlery;
				this.order.deliveryOptions.note = response.order.deliveryOptions.note;
				console.log('order data loaded.')
			}
			next();
		});
	}
}
