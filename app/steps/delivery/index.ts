import { Component, Inject, ViewContainerRef, ViewChild, ElementRef } from '@angular/core'
import { StepComponent } from '../../imports/StepComponent';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Order, TimeSlot, Promotion, data } from '../../imports/models';
import { AuthService } from '../../imports/AuthService';
import { Calendar } from '../../imports/Calendar';
import { createComponent } from '../../imports/components';
import { DateSet } from '../../common/scripts/DateSet';
import { formatDate, convertToDate } from '../../common/scripts/date';
import { Http, Headers, RequestOptions, Response } from "@angular/http";
import { ApiService } from '../../imports/ApiService';
import { UsePromoCodeComponent } from '../../components/use-promo-code/index';
import { AddDeliveryAddressComponent } from '../../components/add-delivery-address/index';
import { humanDateFormat } from '../../imports/helpers';
import * as _ from 'lodash';

@Component({
  templateUrl:'app/steps/delivery/template.html',
  styleUrls:['dist/app/steps/delivery/styles.css'],
  selector:'div.step-container',
})
export default class DeliveryStepComponent extends StepComponent {
  static stepName = 'delivery';
  static title = 'Delivery options';
  static options = { showPrev: true, showSteps: false };

  @ViewChild('form') form: ElementRef;
  @ViewChild('submitButton') submitButton: ElementRef;

  selectedDate: Date;
  showCalendar: boolean = false;
  _calendar: Calendar;

  constructor(private builder: FormBuilder, private apiService: ApiService, private order: Order, @Inject('user') public user: any) {
    super();
    if (this.order.deliveryOptions.date) {
      this.selectedDate = new Date(Date.parse(this.order.deliveryOptions.date + ' 00:00'));
    }
    else {
      // this.selectedDate = new Date();
    }
    this._calendar = new Calendar(this.apiService, this.order);
  }
  requireAddress() {
    return true;
  }
  dateSet() {
    return (month: Date, cb: Function) => {
      this._calendar.dateSet(month, cb);
    }
  }
  _timeSlots() {
    if (this.order && this.order.deliveryOptions.date && this._calendar.timeSlots) {
      return _.map(this._calendar.timeSlots[this.order.deliveryOptions.date], (timeSlotId:string) => { return data.timeSlots.findById(timeSlotId); });
    }
    else {
      return [];
    }
  }
  selectDate(date) {
    this.showCalendar = false;
    this.order.deliveryOptions.date = formatDate(date);
  }
  asdf() {
    this.submitButton.nativeElement.click();
  }

  fulfillmentDate() {
    return humanDateFormat(this.order.deliveryOptions.date);
  }
  addDeliveryAddress() {
    var user = this.user;
    this.showPopup(AddDeliveryAddressComponent, {
      init:{user:user}
    });
  }
  set selectedDeliveryAddress(i) {
    this.order.deliveryOptions.address = this.user.profile.deliveryAddresses[i].address;
    this.order.deliveryOptions.postalCode = this.user.profile.deliveryAddresses[i].postalCode;
  }
  get selectedDeliveryAddress() {
    for (let i = 0; i < this.user.profile.deliveryAddresses.length; ++ i) {
      if (this.order.deliveryOptions.address == this.user.profile.deliveryAddresses[i].address && this.order.deliveryOptions.postalCode == this.user.profile.deliveryAddresses[i].postalCode) {
        return i;
      }
    }
    return null;
  }
  ngAfterViewInit() {
    this.form.nativeElement.addEventListener('submit', () => {
      this.next();
      return false;
    });
  }
  usePromoCode() {
    this.showPopup(UsePromoCodeComponent, {
      initComponent: (popup: UsePromoCodeComponent) => {
        popup.onApply = () => {
          this.apiService.post('promo-codes/validate', {order:this.order.serialize(), promoCode:popup.promoCode}).subscribe((response) => {
            var r = response.json();
            if (r.result) {
              var promotion = Promotion.instantiate(Promotion, {
                _id: r.promotion._id._str,
                name: r.promotion.name,
                deliveryFee: r.promotion.deliveryFee,
                discount: r.promotion.discount,
                overridePrice: r.promotion.overridePrice,
                premiumAllowance: r.promotion.premiumAllowance,
                mealPlan: r.promotion.mealPlan ? r.promotion.mealPlan._str : null,
                portion: r.promotion.portion ? r.promotion.portion._str : null,
                bundleType: r.promotion.bundleType ? r.promotion.bundleType._str : null,
                type: r.promotion.type
              });
              for (var index of r.bundles) {
                this.order.bundles[index].promotion = promotion;
              }
              popup.close();
            }
            else {
              var errorString;
              if (_.isString(r.error)) {
                switch (r.error) {
                  case 'invalidPromoCode': errorString = 'Invalid promo code.'; break;
                  case 'promotionNotStarted': errorString = 'The promotion has not yet started.'; break;
                  case 'promotionEnded': errorString = 'The promotion has already ended.'; break;
                  case 'invalidFulfillmentDate': errorString = 'The fulfillment date you have chosen is not allowed by the promotion.'; break;
                  case 'alreadyUsed': errorString = 'You have already used this promo code.'; break;
                  case 'notCompatible': errorString = 'The promo code you have used is not compatible with your order.'; break;
                }
              }
              else {
                switch (r.error.error) {
                  case 'surpassedPremiumCap': errorString = `This promo code allows for a maximum of ${r.error.premiumCap} premium meal${r.error.premiumCap == 1 ? '' : 's'}. Change your selection to proceed.`; break;
                }
              }
              popup.errorString = errorString;
            }
          });
        };
      }
    });
  }
}
