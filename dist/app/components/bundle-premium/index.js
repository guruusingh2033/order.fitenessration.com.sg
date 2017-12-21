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
var order_1 = require('../../common/scripts/order');
var NAME = 'bundle-premium';
var BundlePremiumComponent = (function () {
    function BundlePremiumComponent() {
    }
    BundlePremiumComponent.prototype.total = function () {
        return order_1.bundlePremiumTotal(this.bundle);
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', models_1.Bundle)
    ], BundlePremiumComponent.prototype, "bundle", void 0);
    BundlePremiumComponent = __decorate([
        core_1.Component({
            selector: NAME,
            templateUrl: "app/components/" + NAME + "/template.html",
            styleUrls: [("dist/app/components/" + NAME + "/styles.css")]
        }), 
        __metadata('design:paramtypes', [])
    ], BundlePremiumComponent);
    return BundlePremiumComponent;
}());
exports.BundlePremiumComponent = BundlePremiumComponent;
//# sourceMappingURL=index.js.map