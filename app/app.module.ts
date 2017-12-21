import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';

import { ErrorHandler } from "@angular/core";

declare var trackJs: any;
declare var _trackJs: any;

import * as _ from 'lodash';



class TrackJsErrorHandler extends ErrorHandler {
  handleError(error:any) {
    // Add the error message to the telemetry timeline. 
    // It can occasionally have useful additional context.
    console.warn(error.message); 
    
    // Assumes we have already loaded and configured TrackJS*
    if (trackJs) { 
      trackJs.track(error.originalError); // Send the native error object to TrackJS
    }
  }
}


@NgModule({
  imports: [ BrowserModule, CommonModule, FormsModule, ReactiveFormsModule, HttpModule ],
  providers: [
    require('./imports/ApiService').ApiService,
    require('./imports/AuthService').AuthService,
    require('angular2-cookie/core').CookieService,
    {provide: ErrorHandler, useClass: TrackJsErrorHandler}
  ],
  declarations: [
  	AppComponent, 

    require('./imports/PricePipe').PricePipe,
    require('./imports/DisplayPipe').DisplayPipe,

    require('./components/index').default,
    require('./steps/index').default,
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
