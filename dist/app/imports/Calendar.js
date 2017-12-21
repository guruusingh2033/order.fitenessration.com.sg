"use strict";
var DateSet_1 = require('../common/scripts/DateSet');
var date_1 = require('../common/scripts/date');
var Calendar = (function () {
    function Calendar(apiService, order) {
        this.apiService = apiService;
        this.order = order;
        this._cbs = [];
    }
    Calendar.prototype.callCbs = function () {
        for (var _i = 0, _a = this._cbs; _i < _a.length; _i++) {
            var cb = _a[_i];
            cb(this._dateSet);
        }
        this._cbs = [];
    };
    Calendar.prototype.dateSet = function (month, cb) {
        var _this = this;
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
            this.apiService.post('delivery/calendar?month=' + month.getFullYear() + '-' + (month.getMonth() + 1), { order: this.order.serialize() }).subscribe(function (response) {
                if (_this._currentMonth && month.valueOf() == _this._currentMonth.valueOf()) {
                    _this.timeSlots = response.json();
                    var dateSet = new DateSet_1.DateSet();
                    dateSet.addRule('exclude', function (date) {
                        return !_this.timeSlots[date_1.formatDate(date)].length;
                    });
                    _this._dateSet = dateSet;
                    _this.callCbs();
                }
            });
        }
    };
    return Calendar;
}());
exports.Calendar = Calendar;
//# sourceMappingURL=Calendar.js.map