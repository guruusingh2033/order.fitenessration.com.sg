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
var common_1 = require('@angular/common');
var index_1 = require('../../components/order/index');
exports.deliveryStep = {
    ready: function () {
        return true;
        // for (var control in this.form.controls) {
        //   this.form.controls[control]._touched = true;
        // }
        // return this.form._status == 'VALID';
    },
    component: function (_a) {
        var body = _a.body;
        var BodyComponent = (function () {
            function BodyComponent(builder) {
                this.builder = builder;
                this.form = builder.group({
                    firstName: new common_1.Control('', common_1.Validators.required),
                    surname: new common_1.Control('', common_1.Validators.required),
                    contactNumber: new common_1.Control('', common_1.Validators.required),
                    deliveryAddress: new common_1.Control('', common_1.Validators.required),
                    postalCode: new common_1.Control('', common_1.Validators.required),
                    fulfillmentDate: new common_1.Control('', common_1.Validators.required),
                    fulfillmentTime: new common_1.Control('', common_1.Validators.required),
                });
            }
            BodyComponent.prototype.submit = function (value) {
                console.log(value);
            };
            BodyComponent = __decorate([
                core_1.Component({
                    directives: [common_1.FORM_DIRECTIVES, index_1.OrderComponent],
                    template: body.template,
                    styleUrls: body.styleUrls,
                    selector: body.selector,
                }), 
                __metadata('design:paramtypes', [common_1.FormBuilder])
            ], BodyComponent);
            return BodyComponent;
        }());
        return { body: BodyComponent };
    }
};
//# sourceMappingURL=step.js.map