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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var core_1 = require('@angular/core');
var StepComponent_1 = require('../../imports/StepComponent');
var forms_1 = require('@angular/forms');
var models_1 = require('../../imports/models');
var Calendar_1 = require('../../imports/Calendar');
var date_1 = require('../../common/scripts/date');
var ApiService_1 = require('../../imports/ApiService');
var index_1 = require('../../components/use-promo-code/index');
var index_2 = require('../../components/add-delivery-address/index');
var helpers_1 = require('../../imports/helpers');
var _ = require('lodash');
var DeliveryStepComponent = (function (_super) {
    __extends(DeliveryStepComponent, _super);
    function DeliveryStepComponent(builder, apiService, order, user) {
        _super.call(this);
        this.builder = builder;
        this.apiService = apiService;
        this.order = order;
        this.user = user;
        this.showCalendar = false;
        if (this.order.deliveryOptions.date) {
            this.selectedDate = new Date(Date.parse(this.order.deliveryOptions.date + ' 00:00'));
        }
        else {
        }
        this._calendar = new Calendar_1.Calendar(this.apiService, this.order);
    }
    DeliveryStepComponent.prototype.requireAddress = function () {
        return true;
    };
    DeliveryStepComponent.prototype.dateSet = function () {
        var _this = this;
        return function (month, cb) {
            _this._calendar.dateSet(month, cb);
        };
    };
    DeliveryStepComponent.prototype._timeSlots = function () {
        if (this.order && this.order.deliveryOptions.date && this._calendar.timeSlots) {
            return _.map(this._calendar.timeSlots[this.order.deliveryOptions.date], function (timeSlotId) { return models_1.data.timeSlots.findById(timeSlotId); });
        }
        else {
            return [];
        }
    };
    DeliveryStepComponent.prototype.selectDate = function (date) {
        this.showCalendar = false;
        this.order.deliveryOptions.date = date_1.formatDate(date);
    };
    DeliveryStepComponent.prototype.asdf = function () {
        this.submitButton.nativeElement.click();
    };
    DeliveryStepComponent.prototype.fulfillmentDate = function () {
        return helpers_1.humanDateFormat(this.order.deliveryOptions.date);
    };
    DeliveryStepComponent.prototype.addDeliveryAddress = function () {
        var user = this.user;
        this.showPopup(index_2.AddDeliveryAddressComponent, {
            init: { user: user }
        });
    };
    Object.defineProperty(DeliveryStepComponent.prototype, "selectedDeliveryAddress", {
        get: function () {
            for (var i = 0; i < this.user.profile.deliveryAddresses.length; ++i) {
                if (this.order.deliveryOptions.address == this.user.profile.deliveryAddresses[i].address && this.order.deliveryOptions.postalCode == this.user.profile.deliveryAddresses[i].postalCode) {
                    return i;
                }
            }
            return null;
        },
        set: function (i) {
            this.order.deliveryOptions.address = this.user.profile.deliveryAddresses[i].address;
            this.order.deliveryOptions.postalCode = this.user.profile.deliveryAddresses[i].postalCode;
        },
        enumerable: true,
        configurable: true
    });
    DeliveryStepComponent.prototype.ngAfterViewInit = function () {
        var _this = this;
        this.form.nativeElement.addEventListener('submit', function () {
            _this.next();
            return false;
        });
    };
    DeliveryStepComponent.prototype.usePromoCode = function () {
        var _this = this;
        this.showPopup(index_1.UsePromoCodeComponent, {
            initComponent: function (popup) {
                popup.onApply = function () {
                    _this.apiService.post('promo-codes/validate', { order: _this.order.serialize(), promoCode: popup.promoCode }).subscribe(function (response) {
                        var r = response.json();
                        if (r.result) {
                            var promotion = models_1.Promotion.instantiate(models_1.Promotion, {
                                _id: r.promotion._id._str,
                                name: r.promotion.name,
                                deliveryFee: r.promotion.deliveryFee,
                                discount: r.promotion.discount,
                                overridePrice: r.promotion.overridePrice,
                                premiumAllowance: r.promotion.premiumAllowance,
                                mealPlan: r.promotion.mealPlan ? r.promotion.mealPlan._str : null,
                                portion: r.promotion.portion ? r.promotion.portion._str : null,
                                bundleType: r.promotion.bundleType ? r.promotion.bundleType._str : null,
                                type: r.promotion.type
                            });
                            for (var _i = 0, _a = r.bundles; _i < _a.length; _i++) {
                                var index = _a[_i];
                                _this.order.bundles[index].promotion = promotion;
                            }
                            popup.close();
                        }
                        else {
                            var errorString;
                            if (_.isString(r.error)) {
                                switch (r.error) {
                                    case 'invalidPromoCode':
                                        errorString = 'Invalid promo code.';
                                        break;
                                    case 'promotionNotStarted':
                                        errorString = 'The promotion has not yet started.';
                                        break;
                                    case 'promotionEnded':
                                        errorString = 'The promotion has already ended.';
                                        break;
                                    case 'invalidFulfillmentDate':
                                        errorString = 'The fulfillment date you have chosen is not allowed by the promotion.';
                                        break;
                                    case 'alreadyUsed':
                                        errorString = 'You have already used this promo code.';
                                        break;
                                    case 'notCompatible':
                                        errorString = 'The promo code you have used is not compatible with your order.';
                                        break;
                                }
                            }
                            else {
                                switch (r.error.error) {
                                    case 'surpassedPremiumCap':
                                        errorString = "This promo code allows for a maximum of " + r.error.premiumCap + " premium meal" + (r.error.premiumCap == 1 ? '' : 's') + ". Change your selection to proceed.";
                                        break;
                                }
                            }
                            popup.errorString = errorString;
                        }
                    });
                };
            }
        });
    };
    DeliveryStepComponent.stepName = 'delivery';
    DeliveryStepComponent.title = 'Delivery options';
    DeliveryStepComponent.options = { showPrev: true, showSteps: false };
    __decorate([
        core_1.ViewChild('form'), 
        __metadata('design:type', core_1.ElementRef)
    ], DeliveryStepComponent.prototype, "form", void 0);
    __decorate([
        core_1.ViewChild('submitButton'), 
        __metadata('design:type', core_1.ElementRef)
    ], DeliveryStepComponent.prototype, "submitButton", void 0);
    DeliveryStepComponent = __decorate([
        core_1.Component({
            templateUrl: 'app/steps/delivery/template.html',
            styleUrls: ['dist/app/steps/delivery/styles.css'],
            selector: 'div.step-container',
        }),
        __param(3, core_1.Inject('user')), 
        __metadata('design:paramtypes', [forms_1.FormBuilder, ApiService_1.ApiService, models_1.Order, Object])
    ], DeliveryStepComponent);
    return DeliveryStepComponent;
}(StepComponent_1.StepComponent));
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = DeliveryStepComponent;
//# sourceMappingURL=index.js.map