import { Component, Input } from '@angular/core'
import { Bundle } from '../../imports/models';
import { bundlePremiumTotal } from '../../common/scripts/order';

const NAME = 'bundle-premium';

@Component({
  selector: NAME,
  templateUrl: `app/components/${NAME}/template.html`,
  styleUrls: [`dist/app/components/${NAME}/styles.css`]
})
export class BundlePremiumComponent {
	@Input()
	bundle: Bundle;

	total() {
		return bundlePremiumTotal(this.bundle);
	}
}
