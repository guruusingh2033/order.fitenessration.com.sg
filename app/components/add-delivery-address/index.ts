import { Component } from '@angular/core';
import { ApiService } from '../../imports/ApiService';

@Component({
  selector: 'add-delivery-address',
  styleUrls: ['dist/app/components/add-delivery-address/styles.css'],
  templateUrl: 'app/components/add-delivery-address/template.html'
})
export class AddDeliveryAddressComponent {
  title = 'Add delivery address';
  form: any;
  address: string;
  postalCode: string;
  close: Function;
  user: any;
  constructor(private apiService: ApiService) {}
  init({user}) {
    this.user = user;
  }
  save() {
    this.user.profile.deliveryAddresses.push({address:this.address, postalCode:this.postalCode});
    this.apiService.post('users/delivery-addresses', {address:this.address, postalCode:this.postalCode}).subscribe((response) => {

    });
    this.close();
  }
}
