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
var SurveySuccessStepComponent = (function (_super) {
    __extends(SurveySuccessStepComponent, _super);
    function SurveySuccessStepComponent() {
        _super.call(this);
    }
    SurveySuccessStepComponent.stepName = 'survey-success';
    SurveySuccessStepComponent.title = 'Thank you';
    SurveySuccessStepComponent.options = { showSteps: false, showPrev: true };
    SurveySuccessStepComponent = __decorate([
        core_1.Component({
            selector: 'div.step-container',
            templateUrl: 'app/steps/survey-success/template.html',
            styleUrls: ['dist/app/steps/survey-success/styles.css']
        }), 
        __metadata('design:paramtypes', [])
    ], SurveySuccessStepComponent);
    return SurveySuccessStepComponent;
}(StepComponent_1.StepComponent));
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = SurveySuccessStepComponent;
//# sourceMappingURL=index.js.map