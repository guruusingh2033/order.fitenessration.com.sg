import { Component, EventEmitter, ElementRef, HostBinding, Input, Output } from '@angular/core'
import { DateSet } from '../../common/scripts/DateSet';
import { today, createDay, convertToDate } from '../../imports/date';
import { calendarDaysForMonth } from '../../imports/date';
import { Order } from '../../imports/models';

declare var $:JQueryStatic;

const NAME = 'calendar';

@Component({
  selector: NAME,
  templateUrl: `app/components/${NAME}/template.html`,
  styleUrls: [`dist/app/components/${NAME}/styles.css`],
  outputs: ['datewasselected']
})
export class CalendarComponent {
  @HostBinding('class.loading') _loading: boolean;
  month:Date = new Date();
  today:Date;
  private _dateSet: DateSet;
  private _dateSetCb: Function;
  // private _loading: boolean;
  public selectedDate: Date;
  public datewasselected: EventEmitter<Date> = new EventEmitter<Date>();
  constructor(private element: ElementRef) {
    var now = new Date();
    this.today = today();
    window['g_calendar'] = this;
  }

  @Input()
  set dateset(dateSet: DateSet|Function) {
    if (typeof dateSet == 'function') {
      this._dateSetCb = <Function>dateSet;
      this.updateDateSet();
    }
    else {
      this._dateSet = <DateSet>dateSet;
    }
  }

  @Input()
  set selecteddate(date: Date|string) {
    if (date) {
      var definiteDate: Date = convertToDate(date);
      this.selectedDate = createDay(definiteDate.getFullYear(), definiteDate.getMonth(), definiteDate.getDate());      
    }
  }
  private updateDateSet(cb: Function=null) {
    if (this._dateSetCb) {
      this._loading = true;
      this._dateSet = null;
      this._dateSetCb(this.month, (dateSet) => {
        this._dateSet = dateSet;
        this._loading = false;
        if (cb) {
          cb();
        }
      });
    }
  }
  monthName(month:number): string {
    switch (month + 1) {
      case 1: return 'January';
      case 2: return 'February';
      case 3: return 'March';
      case 4: return 'April';
      case 5: return 'May';
      case 6: return 'June';
      case 7: return 'July';
      case 8: return 'August';
      case 9: return 'September';
      case 10: return 'October';
      case 11: return 'November';
      case 12: return 'December';
    }
  }
  prevMonth(): void {
    this.month = new Date(this.month.getFullYear(), this.month.getMonth() - 1, 1, 0, 0, 0);
    this.updateDateSet();
  }
  nextMonth(): void {
    this.month = new Date(this.month.getFullYear(), this.month.getMonth() + 1, 1, 0, 0, 0);
    this.updateDateSet();
  }
  currentMonth(): void {
    this.month = this.today;
    this.updateDateSet();
  }
  dateSelected(date): void {
  	if (!this._dateSet || this._dateSet.test(date)) {
	  	this.selectedDate = date;
	  	this.datewasselected.next(date);
  	}
  }
  weeks(month): Array<Array<Date>> {
    var days = calendarDaysForMonth(month);
    var weeks = [];
    for (var i = 0; i < days.length/7; ++i) {
      weeks.push(days.slice(i*7, i*7 + 7));
    }
    return weeks;
  }
  ngAfterViewChecked(): void {
    // $(this.element.nativeElement).find('.day').click(function() {
    //   console.log('asdf');
    // });
  }
}
