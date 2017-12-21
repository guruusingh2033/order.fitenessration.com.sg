import { Component, Inject, NgModule } from '@angular/core'
import { AddOn } from '../../imports/models';

const NAME = 'add-on-details';

@Component({
  selector: NAME,
  templateUrl: `app/components/${NAME}/template.html`,
  styleUrls: [`dist/app/components/${NAME}/styles.css`],
})
export class AddOnDetailsComponent {
	constructor(@Inject('add-on') private addOn : AddOn) {}
	currentImage = 0;
	prevImage() {
		this.currentImage = (this.currentImage - 1 + this.addOn.images.length) % this.addOn.images.length;
	}
	nextImage() {
		this.currentImage = (this.currentImage + 1) % this.addOn.images.length;
	}
}
