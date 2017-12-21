"use strict";
var _ = require('lodash');
var date_1 = require('./date');
var DateSet = (function () {
    function DateSet() {
        this.rules = {};
    }
    DateSet.prototype.clearCache = function () {
    };
    DateSet.prototype.addRule = function (type, rule, priority) {
        if (priority === void 0) { priority = 0; }
        if (!this.rules[priority])
            this.rules[priority] = [];
        this.rules[priority].push([type, rule]);
        this.clearCache();
    };
    DateSet.testRule = function (type, rule, date) {
        var result = rule(date);
        if (type == 'include') {
            if (result)
                return true;
            else
                return 0;
        }
        else if (type == 'exclude') {
            if (result)
                return false;
            else
                return 1;
        }
    };
    DateSet.prototype.resolveRules = function () {
        var priorities = _.map(_.keys(this.rules), function (key) { return parseInt(key); }).sort(); //.reverse();
        var rules = [];
        for (var _i = 0, priorities_1 = priorities; _i < priorities_1.length; _i++) {
            var priority = priorities_1[_i];
            rules = rules.concat(this.rules[priority]);
        }
        return rules;
    };
    DateSet.prototype.test = function (date) {
        var currentResult;
        var definiteDate = date_1.convertToDate(date);
        var rules = this.resolveRules();
        for (var i = rules.length - 1; i >= 0; --i) {
            currentResult = DateSet.testRule(rules[i][0], rules[i][1], definiteDate);
            if (typeof currentResult == 'boolean')
                return currentResult;
        }
        return currentResult;
    };
    DateSet.prototype.earliestDate = function (maxDaysInFuture) {
        if (maxDaysInFuture === void 0) { maxDaysInFuture = 30; }
        var date = date_1.today();
        var daysAhead = 0;
        while (!this.test(date) && daysAhead < maxDaysInFuture) {
            date = date_1.addDays(date, 1);
            ++daysAhead;
        }
        if (this.test(date)) {
            return date;
        }
        else {
            return null;
        }
    };
    DateSet.rule = {
        all: function () {
            return true;
        },
        weekday: function (weekday) {
            return function (testDate) {
                return testDate.getDay() == weekday;
            };
        },
        range: function (beginDate, endDate) {
            beginDate = date_1.convertToDate(beginDate);
            endDate = date_1.convertToDate(endDate);
            return function (testDate) {
                return testDate >= beginDate && testDate <= endDate;
            };
        },
        invertedRange: function (beginDate, endDate) {
            beginDate = date_1.convertToDate(beginDate);
            endDate = date_1.convertToDate(endDate);
            return function (testDate) {
                return testDate < beginDate || testDate > endDate;
            };
        },
        date: function (date) {
            date = date_1.convertToDate(date);
            return function (testDate) {
                return date.valueOf() == testDate.valueOf();
            };
        },
        dayOfYear: function (dayOfYear) {
            var parts = dayOfYear.split('-');
            var month = parseInt(parts[0]);
            var day = parseInt(parts[1]);
            return function (testDate) {
                return testDate.getDate() == day && (testDate.getMonth() + 1) == month;
            };
        },
        after: function (date) {
            date = date_1.convertToDate(date);
            return function (testDate) {
                return testDate > date;
            };
        },
        before: function (date) {
            date = date_1.convertToDate(date);
            return function (testDate) {
                return testDate < date;
            };
        },
        dateSet: function (dateSet) {
            return function (testDate) {
                return dateSet.test(testDate) == true;
            };
        }
    };
    return DateSet;
}());
exports.DateSet = DateSet;
//# sourceMappingURL=DateSet.js.map