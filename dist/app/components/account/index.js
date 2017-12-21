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
var http_1 = require('@angular/http');
var core_2 = require('angular2-cookie/core');
var ApiService_1 = require('../../imports/ApiService');
var forms_1 = require('@angular/forms');
var NAME = 'account';
var AccountComponent = (function () {
    function AccountComponent(http, cookieService, apiService, builder, app) {
        this.http = http;
        this.cookieService = cookieService;
        this.apiService = apiService;
        this.builder = builder;
        this.app = app;
        this.page = 'account';
        // this.accountForm = builder.group({
        //   email: ['', Validators.required],
        //   password: ['', Validators.required]
        // });		
    }
    AccountComponent.prototype.facebookLogin = function () {
        var _this = this;
        FB.login(function (response) {
            if (response.authResponse) {
                _this.apiService.get("facebook-login?accessToken=" + response.authResponse.accessToken + "&expiresIn=" + response.authResponse.expiresIn).subscribe(function (response) {
                    // if (response.json().status == 'error') {
                    // 	console.log('failed to login');
                    // }
                    // else {
                    _this.cookieService.putObject('auth', response.json(), {
                        expires: new Date(new Date().getTime() + 60 * 60 * 24 * 30 * 2 * 1000),
                        domain: config.cookieDomain
                    });
                    if (_this.onLogin) {
                        _this.onLogin(response.json());
                    }
                    _this.close();
                    // }
                }, function (response) {
                    if (response.json().message == 'Unauthorized') {
                        _this.errorMessage = 'Invalid email or password.';
                    }
                });
            }
        }, { scope: 'email' });
    };
    AccountComponent.prototype.init = function (opts) {
        this.opts = opts;
    };
    AccountComponent.prototype.forgotPassword = function () {
        this.page = 'forgotPassword1';
        this.updateTitle();
    };
    AccountComponent.prototype.resetPassword = function () {
        var _this = this;
        this.updateTitle();
        this.apiService.get('users/reset-password?email=' + this.email.toLowerCase()).subscribe(function (response) {
            if (response.json()) {
                _this.page = 'forgotPassword2';
            }
            else {
                _this.page = 'emailNotFound';
            }
        });
    };
    AccountComponent.prototype.login = function () {
        this.opts.type = 'login';
        this.updateTitle();
    };
    AccountComponent.prototype.signUp = function () {
        this.opts.type = 'sign-up';
        this.updateTitle();
    };
    AccountComponent.prototype.submit = function () {
        // for (var control in this.accountForm.controls) {
        //   this.accountForm.controls[control]._touched = true;
        // }
        // if (this.accountForm._status == 'VALID') {
        var _this = this;
        if (this.opts.type == 'sign-up') {
            this.apiService.post('users', { username: this.email.toLowerCase(), email: this.email.toLowerCase(), password: this.password }).subscribe(function (response) {
                var user = response.json().data;
                _this.apiService.post('login', { username: _this.email.toLowerCase(), password: _this.password }).subscribe(function (response) {
                    _this.cookieService.putObject('auth', response.json().data, {
                        expires: new Date(new Date().getTime() + 60 * 60 * 24 * 30 * 2 * 1000),
                        domain: config.cookieDomain
                    });
                    if (_this.onSignup) {
                        _this.onSignup(user);
                    }
                    _this.close();
                });
            }, function (response) {
                _this.errorMessage = 'An account with that email address already exists.';
            });
        }
        else if (this.opts.type == 'login') {
            this.apiService.post('login', { username: this.email.toLowerCase(), password: this.password }).subscribe(function (response) {
                console.log(response.json());
                if (response.json().status == 'error') {
                    console.log('failed to login');
                }
                else {
                    _this.cookieService.putObject('auth', response.json().data, {
                        expires: new Date(new Date().getTime() + 60 * 60 * 24 * 30 * 2 * 1000),
                        domain: config.cookieDomain
                    });
                    if (_this.onLogin) {
                        _this.onLogin(response.json().data);
                    }
                    _this.close();
                }
            }, function (response) {
                if (response.json().message == 'Unauthorized') {
                    _this.errorMessage = 'Invalid email or password.';
                }
            });
        }
        // }
    };
    Object.defineProperty(AccountComponent.prototype, "title", {
        get: function () {
            if (this.page == 'account') {
                if (this.opts.type == 'login')
                    return 'Log in';
                else if (this.opts.type == 'sign-up')
                    return 'Sign up to proceed';
            }
            else if (this.page == 'forgotPassword1') {
                return 'Trouble signing in?';
            }
            else if (this.page == 'forgotPassword2') {
                return 'Forgot Password';
            }
        },
        enumerable: true,
        configurable: true
    });
    AccountComponent = __decorate([
        core_1.Component({
            selector: NAME,
            templateUrl: "app/components/" + NAME + "/template.html",
            styleUrls: [("dist/app/components/" + NAME + "/styles.css")],
            providers: [core_2.CookieService]
        }), 
        __metadata('design:paramtypes', [http_1.Http, core_2.CookieService, ApiService_1.ApiService, forms_1.FormBuilder, core_1.ApplicationRef])
    ], AccountComponent);
    return AccountComponent;
}());
exports.AccountComponent = AccountComponent;
//# sourceMappingURL=index.js.map