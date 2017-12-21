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
var ApiService_1 = require('../../imports/ApiService');
var AddDeliveryAddressComponent = (function () {
    function AddDeliveryAddressComponent(apiService) {
        this.apiService = apiService;
        this.title = 'Add delivery address';
    }
    AddDeliveryAddressComponent.prototype.init = function (_a) {
        var user = _a.user;
        this.user = user;
    };
    AddDeliveryAddressComponent.prototype.save = function () {
        this.user.profile.deliveryAddresses.push({ address: this.address, postalCode: this.postalCode });
        this.apiService.post('users/delivery-addresses', { address: this.address, postalCode: this.postalCode }).subscribe(function (response) {
        });
        this.close();
    };
    AddDeliveryAddressComponent = __decorate([
        core_1.Component({
            selector: 'add-delivery-address',
            styleUrls: ['dist/app/components/add-delivery-address/styles.css'],
            templateUrl: 'app/components/add-delivery-address/template.html'
        }), 
        __metadata('design:paramtypes', [ApiService_1.ApiService])
    ], AddDeliveryAddressComponent);
    return AddDeliveryAddressComponent;
}());
exports.AddDeliveryAddressComponent = AddDeliveryAddressComponent;
//# sourceMappingURL=index.js.map