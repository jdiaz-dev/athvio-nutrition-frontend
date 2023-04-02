import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
dayjs.extend(utc);

export const date1 = dayjs('Sun Mar 26 2023 00:00:00 GMT-0500 (Peru Standard Time)');
export const date2 = dayjs('Sun May 07 2023 00:00:00 GMT-0500 (Peru Standard Time)');

let dateStart = dayjs(date1);
dateStart = dayjs(dateStart).set('date', dateStart.get('date') + 1);

const res = dateStart.toDate();
res;
const res2 = date1 > date2;
res2;
