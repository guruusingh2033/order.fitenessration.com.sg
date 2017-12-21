import { EventEmitter, ElementRef } from '@angular/core';
import { DateSet } from '../../common/scripts/DateSet';
import { Order } from '../../imports/models';
export declare class CalendarComponent {
    private element;
    _loading: boolean;
    month: Date;
    today: Date;
    order: Order;
    private _dateSet;
    private _dateSetCb;
    selectedDate: Date;
    datewasselected: EventEmitter<Date>;
    constructor(element: ElementRef);
    dateset: DateSet | Function;
    selecteddate: Date | string;
    private updateDateSet(cb?);
    monthName(month: number): string;
    prevMonth(): void;
    nextMonth(): void;
    currentMonth(): void;
    dateSelected(date: any): void;
    weeks(month: any): Array<Array<Date>>;
    ngAfterViewChecked(): void;
}
