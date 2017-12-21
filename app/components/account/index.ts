import { Component, ApplicationRef, NgModule } from '@angular/core'
import { Http } from '@angular/http';
import { CookieService } from 'angular2-cookie/core';
import { ApiService } from '../../imports/ApiService';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
declare var config:any;
declare var FB:any;

const NAME = 'account';

@Component({
  selector: NAME,
  templateUrl: `app/components/${NAME}/template.html`,
  styleUrls: [`dist/app/components/${NAME}/styles.css`],
  providers: [ CookieService ]
})
export class AccountComponent {
	public email: string;
	public password: string;
	private opts;
	public onLogin: Function;
	public onSignup: Function;
	public close: Function;
	public updateTitle: Function;
	private page: string = 'account';
	private errorMessage: string;

	accountForm: any;

	constructor(private http: Http, private cookieService: CookieService, private apiService: ApiService, private builder: FormBuilder, private app: ApplicationRef) {
    // this.accountForm = builder.group({
    //   email: ['', Validators.required],
    //   password: ['', Validators.required]
    // });		
	}

	facebookLogin() {
		FB.login((response) => {
			if (response.authResponse) {
		    this.apiService.get(`facebook-login?accessToken=${response.authResponse.accessToken}&expiresIn=${response.authResponse.expiresIn}`).subscribe((response) => {
		    	// if (response.json().status == 'error') {
		    	// 	console.log('failed to login');
		    	// }
		    	// else {
			    	this.cookieService.putObject('auth', response.json(), {
			    		expires: new Date(new Date().getTime() + 60*60*24*30*2 * 1000),
			    		domain: config.cookieDomain
			    	});
			    	if (this.onLogin) {
			    		this.onLogin(response.json());
			    	}
		    		this.close();
		    	// }
		    }, (response) => {
		    	if (response.json().message == 'Unauthorized') {
		    		this.errorMessage = 'Invalid email or password.';
		    	}
		    });
			}
		}, {scope:'email'});
	}

	public init(opts) {
		this.opts = opts;
	}

	public forgotPassword() {
		this.page = 'forgotPassword1';
		this.updateTitle();
	}

	public resetPassword() {
		this.updateTitle();
		this.apiService.get('users/reset-password?email='+ this.email.toLowerCase()).subscribe((response) => {
			if (response.json()) {
				this.page = 'forgotPassword2';
			}
			else {
				this.page = 'emailNotFound';
			}
		});
	}

	public login() {
		this.opts.type = 'login';
		this.updateTitle();
	}
	public signUp() {
		this.opts.type = 'sign-up';
		this.updateTitle();
	}

	public submit() : void {
    // for (var control in this.accountForm.controls) {
    //   this.accountForm.controls[control]._touched = true;
    // }
    // if (this.accountForm._status == 'VALID') {

			if (this.opts.type == 'sign-up') {
	      this.apiService.post('users', {username:this.email.toLowerCase(), email:this.email.toLowerCase(), password:this.password}).subscribe((response) => {
	      	var user = response.json().data;
			    this.apiService.post('login', {username:this.email.toLowerCase(), password:this.password}).subscribe((response) => {
			    	this.cookieService.putObject('auth', response.json().data, {
			    		expires: new Date(new Date().getTime() + 60*60*24*30*2 * 1000),
			    		domain: config.cookieDomain
			    	});
			    	if (this.onSignup) {
			    		this.onSignup(user);
			    	}
		    		this.close();
		    	});
	      }, (response) => {
	    		this.errorMessage = 'An account with that email address already exists.';
		    });
			}
			else if (this.opts.type == 'login') {
		    this.apiService.post('login', {username:this.email.toLowerCase(), password:this.password}).subscribe((response) => {
		    	console.log(response.json())
		    	if (response.json().status == 'error') {
		    		console.log('failed to login');
		    	}
		    	else {
			    	this.cookieService.putObject('auth', response.json().data, {
			    		expires: new Date(new Date().getTime() + 60*60*24*30*2 * 1000),
			    		domain: config.cookieDomain
			    	});
			    	if (this.onLogin) {
			    		this.onLogin(response.json().data);
			    	}
		    		this.close();
		    	}
		    }, (response) => {
		    	if (response.json().message == 'Unauthorized') {
		    		this.errorMessage = 'Invalid email or password.';
		    	}
		    });
		  }
    // }

	}
	public get title() : string {
		if (this.page == 'account') {
			if (this.opts.type == 'login') return 'Log in';
			else if (this.opts.type == 'sign-up') return 'Sign up to proceed';
		}
		else if (this.page == 'forgotPassword1') {
			return 'Trouble signing in?';
		}
		else if (this.page == 'forgotPassword2') {
			return 'Forgot Password';
		}
	}
}
