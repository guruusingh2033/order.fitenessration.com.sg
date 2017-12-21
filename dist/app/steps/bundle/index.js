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
var _ = require('lodash');
var BundleStepComponent = (function (_super) {
    __extends(BundleStepComponent, _super);
    function BundleStepComponent(bundle) {
        _super.call(this);
        this.bundle = bundle;
    }
    Object.defineProperty(BundleStepComponent.prototype, "bundleTypes", {
        get: function () {
            return models_1.data.bundleTypes.find({ mealPlan: this.bundle.mealPlan, portion: this.bundle.portion });
        },
        enumerable: true,
        configurable: true
    });
    BundleStepComponent.prototype.ready = function () {
        return !!this.bundle.type;
    };
    BundleStepComponent.prototype.premiumPrice = function (bundleType) {
        var meals = _.filter(models_1.data.meals.premium, { mealPlan: bundleType.mealPlan, portion: bundleType.portion });
        var cheapestMeal = meals.sort(function (a, b) {
            return a.price - b.price;
        })[0];
        if (cheapestMeal) {
            return cheapestMeal.price;
        }
        else {
            return 0;
        }
    };
    BundleStepComponent.prototype.perks = function (bundleType) {
        var perks = [];
        if (!bundleType.deliveryFee) {
            perks.push('Complimentary Delivery');
        }
        else {
            perks.push('$' + models_1.data.fulfillmentSettings.deliveryFee + ' delivery fee');
        }
        if (bundleType.premiumMeals) {
            perks.push(bundleType.premiumMeals + (" Premium Meal" + (bundleType.premiumMeals > 1 ? 's' : '') + " Included"));
        }
        else {
            perks.push('$' + this.premiumPrice(bundleType) + ' onward per premium');
        }
        return perks.join(' + ');
    };
    BundleStepComponent.prototype.selectBundleType = function (bundleType) {
        if (!this.bundle.type || this.bundle.type._id != bundleType._id) {
            this.bundle.type = bundleType;
            this.bundle.mealSelections = [];
        }
    };
    BundleStepComponent.prototype.description = function (bundleType) {
        if (bundleType.basicMeals && bundleType.premiumMeals) {
            return bundleType.basicMeals + " basic + " + bundleType.premiumMeals + " premium meals.";
        }
        else if (bundleType.basicMeals) {
            return bundleType.basicMeals + " basic meals.";
        }
        else if (bundleType.premiumMeals) {
            return bundleType.premiumMeals + " premium meals.";
        }
    };
    BundleStepComponent.stepName = 'bundle';
    BundleStepComponent.title = 'Select your bundle';
    BundleStepComponent.options = { showPrev: true };
    BundleStepComponent = __decorate([
        core_1.Component({
            selector: 'div.step-container',
            templateUrl: 'app/steps/bundle/template.html',
            styleUrls: ['dist/app/steps/bundle/styles.css']
        }), 
        __metadata('design:paramtypes', [models_1.Bundle])
    ], BundleStepComponent);
    return BundleStepComponent;
}(StepComponent_1.StepComponent));
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = BundleStepComponent;
//# sourceMappingURL=index.js.map