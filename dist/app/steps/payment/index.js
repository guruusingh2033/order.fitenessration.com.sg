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
var models_1 = require('../../imports/models');
var StepComponent_1 = require('../../imports/StepComponent');
var ApiService_1 = require('../../imports/ApiService');
var Calendar_1 = require('../../imports/Calendar');
var _ = require('lodash');
var PaymentStepComponent = (function (_super) {
    __extends(PaymentStepComponent, _super);
    function PaymentStepComponent(order, apiService, changeDetector, user) {
        var _this = this;
        _super.call(this);
        this.order = order;
        this.apiService = apiService;
        this.changeDetector = changeDetector;
        this.user = user;
        this.showCalendar = false;
        this.errorMessage = null;
        this.submittedOrder = false;
        this.showLoading = false;
        this.loading = true;
        this._calendar = new Calendar_1.Calendar(this.apiService, this.order);
        this.apiService.get('payment/client-token').subscribe(function (response) {
            var clientToken = response.json();
            braintree.setup(clientToken, 'custom', {
                id: 'checkout-form',
                hostedFields: {
                    styles: _.merge({
                        'input': {
                            'font-size': '25.48px'
                        },
                        'input.invalid': {
                            'box-shadow': '0px 0px 2px 0px #D0021B'
                        }
                    }, _.reduce({ cvv: 177, number: 262, 'expirationMonth, expirationYear': 45 }, function (styles, width, field) {
                        var media = "@media screen and (max-width: " + width + "px)";
                        styles[media] = {};
                        return _.reduce(field.split(', '), function (s, f) {
                            s[media][("input." + f)] = {
                                'font-size': '12px'
                            };
                            return s;
                        }, styles);
                    }, {})),
                    number: { selector: '#card-number' },
                    cvv: { selector: '#cvv' },
                    expirationMonth: { selector: '#expiration-month' },
                    expirationYear: { selector: '#expiration-year' }
                },
                onPaymentMethodReceived: function (obj) {
                    var order = _this.order.serialize();
                    order.paymentNonce = obj.nonce;
                    _this.submitOrder(order);
                },
                onReady: function () {
                    _this.loading = false;
                    _this.changeDetector.detectChanges();
                }
            });
        });
    }
    PaymentStepComponent.prototype.submitOrder = function (order) {
        var _this = this;
        if (!this.submittedOrder) {
            var timerId = setTimeout(function () {
                _this.showLoading = true;
                _this.changeDetector.detectChanges();
            }, 200);
            this.submittedOrder = true;
            this.changeDetector.detectChanges();
            // var order = this.order.serialize();
            this.apiService.post('orders', order)
                .subscribe(function (response) {
                clearTimeout(timerId);
                _this.showLoading = false;
                var json = response.json();
                if (json.success) {
                    _this.order.id = json.orderId;
                    _this.next();
                }
                else {
                    _this.submittedOrder = false;
                    if (json.error == 'deliveryDate') {
                        _this.order.deliveryOptions.date = null;
                        for (var _i = 0, _a = models_1.data.meals.list; _i < _a.length; _i++) {
                            var meal = _a[_i];
                            meal.stock = json.stock[meal._id];
                        }
                        _this.showCalendar = true;
                    }
                    else if (json.error == 'payment') {
                        _this.errorMessage = json.response.message;
                    }
                    else {
                        _this.errorMessage = 'There was an error processing your request. Please try again later.';
                    }
                }
                _this.changeDetector.detectChanges();
            });
        }
    };
    PaymentStepComponent.prototype.dateSet = function () {
        var _this = this;
        return function (month, cb) {
            _this._calendar.dateSet(month, cb);
        };
    };
    PaymentStepComponent.prototype._timeSlots = function () {
        if (this.order && this.order.deliveryOptions.date && this._calendar.timeSlots) {
            return _.map(this._calendar.timeSlots[this.order.deliveryOptions.date], function (timeSlotId) { return models_1.data.timeSlots.findById(timeSlotId); });
        }
        else {
            return [];
        }
    };
    PaymentStepComponent.prototype.selectDate = function (date) {
        this.showCalendar = false;
        this.order.deliveryOptions.date = date.toJSON().substr(0, 10);
    };
    PaymentStepComponent.prototype.pay = function () {
        if (!this.user.profile.debug) {
            $('#checkout-form [type=submit]')[0].click();
        }
        else {
            this.submitOrder(this.order.serialize());
        }
    };
    PaymentStepComponent.stepName = 'payment';
    PaymentStepComponent.title = 'Payment';
    PaymentStepComponent.options = { showSteps: false, showPrev: true };
    PaymentStepComponent = __decorate([
        core_1.Component({
            selector: 'div.step-container',
            templateUrl: 'app/steps/payment/template.html',
            styleUrls: ['dist/app/steps/payment/styles.css']
        }),
        __param(3, core_1.Inject('user')), 
        __metadata('design:paramtypes', [models_1.Order, ApiService_1.ApiService, core_1.ChangeDetectorRef, Object])
    ], PaymentStepComponent);
    return PaymentStepComponent;
}(StepComponent_1.StepComponent));
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = PaymentStepComponent;
//# sourceMappingURL=index.js.map