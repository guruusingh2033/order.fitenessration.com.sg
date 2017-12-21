import { Component, NgModule, Input } from '@angular/core'
import { Bundle } from '../../imports/models';

@Component({
  selector: 'bundle',
  templateUrl: `app/components/bundle/template.html`,
  styleUrls: [`dist/app/components/bundle/styles.css`],
})
export class BundleComponent {
  private _allergies: boolean = true;
  @Input() bundle: Bundle;
  @Input()
  set allergies(allergies) {
    this._allergies = JSON.parse(allergies);
  }
}
