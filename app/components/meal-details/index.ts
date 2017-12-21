import { Component } from '@angular/core'
import { Meal } from '../../imports/models';

const NAME = 'meal-details';

@Component({
  selector: NAME,
  templateUrl: `app/components/${NAME}/template.html`,
  styleUrls: [`dist/app/components/${NAME}/styles.css`],
})
export class MealDetailsComponent {
	constructor(private meal : Meal) {}
	currentImage = 0;
	prevImage() {
		if (this.currentImage == 0) {
			this.currentImage = 1;
		}
		else {
			this.currentImage = 0;
		}
	}
	nextImage() {
		if (this.currentImage == 0) {
			this.currentImage = 1;
		}
		else {
			this.currentImage = 0;
		}
	}
}
