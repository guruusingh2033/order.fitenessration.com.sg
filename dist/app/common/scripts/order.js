"use strict";
var _ = require('lodash');
var date_1 = require('./date');
function round(amount) {
    return parseFloat(amount.toFixed(2));
}
function orderCheckAgainstTrigger(order, trigger, api) {
    var hasAllergies, hasMealPlan, hasPortion, hasMeal, hasAddOn;
    for (var _i = 0, _a = order.bundles; _i < _a.length; _i++) {
        var bundle = _a[_i];
        if (trigger.matchOrders == 'withAllergies' && bundle.allergies.length) {
            hasAllergies = true;
        }
        if (trigger.productType == 'meal') {
            for (var _b = 0, _c = bundle.mealSelections; _b < _c.length; _b++) {
                var mealSelection = _c[_b];
                if ((trigger.meal && api.compareObjectId(trigger.meal, mealSelection.meal._id) || !trigger.meal) && mealSelection.quantity >= trigger.quantity) {
                    hasMeal = true;
                    break;
                }
            }
            if (trigger.mealPlan && api.compareObjectId(trigger.mealPlan, bundle.mealPlan._id)) {
                hasMealPlan = true;
            }
            if (trigger.portion && api.compareObjectId(trigger.portion, bundle.portion._id)) {
                hasPortion = true;
            }
        }
    }
    if (trigger.productType == 'addOn') {
        for (var _d = 0, _e = order.addOnSelections; _d < _e.length; _d++) {
            var addOnSelection = _e[_d];
            if ((trigger.addOn && api.compareObjectId(trigger.addOn, addOnSelection.addOn._id) || !trigger.addOn) && addOnSelection.quantity >= trigger.quantity) {
                hasAddOn = true;
            }
        }
    }
    if (trigger.matchOrders == 'withAllergies' && !hasAllergies) {
        return false;
    }
    if (trigger.productType == 'meal') {
        if (!hasMeal) {
            return false;
        }
        if (trigger.mealPlan && !hasMealPlan) {
            return false;
        }
        if (trigger.portion && !hasPortion) {
            return false;
        }
    }
    else if (trigger.productType == 'addOn') {
        if (!hasAddOn) {
            return false;
        }
    }
    return true;
}
exports.orderCheckAgainstTrigger = orderCheckAgainstTrigger;
function orderQueryTriggers(order, triggers, api) {
    var triggered = [];
    for (var _i = 0, triggers_1 = triggers; _i < triggers_1.length; _i++) {
        var trigger = triggers_1[_i];
        if (orderCheckAgainstTrigger(order, trigger, api)) {
            triggered.push(trigger);
        }
    }
    return triggered;
}
exports.orderQueryTriggers = orderQueryTriggers;
function orderCheckAgainstTriggers(order, triggers, api) {
    var triggered = orderQueryTriggers(order, triggers, api);
    if (triggered.length) {
        triggered.sort(function (a, b) { return b.delay - a.delay; });
        return triggered[0];
    }
    else {
        return false;
    }
}
exports.orderCheckAgainstTriggers = orderCheckAgainstTriggers;
function orderFlagged(order, api) {
    for (var _i = 0, _a = order.bundles; _i < _a.length; _i++) {
        var bundle = _a[_i];
        if (api.compareObjectId(bundle.mealPlan._id, api.findOne('mealPlans', { name: 'Heavy Duty' })._id) && api.compareObjectId(bundle.portion._id, api.findOne('portions', { name: 'For Her' })._id)) {
            return true;
        }
        for (var _b = 0, _c = bundle.mealSelections; _b < _c.length; _b++) {
            var mealSelection = _c[_b];
            if (mealSelection.quantity >= 7) {
                return true;
            }
            if (api.mealStock(mealSelection.meal) < mealSelection.quantity) {
                return true;
            }
            if (_.intersection(bundle.allergies.map(function (allergy) { return allergy._id; }), mealSelection.meal.allergens.map(function (allergen) { return allergen._id; })).length) {
                return true;
            }
        }
    }
    var triggers = orderQueryTriggers(order, api.anomalyTriggers, api);
    for (var _d = 0, triggers_2 = triggers; _d < triggers_2.length; _d++) {
        var trigger = triggers_2[_d];
        if (trigger.flagOrder) {
            return true;
        }
    }
    return false;
}
exports.orderFlagged = orderFlagged;
function orderFulfillmentDays(order, api) {
    var trigger = orderCheckAgainstTriggers(order, api.anomalyTriggers, api);
    if (trigger) {
        return trigger.delay;
    }
    else if (orderFlagged(order, api)) {
        return 3;
    }
    else {
        return api.fulfillmentSettings.minDays;
    }
}
exports.orderFulfillmentDays = orderFulfillmentDays;
function excludeAvailabilityDate(opts) {
    return function (date) {
        if (opts.excludedFulfillmentDates.test(date)) {
            return true;
        }
        var fulfillmentDays = opts.fulfillmentDays();
        var day = date_1.today();
        if (new Date().getHours() >= opts.api.fulfillmentSettings.cutoffTime) {
            day = date_1.addDays(day, 1);
        }
        while (fulfillmentDays) {
            day = date_1.addDays(day, 1);
            if (!opts.excludedFulfillmentDates.test(day)) {
                --fulfillmentDays;
            }
        }
        return date < day;
    };
}
exports.excludeAvailabilityDate = excludeAvailabilityDate;
function orderTotalMeals(order) {
    return _.reduce(order.bundles, function (totalMeals, bundle) {
        return totalMeals + _.reduce(bundle.mealSelections, function (t, mealSelection) {
            return t + mealSelection.quantity;
        }, 0);
    }, 0);
}
exports.orderTotalMeals = orderTotalMeals;
function bundlePrice(bundle) {
    if (bundle.promotion) {
        var promotionPrice;
        if (bundle.promotion.type == 'discount') {
            promotionPrice = bundle.type.price * (100 - bundle.promotion.discount) / 100;
        }
        else if (bundle.promotion.type == 'override') {
            promotionPrice = bundle.promotion.overridePrice;
        }
        return round(promotionPrice);
    }
    else {
        return bundle.type.price;
    }
}
exports.bundlePrice = bundlePrice;
function allergyTotal(allergy, bundle) {
    if (allergy.action == 'remove') {
        for (var _i = 0, _a = bundle.mealSelections; _i < _a.length; _i++) {
            var mealSelection = _a[_i];
            if (_.some(mealSelection.meal.allergens, { _id: allergy._id })) {
                return allergy.surcharge;
            }
        }
    }
    else if (allergy.action == 'substitute') {
        var total = 0;
        for (var _b = 0, _c = bundle.mealSelections; _b < _c.length; _b++) {
            var mealSelection = _c[_b];
            if (_.some(mealSelection.meal.allergens, { _id: allergy._id })) {
                total += allergy.surcharge * mealSelection.quantity;
            }
        }
        return total;
    }
    return 0;
}
exports.allergyTotal = allergyTotal;
function bundlePremiumTotal(bundle) {
    var total = 0;
    var totalPremiumMeals = 0;
    for (var _i = 0, _a = bundle.mealSelections; _i < _a.length; _i++) {
        var mealSelection = _a[_i];
        if (mealSelection.meal.grade == 'premium') {
            for (var i = 0; i < mealSelection.quantity; ++i) {
                totalPremiumMeals++;
                if (totalPremiumMeals > (bundle.promotion && typeof bundle.promotion.premiumAllowance == 'number' ? bundle.promotion.premiumAllowance : bundle.type.premiumMeals)) {
                    total += mealSelection.meal.price;
                }
            }
        }
    }
    return round(total);
}
exports.bundlePremiumTotal = bundlePremiumTotal;
function bundleTotal(bundle) {
    var total = bundle.price;
    total += bundlePremiumTotal(bundle);
    // var totalPremiumMeals = 0;
    // for (var mealSelection of bundle.mealSelections) {
    //   if (mealSelection.meal.grade == 'premium') {
    //     for (var i = 0; i < mealSelection.quantity; ++ i) {
    //       totalPremiumMeals++;
    //       if (totalPremiumMeals > (bundle.promotion && typeof bundle.promotion.premiumAllowance == 'number' ? bundle.promotion.premiumAllowance : bundle.type.premiumMeals)) {
    //         total += mealSelection.meal.price;
    //       }        
    //     }
    //   }
    // }
    for (var _i = 0, _a = bundle.allergies; _i < _a.length; _i++) {
        var allergy = _a[_i];
        total += allergyTotal(allergy, bundle);
    }
    return round(total);
}
exports.bundleTotal = bundleTotal;
function orderSubtotal(order) {
    var subtotal = 0;
    var allergyRemovals = {};
    for (var _i = 0, _a = order.bundles; _i < _a.length; _i++) {
        var bundle = _a[_i];
        subtotal += bundle.total;
    }
    for (var _b = 0, _c = order.addOnSelections; _b < _c.length; _b++) {
        var addOnSelection = _c[_b];
        subtotal += addOnSelection.addOn.price * addOnSelection.quantity;
    }
    return round(subtotal);
}
exports.orderSubtotal = orderSubtotal;
function orderTotal(order) {
    var total = order.subtotal + order.deliveryFee;
    return round(total);
}
exports.orderTotal = orderTotal;
function orderLocationSurcharge(order, api) {
    for (var _i = 0, _a = api.locationSurcharges; _i < _a.length; _i++) {
        var locationSurcharge = _a[_i];
        if (_.startsWith(order.deliveryOptions.postalCode, locationSurcharge.postalPrefix)) {
            return locationSurcharge.surcharge;
        }
    }
    return 0;
}
exports.orderLocationSurcharge = orderLocationSurcharge;
function orderDeliveryFee(order, api) {
    if (order.deliveryOptions.selfCollection) {
        return 0;
    }
    var deliveryFee;
    for (var _i = 0, _a = order.bundles; _i < _a.length; _i++) {
        var bundle = _a[_i];
        if (!bundle.type.deliveryFee || (bundle.promotion && !bundle.promotion.deliveryFee)) {
            deliveryFee = 0;
            break;
        }
    }
    if (typeof deliveryFee == 'undefined') {
        if (api.totalMeals(order) >= api.fulfillmentSettings.freeDeliveryThreshold) {
            deliveryFee = 0;
        }
        else {
            deliveryFee = api.fulfillmentSettings.deliveryFee;
        }
    }
    deliveryFee += 'locationSurcharge' in order ? order.locationSurcharge : orderLocationSurcharge(order, api);
    // for (var locationSurcharge of api.locationSurcharges) {
    //   if (_.startsWith(order.deliveryOptions.postalCode, locationSurcharge.postalPrefix)) {
    //     deliveryFee += locationSurcharge.surcharge;
    //     break;
    //   }
    // }
    return deliveryFee;
}
exports.orderDeliveryFee = orderDeliveryFee;
//# sourceMappingURL=order.js.map