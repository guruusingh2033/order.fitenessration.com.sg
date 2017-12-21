import { Component, Input } from '@angular/core'
import { Bundle } from '../../imports/models';

const NAME = 'step-progress';

@Component({
  selector: 'step-progress',
  templateUrl: `app/components/${NAME}/template.html`,
  // styleUrls: [`dist/app/components/${NAME}/styles.css`],
})
export class StepProgressComponent {
  @Input()
  private bundle: Bundle;
}
