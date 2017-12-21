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
var PricePipe_1 = require('../../imports/PricePipe');
var index_1 = require('../bundle-summary/index');
var index_2 = require('../bundle-allergies/index');
var index_3 = require('../bundle-meals/index');
var NAME = 'bundle';
var BundleComponent = (function () {
    function BundleComponent() {
        this._allergies = true;
    }
    Object.defineProperty(BundleComponent.prototype, "bundle", {
        set: function (bundle) {
            this.b = bundle;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BundleComponent.prototype, "allergies", {
        set: function (allergies) {
            console.log(allergies);
            this._allergies = JSON.parse(allergies);
        },
        enumerable: true,
        configurable: true
    });
    BundleComponent = __decorate([
        core_1.Component({
            selector: NAME,
            templateUrl: "app/components/" + NAME + "/template.html",
            styleUrls: [("dist/app/components/" + NAME + "/styles.css")],
            pipes: [PricePipe_1.PricePipe],
            inputs: ['bundle', 'allergies'],
            directives: [index_1.BundleSummaryComponent, index_2.BundleAllergiesComponent, index_3.BundleMealsComponent]
        }), 
        __metadata('design:paramtypes', [])
    ], BundleComponent);
    return BundleComponent;
}());
exports.BundleComponent = BundleComponent;
//# sourceMappingURL=index.js.map