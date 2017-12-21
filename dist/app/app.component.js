"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var http_1 = require('@angular/http');
var models_1 = require('./imports/models');
var AuthService_1 = require('./imports/AuthService');
var ApiService_1 = require('./imports/ApiService');
var getSearchParameters_1 = require('./imports/getSearchParameters');
var showPopup_1 = require('./imports/showPopup');
var app_module_1 = require('./app.module');
var index_1 = require('./components/account/index');
var _ = require('lodash');
var moment = require('moment');
var GET = getSearchParameters_1.getSearchParameters();
var AppComponent = (function () {
    function AppComponent(element, viewContainer, changeDetector, http, authService, apiService, app, compiler, injector) {
        this.element = element;
        this.viewContainer = viewContainer;
        this.changeDetector = changeDetector;
        this.http = http;
        this.authService = authService;
        this.apiService = apiService;
        this.app = app;
        this.compiler = compiler;
        this.injector = injector;
        this.showPrev = false;
        this.stepTitle = '';
        this.order = new models_1.Order();
        this.config = config;
        this.steps = _.transform(require('./steps/index').default, function (steps, stepComponent) {
            steps[stepComponent.stepName] = stepComponent;
        }, {});
        window['g_order'] = this.order;
        window['g_appComponent'] = this;
        window['g_moment'] = moment;
    }
    AppComponent.prototype.addBundle = function () {
        var bundle = new models_1.Bundle();
        if (this.user && this.user.profile.preferences.allergies) {
            bundle.allergies = _.map(this.user.profile.preferences.allergies, function (allergyId) { return models_1.data.ingredients.findById(allergyId._str); });
        }
        this.order.addBundle(bundle);
        this.bundle = bundle;
    };
    AppComponent.prototype.close = function () {
        // this.bodyPlaceholder.clear();
    };
    AppComponent.prototype.prev = function () {
        var steps = _.keys(this.steps);
        var nextStep = steps[steps.indexOf(this.currentStep) - 1];
        if (nextStep) {
            this.setStep(nextStep);
        }
        return false;
    };
    AppComponent.prototype.next = function () {
        var _this = this;
        if (this.stepComponent.ready()) {
            var steps = _.keys(this.steps);
            var nextStep = steps[steps.indexOf(this.currentStep) + 1];
            if (nextStep == 'delivery' && !this.user) {
                this.showPopup(index_1.AccountComponent, {
                    init: {
                        type: 'sign-up',
                    },
                    initComponent: function (component) {
                        component.onSignup = function (user) {
                            _this.user = user;
                            if (typeof trackJs != 'undefined')
                                trackJs.configure({ userId: _this.user._id });
                            _this.stepComponent.user = user;
                            _this.setStep(nextStep);
                        };
                        component.onLogin = function () {
                            _this.initUserData(function () {
                                _this.setStep(nextStep);
                            });
                        };
                    }
                });
            }
            else if (nextStep) {
                this.setStep(nextStep);
            }
        }
    };
    AppComponent.prototype.setStep = function (stepName) {
        console.log("setting step to \"" + stepName + "\"...");
        var step = this.steps[stepName];
        this.currentStep = stepName;
        this.stepTitle = step.title;
        this.showPrev = step.options.showPrev;
        this.changeDetector.detectChanges();
        this.element.nativeElement.className = stepName;
        var i = this.viewContainer.injector['parent'];
        var injector = core_1.ReflectiveInjector.resolveAndCreate([
            { provide: models_1.Bundle, useValue: this.bundle },
            { provide: models_1.Order, useValue: this.order },
            { provide: 'user', useValue: this.user },
        ], this.viewContainer.injector);
        this.stepPlaceholder.clear();
        var factory = _.find(this.mod.componentFactories, { componentType: step });
        var res = this.stepPlaceholder.createComponent(factory, 0, injector);
        this.stepComponent = res.instance;
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
        console.log("step set to " + stepName + ".");
    };
    AppComponent.prototype.showPopup = function (component, opts, type) {
        if (opts === void 0) { opts = {}; }
        if (type === void 0) { type = 'basic-popup-with-title'; }
        opts.mod = this.mod;
        opts.compiler = this.compiler;
        showPopup_1.showPopup(this.viewContainer, component, opts, type);
    };
    AppComponent.prototype.initUserData = function (cb) {
        var _this = this;
        if (cb === void 0) { cb = null; }
        console.log('initializing user data...');
        this.apiService.get('users/' + this.authService.auth.userId).subscribe(function (response) {
            console.log('user data received');
            _this.user = response.json().data;
            if (_this.user.profile.preferences.mealPlan && !_this.bundle.mealPlan) {
                _this.bundle.mealPlan = models_1.data.mealPlans.findById(_this.user.profile.preferences.mealPlan._str);
            }
            if (_this.user.profile.preferences.portion && !_this.bundle.portion) {
                _this.bundle.portion = models_1.data.portions.findById(_this.user.profile.preferences.portion._str);
            }
            if (!_this.order.deliveryOptions.firstName) {
                _this.order.deliveryOptions.firstName = _this.user.profile.firstName;
            }
            if (!_this.order.deliveryOptions.surname) {
                _this.order.deliveryOptions.surname = _this.user.profile.surname;
            }
            if (!_this.order.deliveryOptions.contactNumber) {
                _this.order.deliveryOptions.contactNumber = _this.user.profile.phoneNumber;
            }
            if (typeof _this.user.profile.selectedDeliveryAddress == 'number') {
                if (!_this.order.deliveryOptions.address) {
                    _this.order.deliveryOptions.address = _this.user.profile.deliveryAddresses[_this.user.profile.selectedDeliveryAddress].address;
                }
                if (!_this.order.deliveryOptions.postalCode) {
                    _this.order.deliveryOptions.postalCode = _this.user.profile.deliveryAddresses[_this.user.profile.selectedDeliveryAddress].postalCode;
                }
            }
            // if (this.user.profile.preferences.allergies) {
            // 	this.bundle.allergies = _.map(this.user.profile.preferences.allergies, (allergyId) => { return data.ingredients.findById(allergyId._str); });
            // }
            _this.order.userId = _this.user._id;
            if (typeof trackJs != 'undefined')
                trackJs.configure({ userId: _this.user._id });
            if (_this.stepComponent) {
                _this.stepComponent.user = _this.user;
            }
            console.log('user data initialized.');
            if (cb)
                cb();
            _this.app.tick();
        }, function (error) {
            console.error('failed to get user', error);
        });
    };
    AppComponent.prototype.ngAfterViewInit = function () {
        var _this = this;
        console.log('initializing order wizard...');
        var timeoutId = setTimeout(function () {
            console.error('load timeout');
        }, 15000);
        var reordering = !!GET.reorder;
        var next = function () {
            var auth = _this.authService.auth;
            if (!reordering) {
                _this.bundle = new models_1.Bundle();
                _this.order.addBundle(_this.bundle);
            }
            if (auth) {
                _this.initUserData(start);
            }
            else {
                start();
            }
        };
        var start = function () {
            var firstStep;
            if (reordering) {
                firstStep = 'delivery';
            }
            else if (GET.bundle) {
                firstStep = 'meals';
                _this.bundle.type = models_1.data.bundleTypes.findById(GET.bundle);
                _this.bundle.portion = _this.bundle.type.portion;
                _this.bundle.mealPlan = _this.bundle.type.mealPlan;
            }
            else if (GET.step == 'bundle' && _this.bundle.mealPlan && _this.bundle.portion) {
                firstStep = 'bundle';
            }
            else {
                firstStep = _.keys(_this.steps)[0];
            }
            _this.compiler.compileModuleAndAllComponentsAsync(app_module_1.AppModule).then(function (mod) {
                console.log('order wizard initialized.');
                _this.mod = mod;
                if (false) {
                    _this.bundle.mealPlan = models_1.data.mealPlans.findById('579a227277c840cd0d2a8087');
                    _this.bundle.portion = models_1.data.portions.findById('579a21d277c840cd0d2a8083');
                    _this.bundle.type = models_1.data.bundleTypes.findById('57c39e79d4c6973faec91f54');
                    _this.bundle.mealSelections = [];
                    _this.setStep('meals');
                }
                else {
                    clearTimeout(timeoutId);
                    _this.setStep(firstStep);
                }
            });
        };
        models_1.initData(this.http, GET.reorder, function (response) {
            if (response.order) {
                console.log('loading order data...');
                for (var _i = 0, _a = response.order.bundles; _i < _a.length; _i++) {
                    var orderBundle = _a[_i];
                    var bundle = new models_1.Bundle();
                    bundle.mealPlan = models_1.data.mealPlans.findById(orderBundle.mealPlan._id);
                    bundle.portion = models_1.data.portions.findById(orderBundle.portion._id);
                    bundle.type = models_1.data.bundleTypes.findById(orderBundle.type._id);
                    for (var _b = 0, _c = orderBundle.mealSelections; _b < _c.length; _b++) {
                        var orderMeal = _c[_b];
                        bundle.mealSelections.push(new models_1.MealSelection(models_1.data.meals.findById(orderMeal.meal._id), orderMeal.quantity));
                    }
                    for (var _d = 0, _e = orderBundle.allergies; _d < _e.length; _d++) {
                        var orderAllergy = _e[_d];
                        bundle.allergies.push(models_1.data.ingredients.findById(orderAllergy._id));
                    }
                    _this.order.addBundle(bundle);
                }
                _this.bundle = _this.order.bundles[_this.order.bundles.length - 1];
                for (var _f = 0, _g = response.order.addOnSelections; _f < _g.length; _f++) {
                    var orderAddOn = _g[_f];
                    _this.order.addOnSelections.push(new models_1.AddOnSelection(models_1.data.addOns.findById(orderAddOn.addOn._id), orderAddOn.variant, orderAddOn.quantity));
                }
                _this.order.deliveryOptions.address = response.order.deliveryOptions.address;
                _this.order.deliveryOptions.postalCode = response.order.deliveryOptions.postalCode;
                _this.order.deliveryOptions.firstName = response.order.deliveryOptions.firstName;
                _this.order.deliveryOptions.surname = response.order.deliveryOptions.surname;
                _this.order.deliveryOptions.selfCollection = response.order.deliveryOptions.selfCollection;
                _this.order.deliveryOptions.contactNumber = response.order.deliveryOptions.contactNumber;
                _this.order.deliveryOptions.disposableCutlery = response.order.deliveryOptions.disposableCutlery;
                _this.order.deliveryOptions.note = response.order.deliveryOptions.note;
                console.log('order data loaded.');
            }
            next();
        });
    };
    __decorate([
        core_1.ViewChild('stepPlaceholder', { read: core_1.ViewContainerRef }), 
        __metadata('design:type', core_1.ViewContainerRef)
    ], AppComponent.prototype, "stepPlaceholder", void 0);
    AppComponent = __decorate([
        core_1.Component({
            selector: 'order-wizard',
            templateUrl: 'app/layout.html',
            styleUrls: ['dist/app/styles/order-wizard.css']
        }), 
        __metadata('design:paramtypes', [core_1.ElementRef, core_1.ViewContainerRef, core_1.ChangeDetectorRef, http_1.Http, AuthService_1.AuthService, ApiService_1.ApiService, core_1.ApplicationRef, core_1.Compiler, core_1.Injector])
    ], AppComponent);
    return AppComponent;
}());
exports.AppComponent = AppComponent;
//# sourceMappingURL=app.component.js.map