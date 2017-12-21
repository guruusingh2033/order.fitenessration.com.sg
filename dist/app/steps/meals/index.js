"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
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
var models_1 = require('../../imports/models');
var StepComponent_1 = require('../../imports/StepComponent');
var components_1 = require('../../imports/components');
var index_1 = require('../../components/meal-details/index');
var _ = require('lodash');
var MealsStepComponent = (function (_super) {
    __extends(MealsStepComponent, _super);
    function MealsStepComponent(bundle, order) {
        _super.call(this);
        this.bundle = bundle;
        this.order = order;
        this.tab = 'basic';
        this.showSelectedMeals = false;
        this.displayedOutOfStockMessage = false;
    }
    Object.defineProperty(MealsStepComponent.prototype, "meals", {
        get: function () {
            return {
                basic: _.filter(models_1.data.meals.basic, { mealPlan: this.bundle.mealPlan, portion: this.bundle.portion }),
                premium: _.filter(models_1.data.meals.premium, { mealPlan: this.bundle.mealPlan, portion: this.bundle.portion }),
            };
        },
        enumerable: true,
        configurable: true
    });
    MealsStepComponent.prototype.quantity = function (meal) {
        var m = this.bundle.getMeal(meal, false);
        if (m)
            return m.quantity;
        else
            return 0;
    };
    MealsStepComponent.prototype.totalQuantity = function () {
        var quantity = 0;
        for (var _i = 0, _a = this.bundle.mealSelections; _i < _a.length; _i++) {
            var m = _a[_i];
            quantity += m.quantity;
        }
        return quantity;
    };
    MealsStepComponent.prototype.remainingMeals = function () {
        return this.bundle.mealCount - this.totalQuantity();
    };
    MealsStepComponent.prototype.increase = function (meal) {
        var that = this;
        if (this.remainingMeals() > 0) {
            if (!this.bundle.addMeal(meal, this.displayedOutOfStockMessage) && !this.displayedOutOfStockMessage) {
                this.displayedOutOfStockMessage = true;
                var bundle = this.bundle;
                this.showPopup(components_1.createComponent({
                    selector: 'div',
                    template: "\n\t\t\t\t    <p class=\"sold-out\">We're all out of stock for tomorrow's delivery.</p>\n\t\t\t\t    <button (click)=\"getMeal()\" class=\"button\">Get this meal delivered later</button>\n\t\t\t\t    <p class=\"or\">or</p>\n\t\t\t\t    <button (click)=\"close()\" class=\"button\">Select other delicious meals</button>\n\t\t\t\t  ",
                    styles: ["\n\t\t\t\t    :host { text-align: center; }\n\t\t\t\t    :host > *:not(:first-child) { margin-top: 21px; }\n\t\t\t\t    :host > *:last-child { margin-top: 0; }\n\t\t\t\t    .sold-out { font-size: 17.4px; font-weight: bold; }\n\t\t\t\t    .or { text-transform: uppercase; font-weight: bold; margin: 10px 0; }\n\t\t\t\t  "]
                }, {
                    title: 'Whoops!',
                    getMeal: function () {
                        bundle.addMeal(meal, true);
                        that.checkAgainstTriggers();
                        this.close();
                    }
                }));
            }
            else {
                this.checkAgainstTriggers();
                if (this.bundle.getMeal(meal).quantity == 7) {
                    this.showPopup(components_1.createComponent({
                        selector: 'div',
                        template: "\n\t\t\t\t\t    <p>We'll need some extra time to prepare your order.</p>\n\t\t\t\t\t    <p><b>Your earlist fulfillment date is in</b></p>\n\t\t\t\t\t    <span class=\"days\">3 Days</span>\n\t\t\t\t\t    <button (click)=\"close()\" class=\"button\">Give it to me anyway</button>\n\t\t\t\t\t  ",
                        styles: ["\n\t\t\t\t\t    :host { text-align: center; }\n\t\t\t\t\t    :host > *:not(:first-child) { margin-top: 21px; }\n\t\t\t\t\t    .days { font-size: 24.16px; font-weight: bold; display: block; margin-top: 10px; }\n\t\t\t\t\t  "]
                    }, {
                        title: 'Whoah there!'
                    }));
                }
            }
        }
    };
    MealsStepComponent.prototype.decrease = function (meal) {
        this.bundle.removeMeal(meal);
        this.order.checkAgainstTriggers();
    };
    MealsStepComponent.prototype.toggleSelectedMeals = function () {
        this.showSelectedMeals = !this.showSelectedMeals;
    };
    MealsStepComponent.prototype.showDetails = function (meal) {
        this.showPopup(index_1.MealDetailsComponent, {
            title: false,
            fullscreen: true,
            providers: [{ provide: models_1.Meal, useValue: meal }]
        }, 'popup');
        return false;
    };
    MealsStepComponent.prototype.premiumPrice = function () {
        var cheapestMeal = this.meals.premium.sort(function (a, b) {
            return a.price - b.price;
        })[0];
        if (cheapestMeal) {
            return cheapestMeal.price;
        }
        else {
            return 0;
        }
    };
    MealsStepComponent.stepName = 'meals';
    MealsStepComponent.title = 'Select your meals';
    MealsStepComponent.options = { showSteps: false, showPrev: true };
    MealsStepComponent = __decorate([
        core_1.Component({
            selector: 'div.step-container',
            templateUrl: 'app/steps/meals/template.html',
            styleUrls: ['dist/app/steps/meals/styles.css']
        }), 
        __metadata('design:paramtypes', [models_1.Bundle, models_1.Order])
    ], MealsStepComponent);
    return MealsStepComponent;
}(StepComponent_1.StepComponent));
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = MealsStepComponent;
//# sourceMappingURL=index.js.map