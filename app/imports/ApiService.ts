import { Injectable } from '@angular/core'
import { Http, RequestOptions, Headers } from '@angular/http'
import { AuthService } from './AuthService';
declare var config:any;

@Injectable()
export class ApiService {
	constructor(private http: Http, private auth: AuthService) {}
	get(method) {
		return this.http.get(config.apiBaseUrl + method, new RequestOptions({headers:new Headers({
			'X-Auth-Token': this.auth.authToken,
			'X-User-Id': this.auth.userId
		})}));
	}
	post(method, data) {
		return this.http.post(config.apiBaseUrl + method, data, new RequestOptions({headers:new Headers({
			'X-Auth-Token': this.auth.authToken,
			'X-User-Id': this.auth.userId
		})}));
	}
}
