import { Component, Input } from '@angular/core'
import { Bundle } from '../../imports/models';

const NAME = 'bundle-summary';

@Component({
  selector: NAME,
  templateUrl: `app/components/${NAME}/template.html`,
  styleUrls: [`dist/app/components/${NAME}/styles.css`],
})
export class BundleSummaryComponent {
	@Input()
	public bundle: Bundle;
}
