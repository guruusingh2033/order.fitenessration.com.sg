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
var _ = require('lodash');
var common_1 = require('@angular/common');
var forms_1 = require('@angular/forms');
var platform_browser_1 = require('@angular/platform-browser');
var http_1 = require('@angular/http');
function createModule(component, imports) {
    if (imports === void 0) { imports = []; }
    var DynamicModule = (function () {
        function DynamicModule() {
        }
        DynamicModule = __decorate([
            core_1.NgModule({
                declarations: [component],
                imports: [platform_browser_1.BrowserModule, forms_1.FormsModule, http_1.HttpModule, common_1.CommonModule, forms_1.ReactiveFormsModule].concat(imports)
            }), 
            __metadata('design:paramtypes', [])
        ], DynamicModule);
        return DynamicModule;
    }());
    return DynamicModule;
}
exports.createModule = createModule;
function createComponent(metadata, comp, imports) {
    if (comp === void 0) { comp = {}; }
    if (imports === void 0) { imports = []; }
    var DynamicComponent = (function () {
        function DynamicComponent() {
        }
        DynamicComponent.imports = imports;
        return DynamicComponent;
    }());
    DynamicComponent.prototype = comp;
    return core_1.Component(new core_1.ComponentMetadata(metadata))(DynamicComponent);
}
exports.createComponent = createComponent;
function loadComponent(component, viewContainer, compiler, injector, cb) {
    if (injector === void 0) { injector = null; }
    if (cb === void 0) { cb = null; }
    if (!injector) {
        injector = viewContainer.parentInjector;
    }
    viewContainer.clear();
    var mod = createModule(component, component.imports);
    compiler.compileModuleAndAllComponentsAsync(mod).then(function (mod) {
        var factory = _.find(mod.componentFactories, { componentType: component });
        var res = viewContainer.createComponent(factory, 0, injector);
        if (cb)
            cb(res);
    });
}
exports.loadComponent = loadComponent;
//# sourceMappingURL=components.js.map