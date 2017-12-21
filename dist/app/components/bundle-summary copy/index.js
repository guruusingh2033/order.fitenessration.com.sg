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
var DisplayPipe_1 = require('../../imports/DisplayPipe');
var models_1 = require('../../imports/models');
var NAME = 'bundle-summary';
var BundleSummaryComponent = (function () {
    function BundleSummaryComponent() {
        this.bundleTypes = models_1.bundleTypeDefs;
    }
    Object.defineProperty(BundleSummaryComponent.prototype, "bundle", {
        set: function (bundle) {
            this.b = bundle;
        },
        enumerable: true,
        configurable: true
    });
    BundleSummaryComponent = __decorate([
        core_1.Component({
            selector: NAME,
            templateUrl: "app/components/" + NAME + "/template.html",
            styleUrls: [("dist/app/components/" + NAME + "/styles.css")],
            pipes: [PricePipe_1.PricePipe, DisplayPipe_1.DisplayPipe],
            inputs: ['bundle']
        }), 
        __metadata('design:paramtypes', [])
    ], BundleSummaryComponent);
    return BundleSummaryComponent;
}());
exports.BundleSummaryComponent = BundleSummaryComponent;
//# sourceMappingURL=index.js.map