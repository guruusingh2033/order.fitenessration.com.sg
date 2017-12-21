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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var core_1 = require('@angular/core');
var models_1 = require('../../imports/models');
var order_1 = require('../../common/scripts/order');
var NAME = 'popup--allergy';
var AllergyPopupComponent = (function () {
    function AllergyPopupComponent(bundleAllergies, bundle) {
        this.bundleAllergies = bundleAllergies;
        this.bundle = bundle;
        this.allergies = models_1.data.ingredients.allergens;
        console.log(bundle);
    }
    AllergyPopupComponent.prototype.toggle = function (allergy, b) {
        if (b) {
            this.bundleAllergies.push(allergy);
        }
        else {
            this.bundleAllergies.splice(this.bundleAllergies.indexOf(allergy), 1);
        }
    };
    AllergyPopupComponent.prototype.total = function (allergy) {
        return order_1.allergyTotal(allergy, this.bundle);
    };
    AllergyPopupComponent.prototype.save = function () {
        this.close();
    };
    AllergyPopupComponent.title = 'Allergy';
    AllergyPopupComponent = __decorate([
        core_1.Component({
            selector: 'allergies',
            templateUrl: "app/components/" + NAME + "/template.html",
            styleUrls: [("dist/app/components/" + NAME + "/styles.css")]
        }),
        __param(0, core_1.Inject('allergies')), 
        __metadata('design:paramtypes', [Array, models_1.Bundle])
    ], AllergyPopupComponent);
    return AllergyPopupComponent;
}());
exports.AllergyPopupComponent = AllergyPopupComponent;
//# sourceMappingURL=index.js.map