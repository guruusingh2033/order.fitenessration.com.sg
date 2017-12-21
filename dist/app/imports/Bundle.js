"use strict";
var Bundle = (function () {
    function Bundle() {
        this.meals = [];
        this.allergies = [];
    }
    Bundle.prototype.getMeal = function (meal, create) {
        if (create === void 0) { create = true; }
        var i = _.findIndex(this.meals, function (m) { return m.id == meal.id; });
        if (i == -1) {
            if (create) {
                var m = new MealSelection(meal.id, 0);
                this.meals.push(m);
                return m;
            }
            else {
                return null;
            }
        }
        else {
            return this.meals[i];
        }
    };
    Bundle.prototype.addMeal = function (meal) {
        var m = this.getMeal(meal);
        m.quantity++;
    };
    Bundle.prototype.removeMeal = function (meal) {
        var m = this.getMeal(meal);
        if (m.quantity > 0)
            m.quantity--;
    };
    Object.defineProperty(Bundle.prototype, "typePrice", {
        get: function () {
            return bundleTypeDefs[this.type].price;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Bundle.prototype, "mealCount", {
        get: function () {
            return bundleTypeDefs[this.type].meals;
        },
        enumerable: true,
        configurable: true
    });
    return Bundle;
}());
exports.Bundle = Bundle;
//# sourceMappingURL=Bundle.js.map