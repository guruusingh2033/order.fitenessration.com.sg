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
var SuccessStepComponent = (function (_super) {
    __extends(SuccessStepComponent, _super);
    function SuccessStepComponent(order) {
        _super.call(this);
        this.order = order;
    }
    SuccessStepComponent.prototype.invoiceUrl = function () {
        return config.apiBaseUrl + "admin/invoices?orders=" + this.order.id;
    };
    SuccessStepComponent.stepName = 'success';
    SuccessStepComponent.title = 'Order success';
    SuccessStepComponent.options = { showSteps: false, showPrev: false };
    SuccessStepComponent = __decorate([
        core_1.Component({
            selector: 'div.step-container',
            templateUrl: 'app/steps/success/template.html',
            styleUrls: ['dist/app/steps/success/styles.css']
        }), 
        __metadata('design:paramtypes', [models_1.Order])
    ], SuccessStepComponent);
    return SuccessStepComponent;
}(StepComponent_1.StepComponent));
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = SuccessStepComponent;
//# sourceMappingURL=index.js.map