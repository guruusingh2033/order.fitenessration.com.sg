import { Component, Inject } from '@angular/core'
import { Ingredient, Bundle, data } from '../../imports/models';
import { allergyTotal } from '../../common/scripts/order';

const NAME = 'popup--allergy';

@Component({
  selector: 'allergies',
  templateUrl: `app/components/${NAME}/template.html`,
  styleUrls: [`dist/app/components/${NAME}/styles.css`]
})
export class AllergyPopupComponent {
	static title = 'Allergy';
	public close;
	public allergies = data.ingredients.allergens;
	constructor(@Inject('allergies') public bundleAllergies: Ingredient[], private bundle: Bundle) {
		console.log(bundle);
	}
	private toggle(allergy, b) {
		if (b) {
			this.bundleAllergies.push(allergy);
		}
		else {
			this.bundleAllergies.splice(this.bundleAllergies.indexOf(allergy), 1);
		}
	}
	private total(allergy) {
		return allergyTotal(allergy, this.bundle);
	}
	private save() {
		this.close();
	}
}
