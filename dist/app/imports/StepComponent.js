"use strict";
var components_1 = require('./components');
var StepComponent = (function () {
    function StepComponent() {
    }
    StepComponent.prototype.showPopup = function (component, opts, type) {
        if (opts === void 0) { opts = {}; }
        if (type === void 0) { type = ''; }
    };
    StepComponent.prototype.setStep = function (stepName) { };
    StepComponent.prototype.addBundle = function () { };
    StepComponent.prototype.initUserData = function (fn) { };
    StepComponent.prototype.next = function () { };
    StepComponent.prototype.ready = function () { return true; };
    // private order: Order;
    StepComponent.prototype.checkAgainstTriggers = function () {
        var trigger = this['order'].checkAgainstTriggers();
        if (trigger) {
            this.showPopup(components_1.createComponent({
                selector: 'div',
                template: "\n\t\t\t    <p>" + trigger.alert.message + "</p>\n\t\t\t    <button (click)=\"close()\" class=\"button\">OK</button>\n\t\t\t  ",
                styles: ["\n\t\t\t    :host { text-align: center; }\n\t\t\t    :host > *:not(:first-child) { margin-top: 21px; }\n\t\t\t    :host > *:last-child { margin-top: 0; }\n\t\t\t    p { font-size: 17.4px; font-weight: bold; margin-bottom: 1em }\n\t\t\t  "]
            }, {
                title: trigger.alert.title
            }));
        }
    };
    return StepComponent;
}());
exports.StepComponent = StepComponent;
//# sourceMappingURL=StepComponent.js.map