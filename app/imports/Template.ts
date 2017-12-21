export interface ITemplateOptions {
  showPrev: boolean;
  showSteps: boolean;
  footerStyles: boolean;
}


export class Template {
  el: HTMLElement;
  constructor(html : string) {
    this.el = document.createElement('div');
    this.el.innerHTML = html;
  }

  getHtml(tag) : string {
    return this.el.querySelector(tag).innerHTML;
  }

  private fix(html: string) : string {
    return html
      .replace(/\*ngfor/g, '*ngFor')
      .replace(/\*ngif/g, '*ngIf')
      .replace(/ngmodel/g, 'ngModel')
      .replace(/ngvalue/g, 'ngValue')
      .replace(/ngformmodel/g, 'ngFormModel')
      .replace(/ngsubmit/g, 'ngSubmit')
      .replace(/ngcontrol/g, 'ngControl')
      .replace(/ngstyle/g, 'ngStyle')
      .replace(/formgroup/g, 'formGroup')
  }

  get options() : ITemplateOptions {
    var optionsEl = this.el.querySelector('options');
    if (optionsEl) {
      return {
        showPrev: optionsEl.getAttribute('showPrev') == 'false' ? false : true,
        showSteps: optionsEl.getAttribute('showSteps') == 'true' ? true : false,
        footerStyles: optionsEl.getAttribute('footerStyles') == 'false' ? false : true,
      };
    }
    else {
      return {
        showPrev: true,
        showSteps: false,
        footerStyles: true,
      };
    }
  }

  get body() : string {
    return this.fix(this.getHtml('main'));
  }
  get footer() : string {
    return this.fix(this.getHtml('footer'));
  }
  get title() : string {
    return this.fix(this.getHtml('title'));
  }
}
