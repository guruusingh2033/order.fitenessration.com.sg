"use strict";
var Template = (function () {
    function Template(html) {
        this.el = document.createElement('div');
        this.el.innerHTML = html;
    }
    Template.prototype.getHtml = function (tag) {
        return this.el.querySelector(tag).innerHTML;
    };
    Template.prototype.fix = function (html) {
        return html
            .replace(/\*ngfor/g, '*ngFor')
            .replace(/\*ngif/g, '*ngIf')
            .replace(/ngmodel/g, 'ngModel')
            .replace(/ngvalue/g, 'ngValue')
            .replace(/ngformmodel/g, 'ngFormModel')
            .replace(/ngsubmit/g, 'ngSubmit')
            .replace(/ngcontrol/g, 'ngControl')
            .replace(/ngstyle/g, 'ngStyle')
            .replace(/formgroup/g, 'formGroup');
    };
    Object.defineProperty(Template.prototype, "options", {
        get: function () {
            var optionsEl = this.el.querySelector('options');
            if (optionsEl) {
                return {
                    showPrev: optionsEl.getAttribute('showPrev') == 'false' ? false : true,
                    showSteps: optionsEl.getAttribute('showSteps') == 'true' ? true : false,
                    footerStyles: optionsEl.getAttribute('footerStyles') == 'false' ? false : true,
                };
            }
            else {
                return {
                    showPrev: true,
                    showSteps: false,
                    footerStyles: true,
                };
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Template.prototype, "body", {
        get: function () {
            return this.fix(this.getHtml('main'));
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Template.prototype, "footer", {
        get: function () {
            return this.fix(this.getHtml('footer'));
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Template.prototype, "title", {
        get: function () {
            return this.fix(this.getHtml('title'));
        },
        enumerable: true,
        configurable: true
    });
    return Template;
}());
exports.Template = Template;
//# sourceMappingURL=Template.js.map