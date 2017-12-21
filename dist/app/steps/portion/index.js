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
var PortionStepComponent = (function (_super) {
    __extends(PortionStepComponent, _super);
    function PortionStepComponent(bundle) {
        _super.call(this);
        this.bundle = bundle;
        this.portions = models_1.data.portions.list;
    }
    PortionStepComponent.prototype.ready = function () {
        return !!this.bundle.portion;
    };
    PortionStepComponent.prototype.selectPortion = function (portion) {
        if (!this.bundle.portion || this.bundle.portion._id != portion._id) {
            this.bundle.portion = portion;
            this.bundle.type = null;
            this.bundle.mealSelections = [];
        }
    };
    PortionStepComponent.stepName = 'portion';
    PortionStepComponent.title = 'Select your portion';
    PortionStepComponent.options = { showPrev: true };
    PortionStepComponent = __decorate([
        core_1.Component({
            selector: 'div.step-container',
            templateUrl: 'app/steps/portion/template.html',
            styleUrls: ['dist/app/steps/portion/styles.css']
        }), 
        __metadata('design:paramtypes', [models_1.Bundle])
    ], PortionStepComponent);
    return PortionStepComponent;
}(StepComponent_1.StepComponent));
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = PortionStepComponent;
//# sourceMappingURL=index.js.map