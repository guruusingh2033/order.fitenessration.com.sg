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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var core_1 = require('@angular/core');
var models_1 = require('../../imports/models');
var index_1 = require('../../components/account/index');
var StepComponent_1 = require('../../imports/StepComponent');
var MealPlanStepComponent = (function (_super) {
    __extends(MealPlanStepComponent, _super);
    function MealPlanStepComponent(user, bundle) {
        _super.call(this);
        this.user = user;
        this.bundle = bundle;
        this.mealPlans = models_1.data.mealPlans.list;
    }
    MealPlanStepComponent.prototype.selectMealPlan = function (mealPlan) {
        if (!this.bundle.mealPlan || this.bundle.mealPlan._id != mealPlan._id) {
            this.bundle.mealPlan = mealPlan;
            this.bundle.type = null;
            this.bundle.mealSelections = [];
        }
    };
    MealPlanStepComponent.prototype.account = function () {
        var _this = this;
        this.showPopup(index_1.AccountComponent, {
            init: {
                type: 'login',
            },
            initComponent: function (component) {
                component.onLogin = function () {
                    _this.initUserData(function () {
                    });
                };
            }
        });
    };
    MealPlanStepComponent.stepName = 'meal-plan';
    MealPlanStepComponent.title = 'Select your meal plan';
    MealPlanStepComponent.options = { showPrev: false };
    MealPlanStepComponent = __decorate([
        core_1.Component({
            selector: 'div.step-container',
            templateUrl: 'app/steps/meal-plan/template.html',
            styleUrls: ['dist/app/steps/meal-plan/styles.css']
        }),
        __param(0, core_1.Inject('user')), 
        __metadata('design:paramtypes', [Object, models_1.Bundle])
    ], MealPlanStepComponent);
    return MealPlanStepComponent;
}(StepComponent_1.StepComponent));
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = MealPlanStepComponent;
//# sourceMappingURL=index.js.map