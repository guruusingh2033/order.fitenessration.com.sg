"use strict";
var moment = require('moment');
var date_1 = require('../common/scripts/date');
function humanDateFormat(date) {
    if (date) {
        return moment(date_1.convertToDate(date)).format('ddd, D MMM YYYY');
    }
    else {
        return '';
    }
}
exports.humanDateFormat = humanDateFormat;
//# sourceMappingURL=helpers.js.map