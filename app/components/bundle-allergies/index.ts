import { Component, Input } from '@angular/core'
import { Bundle } from '../../imports/models';
import { allergyTotal } from '../../common/scripts/order';

const NAME = 'bundle-allergies';

@Component({
  selector: NAME,
  templateUrl: `app/components/${NAME}/template.html`,
  styleUrls: [`dist/app/components/${NAME}/styles.css`]
})
export class BundleAllergiesComponent {
	@Input()
	bundle: Bundle;

	total(allergy) {
		return allergyTotal(allergy, this.bundle);
	}
}
