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
var index_1 = require('../../components/popup--allergy/index');
var _ = require('lodash');
var OrderSummaryStepComponent = (function (_super) {
    __extends(OrderSummaryStepComponent, _super);
    function OrderSummaryStepComponent(order) {
        _super.call(this);
        this.order = order;
        this.bundles = _.clone(this.order.bundles);
    }
    OrderSummaryStepComponent.prototype.addAnotherBundle = function () {
        this.addBundle();
        this.setStep('meal-plan');
    };
    OrderSummaryStepComponent.prototype.updateAllergyNote = function (bundle) {
        var _this = this;
        this.showPopup(index_1.AllergyPopupComponent, {
            providers: [{ provide: 'allergies', useValue: _.clone(bundle.allergies) }, { provide: models_1.Bundle, useValue: bundle }],
            close: function (allergyPopup) {
                bundle.allergies = allergyPopup.bundleAllergies;
                _this.checkAgainstTriggers();
            }
        });
        return false;
    };
    OrderSummaryStepComponent.prototype.subtotal = function (bundle) {
        return bundle.total;
    };
    OrderSummaryStepComponent.stepName = 'order-summary';
    OrderSummaryStepComponent.title = 'Your order';
    OrderSummaryStepComponent.options = { showSteps: false, showPrev: true };
    OrderSummaryStepComponent = __decorate([
        core_1.Component({
            selector: 'div.step-container',
            templateUrl: 'app/steps/order-summary/template.html',
            styleUrls: ['dist/app/steps/order-summary/styles.css']
        }), 
        __metadata('design:paramtypes', [models_1.Order])
    ], OrderSummaryStepComponent);
    return OrderSummaryStepComponent;
}(StepComponent_1.StepComponent));
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = OrderSummaryStepComponent;
//# sourceMappingURL=index.js.map