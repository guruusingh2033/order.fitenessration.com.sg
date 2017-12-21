import { Renderer, ElementRef } from '@angular/core';
import { ControlValueAccessor } from '@angular/common';
export declare const RADIO_VALUE_ACCESSOR: any;
export declare class RadioControlValueAccessor implements ControlValueAccessor {
    private _renderer;
    private _elementRef;
    onChange: (_: any) => void;
    onTouched: () => void;
    constructor(_renderer: Renderer, _elementRef: ElementRef);
    writeValue(value: any): void;
    registerOnChange(fn: (_: any) => {}): void;
    registerOnTouched(fn: () => {}): void;
}
