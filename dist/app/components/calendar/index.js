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
var date_1 = require('../../imports/date');
var date_2 = require('../../imports/date');
var NAME = 'calendar';
var CalendarComponent = (function () {
    function CalendarComponent(element) {
        this.element = element;
        this.month = new Date();
        this.datewasselected = new core_1.EventEmitter();
        var now = new Date();
        this.today = date_1.today();
        window['g_calendar'] = this;
    }
    Object.defineProperty(CalendarComponent.prototype, "dateset", {
        set: function (dateSet) {
            if (typeof dateSet == 'function') {
                this._dateSetCb = dateSet;
                this.updateDateSet();
            }
            else {
                this._dateSet = dateSet;
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CalendarComponent.prototype, "selecteddate", {
        set: function (date) {
            if (date) {
                var definiteDate = date_1.convertToDate(date);
                this.selectedDate = date_1.createDay(definiteDate.getFullYear(), definiteDate.getMonth(), definiteDate.getDate());
            }
        },
        enumerable: true,
        configurable: true
    });
    CalendarComponent.prototype.updateDateSet = function (cb) {
        var _this = this;
        if (cb === void 0) { cb = null; }
        if (this._dateSetCb) {
            this._loading = true;
            this._dateSet = null;
            this._dateSetCb(this.month, function (dateSet) {
                _this._dateSet = dateSet;
                _this._loading = false;
                if (cb) {
                    cb();
                }
            });
        }
    };
    CalendarComponent.prototype.monthName = function (month) {
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
    };
    CalendarComponent.prototype.prevMonth = function () {
        this.month = new Date(this.month.getFullYear(), this.month.getMonth() - 1, 1, 0, 0, 0);
        this.updateDateSet();
    };
    CalendarComponent.prototype.nextMonth = function () {
        this.month = new Date(this.month.getFullYear(), this.month.getMonth() + 1, 1, 0, 0, 0);
        this.updateDateSet();
    };
    CalendarComponent.prototype.currentMonth = function () {
        this.month = this.today;
        this.updateDateSet();
    };
    CalendarComponent.prototype.dateSelected = function (date) {
        if (!this._dateSet || this._dateSet.test(date)) {
            this.selectedDate = date;
            this.datewasselected.next(date);
        }
    };
    CalendarComponent.prototype.weeks = function (month) {
        var days = date_2.calendarDaysForMonth(month);
        var weeks = [];
        for (var i = 0; i < days.length / 7; ++i) {
            weeks.push(days.slice(i * 7, i * 7 + 7));
        }
        return weeks;
    };
    CalendarComponent.prototype.ngAfterViewChecked = function () {
        // $(this.element.nativeElement).find('.day').click(function() {
        //   console.log('asdf');
        // });
    };
    __decorate([
        core_1.HostBinding('class.loading'), 
        __metadata('design:type', Boolean)
    ], CalendarComponent.prototype, "_loading", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object), 
        __metadata('design:paramtypes', [Object])
    ], CalendarComponent.prototype, "dateset", null);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object), 
        __metadata('design:paramtypes', [Object])
    ], CalendarComponent.prototype, "selecteddate", null);
    CalendarComponent = __decorate([
        core_1.Component({
            selector: NAME,
            templateUrl: "app/components/" + NAME + "/template.html",
            styleUrls: [("dist/app/components/" + NAME + "/styles.css")],
            outputs: ['datewasselected']
        }), 
        __metadata('design:paramtypes', [core_1.ElementRef])
    ], CalendarComponent);
    return CalendarComponent;
}());
exports.CalendarComponent = CalendarComponent;
//# sourceMappingURL=index.js.map