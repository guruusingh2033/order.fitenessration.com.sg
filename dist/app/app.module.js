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
var core_1 = require('@angular/core');
var common_1 = require('@angular/common');
var forms_1 = require('@angular/forms');
var platform_browser_1 = require('@angular/platform-browser');
var http_1 = require('@angular/http');
var app_component_1 = require('./app.component');
var core_2 = require("@angular/core");
var TrackJsErrorHandler = (function (_super) {
    __extends(TrackJsErrorHandler, _super);
    function TrackJsErrorHandler() {
        _super.apply(this, arguments);
    }
    TrackJsErrorHandler.prototype.handleError = function (error) {
        // Add the error message to the telemetry timeline. 
        // It can occasionally have useful additional context.
        console.warn(error.message);
        // Assumes we have already loaded and configured TrackJS*
        if (trackJs) {
            trackJs.track(error.originalError); // Send the native error object to TrackJS
        }
    };
    return TrackJsErrorHandler;
}(core_2.ErrorHandler));
var AppModule = (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        core_1.NgModule({
            imports: [platform_browser_1.BrowserModule, common_1.CommonModule, forms_1.FormsModule, forms_1.ReactiveFormsModule, http_1.HttpModule],
            providers: [
                require('./imports/ApiService').ApiService,
                require('./imports/AuthService').AuthService,
                require('angular2-cookie/core').CookieService,
                { provide: core_2.ErrorHandler, useClass: TrackJsErrorHandler }
            ],
            declarations: [
                app_component_1.AppComponent,
                require('./imports/PricePipe').PricePipe,
                require('./imports/DisplayPipe').DisplayPipe,
                require('./components/index').default,
                require('./steps/index').default,
            ],
            bootstrap: [app_component_1.AppComponent]
        }), 
        __metadata('design:paramtypes', [])
    ], AppModule);
    return AppModule;
}());
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map