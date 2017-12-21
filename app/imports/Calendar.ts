import { DateSet } from '../common/scripts/DateSet';
import { ApiService } from './ApiService';
import { createDay, formatDate } from '../common/scripts/date';

export class Calendar {
	_currentMonth: Date;
	_dateSet:{};
	_cbs;
	timeSlots;
	constructor(private apiService: ApiService, private order) {
		this._cbs = [];
	}
	private callCbs() {
		for (var cb of this._cbs) {
			cb(this._dateSet);
		}
		this._cbs = [];
	}
	dateSet(month: Date, cb: Function): void {
		if (this._currentMonth && this._currentMonth.valueOf() == month.valueOf()) {
			if (this._dateSet) {
				cb(this._dateSet);
			}
			else {
				this._cbs.push(cb);
			}
		}
		else {
			this._currentMonth = month;
			this._dateSet = null;

	    this.apiService.post('delivery/calendar?month=' + month.getFullYear() + '-' + (month.getMonth() + 1), {order:this.order.serialize()}).subscribe((response) => {
	    	if (this._currentMonth && month.valueOf() == this._currentMonth.valueOf()) {
		      this.timeSlots = response.json();
		      var dateSet = new DateSet();
		      dateSet.addRule('exclude', (date) => {
		        return !this.timeSlots[formatDate(date)].length;
		      });
					this._dateSet = dateSet;	    	
					this.callCbs();	
	    	}
	    });
		}
	}
}
