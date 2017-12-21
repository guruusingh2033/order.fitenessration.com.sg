import * as moment from 'moment';
import { convertToDate } from '../common/scripts/date';

export function humanDateFormat(date) {
  if (date) {
    return moment(convertToDate(date)).format('ddd, D MMM YYYY');
  }
  else {
    return '';
  }
}
