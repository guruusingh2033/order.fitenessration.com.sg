"use strict";
var core_1 = require('@angular/core');
var _ = require('lodash');
var components_1 = require('./components');
function showPopup(viewContainer, component, opts, type) {
    if (opts === void 0) { opts = {}; }
    if (type === void 0) { type = 'basic-popup-with-title'; }
    function show() {
        var injector;
        if (opts.providers) {
            injector = core_1.ReflectiveInjector.resolveAndCreate(opts.providers, viewContainer.injector);
        }
        var res = viewContainer.createComponent(factory, 0, injector);
        if (res.instance.init)
            res.instance.init(opts.init);
        if (opts.initComponent)
            opts.initComponent(res.instance);
        var wrapperEl = $("\n\t\t\t<div class=\"popup-wrapper\">\n\t\t\t\t<div class=\"popup\">\n\t\t\t\t\t<span class=\"popup__title\">" + (res.instance.title || component.title) + "</span>\n\t\t\t\t\t<a href=\"#\" class=\"popup__close\">Close</a>\n\t\t\t\t\t<div class=\"popup__content\">\n\t\t\t\t\t</div>\n\t\t\t\t</div>\n\t\t\t</div>").appendTo('body');
        if (opts.title === false) {
            wrapperEl.find('.popup__title').remove();
        }
        if (opts.fullscreen) {
            wrapperEl.addClass('fullscreen');
        }
        var popupEl = wrapperEl.children('.popup');
        wrapperEl.addClass(type);
        wrapperEl.find('.popup__content').append(res._hostElement.nativeElement);
        var close = function () {
            viewContainer.clear();
            wrapperEl.remove();
            if (opts.close)
                opts.close(res.instance);
            $(window).unbind('resize', updatePosition);
        };
        wrapperEl.find('.popup__close').click(function () {
            close();
            return false;
        });
        function updatePosition() {
            popupEl.css({ left: Math.max(0, $(window).width() / 2 - popupEl.width() / 2), top: Math.max(0, $(window).height() / 2 - popupEl.height() / 2) });
        }
        $(window).resize(updatePosition);
        updatePosition();
        popupEl.css('visibility', 'hidden');
        setTimeout(function () {
            updatePosition();
            popupEl.css('visibility', '');
        }, 0);
        res.instance.close = close;
        res.instance.updateTitle = function () {
            wrapperEl.find('.popup__title').html(res.instance.title || component.title);
        };
    }
    var mod = opts.mod;
    var factory = _.find(mod.componentFactories, { componentType: component });
    if (factory) {
        show();
    }
    else {
        opts.compiler.compileModuleAndAllComponentsAsync(components_1.createModule(component)).then(function (mod) {
            factory = _.find(mod.componentFactories, { componentType: component });
            show();
        });
    }
}
exports.showPopup = showPopup;
//# sourceMappingURL=showPopup.js.map