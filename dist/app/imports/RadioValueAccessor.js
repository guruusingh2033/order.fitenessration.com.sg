"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
// import {NG_VALUE_ACCESSOR, ControlValueAccessor} from '@angular/common';
// export const RADIO_VALUE_ACCESSOR: any = {
//     provide: NG_VALUE_ACCESSOR,
//     useExisting: forwardRef(() => RadioControlValueAccessor),
//     multi: true
// };
var RadioControlValueAccessor = (function () {
    function RadioControlValueAccessor(_renderer, _elementRef) {
        this._renderer = _renderer;
        this._elementRef = _elementRef;
        this.onChange = function (_) { };
        this.onTouched = function () { };
    }
    RadioControlValueAccessor.prototype.writeValue = function (value) {
        this._renderer.setElementProperty(this._elementRef.nativeElement, 'checked', value == this._elementRef.nativeElement.value);
    };
    RadioControlValueAccessor.prototype.registerOnChange = function (fn) { this.onChange = fn; };
    RadioControlValueAccessor.prototype.registerOnTouched = function (fn) { this.onTouched = fn; };
    RadioControlValueAccessor = __decorate([
        core_1.Directive({
            selector: 'input[type=radio][ngControl],input[type=radio][ngFormControl],input[type=radio][ngModel]',
            host: { '(change)': 'onChange($event.target.value)', '(blur)': 'onTouched()' },
        }), 
        __metadata('design:paramtypes', [core_1.Renderer, core_1.ElementRef])
    ], RadioControlValueAccessor);
    return RadioControlValueAccessor;
}());
exports.RadioControlValueAccessor = RadioControlValueAccessor;
//# sourceMappingURL=RadioValueAccessor.js.map