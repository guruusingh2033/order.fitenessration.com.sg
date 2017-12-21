import { ApplicationRef } from '@angular/core';
import { Http } from '@angular/http';
import { CookieService } from 'angular2-cookie/core';
import { ApiService } from '../../imports/ApiService';
import { FormBuilder } from '@angular/common';
export declare class AccountComponent {
    private http;
    private cookieService;
    private apiService;
    private builder;
    private app;
    email: string;
    password: string;
    private opts;
    onLogin: Function;
    onSignup: Function;
    close: Function;
    updateTitle: Function;
    private page;
    private errorMessage;
    accountForm: any;
    constructor(http: Http, cookieService: CookieService, apiService: ApiService, builder: FormBuilder, app: ApplicationRef);
    facebookLogin(): void;
    init(opts: any): void;
    forgotPassword(): void;
    resetPassword(): void;
    login(): void;
    submit(): void;
    title: string;
}