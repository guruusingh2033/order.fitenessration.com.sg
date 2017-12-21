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
var models_1 = require('../../imports/models');
var BundleComponent = (function () {
    function BundleComponent() {
        this._allergies = true;
    }
    Object.defineProperty(BundleComponent.prototype, "allergies", {
        set: function (allergies) {
            this._allergies = JSON.parse(allergies);
        },
        enumerable: true,
        configurable: true
    });
    __decorate([
        core_1.Input(), 
        __metadata('design:type', models_1.Bundle)
    ], BundleComponent.prototype, "bundle", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object), 
        __metadata('design:paramtypes', [Object])
    ], BundleComponent.prototype, "allergies", null);
    BundleComponent = __decorate([
        core_1.Component({
            selector: 'bundle',
            templateUrl: "app/components/bundle/template.html",
            styleUrls: ["dist/app/components/bundle/styles.css"],
        }), 
        __metadata('design:paramtypes', [])
    ], BundleComponent);
    return BundleComponent;
}());
exports.BundleComponent = BundleComponent;
//# sourceMappingURL=index.js.map