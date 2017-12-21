"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var _ = require('lodash');
var DateSet_1 = require('../common/scripts/DateSet');
var order_1 = require('../common/scripts/order');
function serializeArray(array) {
    return _.map(array, function (el) { return el.serialize(); });
}
var ModelList = (function () {
    function ModelList(model, scopes) {
        var _this = this;
        if (scopes === void 0) { scopes = {}; }
        this.list = [];
        this.model = model;
        for (var scopeName in scopes) {
            (function (scopeName) {
                Object.defineProperty(_this, scopeName, {
                    get: function () {
                        return this.find(scopes[scopeName]);
                    }
                });
            })(scopeName);
        }
    }
    ModelList.prototype.findById = function (id) {
        return _.find(this.list, { _id: id });
    };
    ModelList.prototype.add = function (instance) {
        this.list.push(instance);
    };
    ModelList.prototype.addArray = function (array) {
        for (var _i = 0, array_1 = array; _i < array_1.length; _i++) {
            var doc = array_1[_i];
            this.add(Model.instantiate(this.model, doc));
        }
    };
    ModelList.prototype.find = function (query) {
        return _.filter(this.list, query);
    };
    ModelList.prototype.findOne = function (query) {
        return this.find(query)[0];
    };
    return ModelList;
}());
var Model = (function () {
    function Model() {
    }
    Model.prototype.serialize = function () {
        return this._id;
    };
    Model.instantiate = function (model, data) {
        var instance = new model();
        for (var property in data) {
            if (model.mappings && model.mappings[property]) {
                instance[model.mappings[property]] = data[property];
            }
            else {
                instance[property] = data[property];
            }
        }
        return instance;
    };
    return Model;
}());
var AddOn = (function (_super) {
    __extends(AddOn, _super);
    function AddOn() {
        _super.apply(this, arguments);
    }
    return AddOn;
}(Model));
exports.AddOn = AddOn;
function amPm(time, appendSuffix) {
    if (appendSuffix === void 0) { appendSuffix = true; }
    var hours = parseInt(time.split(':')[0]);
    var suffix = hours >= 12 ? "pm" : "am";
    hours = ((hours + 11) % 12 + 1);
    return hours + (appendSuffix ? '' + suffix : '');
}
var TimeSlot = (function (_super) {
    __extends(TimeSlot, _super);
    function TimeSlot() {
        _super.apply(this, arguments);
    }
    TimeSlot.prototype.toString = function () {
        return amPm(this.start, false) + '-' + amPm(this.end);
    };
    return TimeSlot;
}(Model));
exports.TimeSlot = TimeSlot;
var Promotion = (function (_super) {
    __extends(Promotion, _super);
    function Promotion() {
        _super.apply(this, arguments);
    }
    Object.defineProperty(Promotion.prototype, "portion", {
        get: function () {
            return exports.data.portions.findById(this.portionId);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Promotion.prototype, "mealPlan", {
        get: function () {
            return exports.data.mealPlans.findById(this.mealPlanId);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Promotion.prototype, "bundleType", {
        get: function () {
            return exports.data.bundleTypes.findById(this.bundleTypeId);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Promotion.prototype, "displayValue", {
        get: function () {
            if (this.type == 'discount') {
                return '-' + (this.discount * 100) + '%';
            }
            else if (this.type == 'override') {
                return '$' + this.overridePrice.toFixed(2);
            }
        },
        enumerable: true,
        configurable: true
    });
    Promotion.mappings = {
        portion: 'portionId',
        mealPlan: 'mealPlanId',
        bundleType: 'bundleTypeId',
    };
    return Promotion;
}(Model));
exports.Promotion = Promotion;
var AnomalyTrigger = (function (_super) {
    __extends(AnomalyTrigger, _super);
    function AnomalyTrigger() {
        _super.apply(this, arguments);
    }
    Object.defineProperty(AnomalyTrigger.prototype, "portion", {
        get: function () {
            return exports.data.portions.findById(this.portionId);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AnomalyTrigger.prototype, "mealPlan", {
        get: function () {
            return exports.data.mealPlans.findById(this.mealPlanId);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AnomalyTrigger.prototype, "bundleType", {
        get: function () {
            return exports.data.bundleTypes.findById(this.bundleTypeId);
        },
        enumerable: true,
        configurable: true
    });
    AnomalyTrigger.mappings = {
        portion: 'portionId',
        mealPlan: 'mealPlanId',
        bundleType: 'bundleTypeId',
    };
    return AnomalyTrigger;
}(Model));
exports.AnomalyTrigger = AnomalyTrigger;
var IngredientList = (function (_super) {
    __extends(IngredientList, _super);
    function IngredientList() {
        _super.call(this, Ingredient, {
            main: { type: 'main' },
            allergens: { type: 'allergen' }
        });
    }
    return IngredientList;
}(ModelList));
var Ingredient = (function (_super) {
    __extends(Ingredient, _super);
    function Ingredient() {
        _super.apply(this, arguments);
    }
    Object.defineProperty(Ingredient.prototype, "slug", {
        get: function () {
            return this.name.toLowerCase();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Ingredient.prototype, "title", {
        get: function () {
            return this.name + " (" + this.action + ")";
        },
        enumerable: true,
        configurable: true
    });
    return Ingredient;
}(Model));
exports.Ingredient = Ingredient;
var BundleType = (function (_super) {
    __extends(BundleType, _super);
    function BundleType() {
        _super.apply(this, arguments);
    }
    Object.defineProperty(BundleType.prototype, "portion", {
        get: function () {
            return exports.data.portions.findById(this.portionId);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BundleType.prototype, "mealPlan", {
        get: function () {
            return exports.data.mealPlans.findById(this.mealPlanId);
        },
        enumerable: true,
        configurable: true
    });
    BundleType.mappings = {
        portion: 'portionId',
        mealPlan: 'mealPlanId'
    };
    return BundleType;
}(Model));
exports.BundleType = BundleType;
var LocationSurcharge = (function (_super) {
    __extends(LocationSurcharge, _super);
    function LocationSurcharge() {
        _super.apply(this, arguments);
    }
    return LocationSurcharge;
}(Model));
exports.LocationSurcharge = LocationSurcharge;
var MealPlan = (function (_super) {
    __extends(MealPlan, _super);
    function MealPlan() {
        _super.apply(this, arguments);
    }
    return MealPlan;
}(Model));
exports.MealPlan = MealPlan;
var Portion = (function (_super) {
    __extends(Portion, _super);
    function Portion() {
        _super.apply(this, arguments);
    }
    return Portion;
}(Model));
exports.Portion = Portion;
var Side = (function (_super) {
    __extends(Side, _super);
    function Side() {
        _super.apply(this, arguments);
    }
    return Side;
}(Model));
exports.Side = Side;
var MealList = (function (_super) {
    __extends(MealList, _super);
    function MealList() {
        _super.call(this, Meal, {
            basic: { grade: 'basic' },
            premium: { grade: 'premium' }
        });
    }
    return MealList;
}(ModelList));
var Meal = (function (_super) {
    __extends(Meal, _super);
    function Meal() {
        _super.apply(this, arguments);
    }
    Object.defineProperty(Meal.prototype, "ingredientsString", {
        get: function () {
            return [this.mainIngredient.name].concat(_.map(this.allergens, function (ingredient) { return ingredient.name; })).join(', ').toLowerCase();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Meal.prototype, "mealPlan", {
        get: function () {
            return exports.data.mealPlans.findById(this.mealPlanId);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Meal.prototype, "portion", {
        get: function () {
            return exports.data.portions.findById(this.portionId);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Meal.prototype, "allergens", {
        get: function () {
            return _.map(this.allergenIds, function (ingredientId) { return exports.data.ingredients.findById(ingredientId); });
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Meal.prototype, "sides", {
        get: function () {
            return _.map(this.sideIds, function (sideId) { return exports.data.sides.findById(sideId); });
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Meal.prototype, "mainIngredient", {
        get: function () {
            return exports.data.ingredients.findById(this.mainIngredientId);
        },
        enumerable: true,
        configurable: true
    });
    Meal.mappings = {
        allergens: 'allergenIds',
        mealPlan: 'mealPlanId',
        portion: 'portionId',
        sides: 'sideIds',
        mainIngredient: 'mainIngredientId'
    };
    return Meal;
}(Model));
exports.Meal = Meal;
var Data = (function () {
    function Data() {
        this.addOns = new ModelList(AddOn);
        this.ingredients = new IngredientList();
        this.bundleTypes = new ModelList(BundleType);
        this.mealPlans = new ModelList(MealPlan);
        this.sides = new ModelList(Side);
        this.meals = new MealList();
        this.portions = new ModelList(Portion);
        this.timeSlots = new ModelList(TimeSlot);
        this.anomalyTriggers = new ModelList(AnomalyTrigger);
        this.locationSurcharges = new ModelList(LocationSurcharge);
    }
    return Data;
}());
var MealSelection = (function () {
    function MealSelection(meal, quantity) {
        this.quantity = 1;
        this.meal = meal;
        this.quantity = quantity;
    }
    MealSelection.prototype.serialize = function () {
        return {
            mealId: this.meal._id,
            quantity: this.quantity,
        };
    };
    return MealSelection;
}());
exports.MealSelection = MealSelection;
var DeliveryOptions = (function () {
    function DeliveryOptions() {
        this.firstName = '';
        this.surname = '';
        this.contactNumber = '';
        this.selfCollection = false;
        this.address = '';
        this.postalCode = '';
        this.date = '';
        this.time = null;
        this.disposableCutlery = false;
        this.note = '';
    }
    DeliveryOptions.prototype.serialize = function () {
        return {
            firstName: this.firstName,
            surname: this.surname,
            contactNumber: this.contactNumber,
            selfCollection: this.selfCollection,
            address: this.address,
            postalCode: this.postalCode,
            date: this.date,
            time: this.time ? this.time._id : null,
            disposableCutlery: this.disposableCutlery,
            note: this.note
        };
    };
    return DeliveryOptions;
}());
exports.DeliveryOptions = DeliveryOptions;
// --- add ons --- //
var AddOnSelection = (function () {
    function AddOnSelection(addOn, variant, quantity) {
        this.addOn = addOn;
        this.variant = variant;
        this.quantity = quantity;
    }
    AddOnSelection.prototype.serialize = function () {
        return {
            addOnId: this.addOn._id,
            variant: this.variant,
            quantity: this.quantity
        };
    };
    return AddOnSelection;
}());
exports.AddOnSelection = AddOnSelection;
// --- bundles --- //
var Bundle = (function () {
    function Bundle() {
        this.mealSelections = [];
        this.allergies = [];
    }
    Bundle.prototype.getMeal = function (meal, create) {
        if (create === void 0) { create = true; }
        var i = _.findIndex(this.mealSelections, function (m) { return m.meal._id == meal._id; });
        if (i == -1) {
            if (create) {
                var m = new MealSelection(meal, 0);
                this.mealSelections.push(m);
                return m;
            }
            else {
                return null;
            }
        }
        else {
            return this.mealSelections[i];
        }
    };
    Bundle.prototype.addMeal = function (meal, force) {
        if (force === void 0) { force = false; }
        var m = this.getMeal(meal);
        if (this.order.mealQuantity(meal) != meal.stock || force) {
            m.quantity++;
            return true;
        }
        else {
            return false;
        }
    };
    Bundle.prototype.removeMeal = function (meal) {
        var m = this.getMeal(meal, false);
        if (m && m.quantity > 0) {
            m.quantity--;
            if (m.quantity == 0) {
                _.pull(this.mealSelections, m);
            }
        }
    };
    Object.defineProperty(Bundle.prototype, "price", {
        get: function () {
            return order_1.bundlePrice(this);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Bundle.prototype, "promotionDisplay", {
        get: function () {
            if (this.promotion) {
                var promotionPrice = this.price;
                return "$" + promotionPrice.toFixed(2) + " (" + Math.round((1 - promotionPrice / this.type.price) * 100) + "%)";
            }
            else {
                return '$' + this.type.price.toFixed(2);
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Bundle.prototype, "mealCount", {
        get: function () {
            return this.type.basicMeals;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Bundle.prototype, "total", {
        get: function () {
            return order_1.bundleTotal(this);
        },
        enumerable: true,
        configurable: true
    });
    Bundle.prototype.serialize = function () {
        return {
            mealPlan: this.mealPlan._id,
            type: this.type._id,
            portion: this.portion._id,
            allergies: serializeArray(this.allergies),
            mealSelections: serializeArray(this.mealSelections),
            promotion: this.promotion ? this.promotion.serialize() : undefined,
        };
    };
    return Bundle;
}());
exports.Bundle = Bundle;
// --- orders --- //
var Order = (function () {
    function Order() {
        var _this = this;
        this.bundles = [];
        this.addOnSelections = [];
        this.deliveryOptions = new DeliveryOptions();
        this.paymentInfo = new PaymentInfo();
        this._excludedFulfillmentDates = new DateSet_1.DateSet();
        this.availableFulfillmentDates = new DateSet_1.DateSet();
        this.triggeredAnomalyTriggers = [];
        this.availableFulfillmentDates.addRule('exclude', order_1.excludeAvailabilityDate({
            excludedFulfillmentDates: this._excludedFulfillmentDates,
            fulfillmentDays: function () { return _this.fulfillmentDays; }
        }));
    }
    Order.prototype.checkAgainstTriggers = function () {
        var triggers = order_1.orderQueryTriggers(this, exports.data.anomalyTriggers.list, {
            compareObjectId: function (a, b) { return a == b; }
        });
        var newTriggers = [];
        for (var _i = 0, triggers_1 = triggers; _i < triggers_1.length; _i++) {
            var trigger = triggers_1[_i];
            if (!this.triggeredAnomalyTriggers.find(function (t) { return t._id == trigger._id; })) {
                newTriggers.push(trigger);
            }
        }
        this.triggeredAnomalyTriggers = triggers;
        newTriggers.sort(function (a, b) { return b.delay - a.delay; });
        return newTriggers[0];
    };
    Object.defineProperty(Order.prototype, "fulfillmentDays", {
        get: function () {
            return order_1.orderFulfillmentDays(this, {
                findOne: function (collection, query) {
                    return exports.data[collection].findOne(query);
                },
                compareObjectId: function (a, b) {
                    return a == b;
                }
            });
        },
        enumerable: true,
        configurable: true
    });
    Order.prototype.mealQuantity = function (meal) {
        var quantity = 0;
        for (var _i = 0, _a = this.bundles; _i < _a.length; _i++) {
            var bundle = _a[_i];
            for (var _b = 0, _c = bundle.mealSelections; _b < _c.length; _b++) {
                var mealSelection = _c[_b];
                if (mealSelection.meal._id == meal._id) {
                    quantity += mealSelection.quantity;
                }
            }
        }
        return quantity;
    };
    Order.prototype.addBundle = function (bundle) {
        this.bundles.push(bundle);
        bundle.order = this;
    };
    Order.prototype.excludeFulfillmentDates = function (rule) {
        this._excludedFulfillmentDates.addRule('include', rule);
    };
    Order.prototype.getAddOnSelection = function (addOn, variant, create) {
        if (create === void 0) { create = true; }
        var i = _.findIndex(this.addOnSelections, function (a) { return a.addOn._id == addOn._id && a.variant == variant; });
        if (i == -1) {
            if (create) {
                var a = new AddOnSelection(addOn, variant, 0);
                this.addOnSelections.push(a);
                return a;
            }
            else {
                return null;
            }
        }
        else {
            return this.addOnSelections[i];
        }
    };
    Order.prototype.addAddOn = function (addOn, variant) {
        var addOnSelection = this.getAddOnSelection(addOn, variant);
        addOnSelection.quantity++;
    };
    Order.prototype.removeAddOn = function (addOn, variant) {
        var addOnSelection = this.getAddOnSelection(addOn, variant, false);
        if (addOnSelection && addOnSelection.quantity > 0) {
            if (!--addOnSelection.quantity) {
                _.pull(this.addOnSelections, addOnSelection);
            }
        }
    };
    Object.defineProperty(Order.prototype, "nextAvailableFullilmentDate", {
        get: function () {
            return this.availableFulfillmentDates.earliestDate();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Order.prototype, "subtotal", {
        get: function () {
            return order_1.orderSubtotal(this);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Order.prototype, "totalMeals", {
        get: function () {
            return order_1.orderTotalMeals(this);
            // return _.reduce(this.bundles, (totalMeals: number, bundle: Bundle) => {
            //   return totalMeals + _.reduce(bundle.mealSelections, (t: number, mealSelection: MealSelection) => {
            //     return t + mealSelection.quantity;
            //   }, 0);
            // }, 0);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Order.prototype, "deliveryFee", {
        get: function () {
            return order_1.orderDeliveryFee(this, {
                fulfillmentSettings: exports.data.fulfillmentSettings,
                locationSurcharges: exports.data.locationSurcharges.list,
                totalMeals: function (order) {
                    return order.totalMeals;
                }
            });
            // if (!this.promotion.deliveryFee || this.deliveryOptions.selfCollection || this.totalMeals >= data.fulfillmentSettings.freeDeliveryThreshold) return 0;
            // else return data.fulfillmentSettings.deliveryFee;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Order.prototype, "total", {
        get: function () {
            return order_1.orderTotal(this);
            // var total = this.subtotal + this.deliveryFee;
            // if (this.promotion) {
            //   if (this.promotion.type == 'discount') {
            //     total -= total*this.promotion.discount;
            //   }
            //   else if (this.promotion.type == 'override') {
            //     total = this.promotion.overridePrice;
            //   }
            // }
            // return total;
        },
        enumerable: true,
        configurable: true
    });
    Order.prototype.serialize = function () {
        return {
            deliveryOptions: this.deliveryOptions.serialize(),
            addOnSelections: serializeArray(this.addOnSelections),
            bundles: serializeArray(this.bundles),
        };
    };
    return Order;
}());
exports.Order = Order;
/// --- payment info --- ///
var PaymentInfo = (function () {
    function PaymentInfo() {
    }
    return PaymentInfo;
}());
exports.PaymentInfo = PaymentInfo;
exports.data = new Data();
window['g_data'] = exports.data;
// --- data --- //
function initData(http, orderId, cb) {
    console.log('initializing data...');
    var init = function (d) {
        exports.data.fulfillmentSettings = d.fulfillmentSettings;
        for (var collection in d.collections) {
            exports.data[collection].addArray(d.collections[collection]);
        }
        console.log('data initialized.');
        cb(d);
    };
    if (window['g_preloadedData']) {
        console.log('using preloaded data');
        // setTimeout(() => {
        init(window['g_preloadedData']);
    }
    else {
        http.get(config.dataUrl + (orderId ? '?order=' + orderId : '')).subscribe(function (response) {
            console.log('received data');
            init(response.json());
        }, function (error) {
            console.log('failed to initialized data: ' + error);
        });
    }
}
exports.initData = initData;
//# sourceMappingURL=models.js.map