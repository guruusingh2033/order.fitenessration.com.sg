import * as moment from 'moment';

export function today() {
	var now = new Date();
	return createDay(now.getFullYear(), now.getMonth(), now.getDate());
}

export function createDay(year, month, day) {
  return new Date(year, month, day, 0, 0, 0);
}

export function addDays(date, days) {
  return createDay(date.getFullYear(), date.getMonth(), date.getDate() + days);
}

export function firstDayOfMonth(month) {
  return createDay(month.getFullYear(), month.getMonth(), 1);
}

export function calendarDaysForMonth(month) {
  var days = [];
  var firstDay = firstDayOfMonth(month);
  for (var i = 0; i < 7 - (7 - firstDay.getDay()); ++ i) {
    days.unshift(addDays(firstDay, -(i + 1)));
  }
  var day = firstDay;
  while (day.getMonth() == month.getMonth() || day.getMonth() > month.getMonth() && days.length % 7) {
    days.push(day);
    day = addDays(day, 1);
  }
  return days;
}

export function convertToDate(date: Date|string): Date {
  if (typeof date == 'string') {
    return (<any>moment(date))._d;
  }
  else {
    return <Date>date;
  }
}