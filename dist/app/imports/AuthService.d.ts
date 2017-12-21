import { CookieService } from 'angular2-cookie/core';
export declare class AuthService {
    private cookieService;
    constructor(cookieService: CookieService);
    auth: any;
    authenticated: boolean;
    userId: string;
    authToken: string;
}
