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
var StepComponent_1 = require('../../imports/StepComponent');
var models_1 = require('../../imports/models');
var index_1 = require('../../components/add-on-details/index');
var _ = require('lodash');
var AddOnsStepComponent = (function (_super) {
    __extends(AddOnsStepComponent, _super);
    function AddOnsStepComponent(order) {
        _super.call(this);
        this.order = order;
        this.showSummary = false;
        this.currentCategory = 'All';
    }
    AddOnsStepComponent.prototype.quantity = function (addOn, component) {
        var addOnSelection = this.order.getAddOnSelection(addOn, component, false);
        if (addOnSelection) {
            return addOnSelection.quantity;
        }
        else {
            return 0;
        }
    };
    AddOnsStepComponent.prototype.increase = function (addOn, component) {
        this.order.addAddOn(addOn, component);
        this.checkAgainstTriggers();
        return false;
    };
    AddOnsStepComponent.prototype.decrease = function (addOn, component) {
        this.order.removeAddOn(addOn, component);
        this.checkAgainstTriggers();
        return false;
    };
    AddOnsStepComponent.prototype.addOnsForCategory = function (category) {
        if (category == 'All') {
            return models_1.data.addOns.list;
        }
        else {
            return _.filter(models_1.data.addOns.list, function (addOn) { return addOn.category == category; });
        }
    };
    AddOnsStepComponent.prototype.showDetails = function (addOn) {
        this.showPopup(index_1.AddOnDetailsComponent, {
            title: false,
            fullscreen: true,
            providers: [{ provide: 'add-on', useValue: addOn }]
        }, 'popup');
        return false;
    };
    AddOnsStepComponent.prototype.toggleSummary = function () {
        this.showSummary = !this.showSummary;
    };
    AddOnsStepComponent.stepName = 'add-ons';
    AddOnsStepComponent.title = 'Hold up! Add-ons?';
    AddOnsStepComponent.options = { showSteps: false, showPrev: true };
    AddOnsStepComponent = __decorate([
        core_1.Component({
            selector: 'div.step-container',
            templateUrl: 'app/steps/add-ons/template.html',
            styleUrls: ['dist/app/steps/add-ons/styles.css']
        }), 
        __metadata('design:paramtypes', [models_1.Order])
    ], AddOnsStepComponent);
    return AddOnsStepComponent;
}(StepComponent_1.StepComponent));
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = AddOnsStepComponent;
//# sourceMappingURL=index.js.map