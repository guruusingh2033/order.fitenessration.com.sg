import { Component, Input } from '@angular/core'
import { Bundle } from '../../imports/models';

const NAME = 'bundle-meals';

@Component({
  selector: NAME,
  templateUrl: `app/components/${NAME}/template.html`,
  styleUrls: [`dist/app/components/${NAME}/styles.css`]
})
export class BundleMealsComponent {
	@Input()
	bundle: Bundle;
}
