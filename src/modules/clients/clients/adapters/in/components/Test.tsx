import { Calendar, dayjsLocalizer } from 'react-big-calendar';
import dayjs from 'dayjs';
import 'react-big-calendar/lib/css/react-big-calendar.css ';
const localizer = dayjsLocalizer(dayjs);

const MyCalendar = (props) => (
  <div>
    <Calendar localizer={localizer} startAccessor="start" endAccessor="end" style={{ height: 500 }} />
  </div>
);
export default MyCalendar;
