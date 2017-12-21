import { Component } from '@angular/core'

const NAME = 'use-promo-code';

@Component({
  selector: NAME,
  templateUrl: `app/components/${NAME}/template.html`,
  styleUrls: [`dist/app/components/${NAME}/styles.css`],
})
export class UsePromoCodeComponent {
  static title = 'Use promo code';
  public close : Function;
  public onApply: Function;
  promoCode: string;
  errorString: string;
  apply() : void {
    // this.close();
    // this.onApply.emit(this.promoCode);
    this.onApply();
  }
}
