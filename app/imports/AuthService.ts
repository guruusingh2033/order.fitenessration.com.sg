import {Component, Injectable} from '@angular/core'
import {CookieService} from 'angular2-cookie/core';


@Injectable()
export class AuthService {
	// public auth:any;
	constructor(private cookieService:CookieService) {
	}

	get auth(): any {
		return this.cookieService.getObject('auth');
	}

	get authenticated() : boolean {
		return !!this.auth;
	}

	get userId(): string {
		if (this.authenticated) {
			return this.auth.userId;
		}
		else {
			return null;
		}
	}
	get authToken(): string {
		if (this.authenticated) {
			return this.auth.authToken;
		}
		else {
			return null;
		}
	}
}
