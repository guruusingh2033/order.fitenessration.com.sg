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
var NAME = 'add-on-details';
var AddOnDetailsComponent = (function () {
    function AddOnDetailsComponent(addOn) {
        this.addOn = addOn;
        this.currentImage = 0;
    }
    AddOnDetailsComponent.prototype.prevImage = function () {
        this.currentImage = (this.currentImage - 1 + this.addOn.images.length) % this.addOn.images.length;
    };
    AddOnDetailsComponent.prototype.nextImage = function () {
        this.currentImage = (this.currentImage + 1) % this.addOn.images.length;
    };
    AddOnDetailsComponent = __decorate([
        core_1.Component({
            selector: NAME,
            templateUrl: "app/components/" + NAME + "/template.html",
            styleUrls: [("dist/app/components/" + NAME + "/styles.css")],
        }),
        __param(0, core_1.Inject('add-on')), 
        __metadata('design:paramtypes', [models_1.AddOn])
    ], AddOnDetailsComponent);
    return AddOnDetailsComponent;
}());
exports.AddOnDetailsComponent = AddOnDetailsComponent;
//# sourceMappingURL=index.js.map