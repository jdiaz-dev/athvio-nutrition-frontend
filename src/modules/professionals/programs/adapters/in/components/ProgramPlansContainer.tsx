import React, { useState } from 'react';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

import FullCalendar from '@fullcalendar/react'; // must go before plugins
import interactionPlugin from '@fullcalendar/interaction';
import dayGridPlugin from '@fullcalendar/daygrid'; // a plugin!
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';
import { DatesSetArg } from '@fullcalendar/core';

import dayjs, { Dayjs } from 'dayjs';
import utc from 'dayjs/plugin/utc';
import ProgramRecipePlan from 'src/modules/professionals/programs/adapters/in/dialogs/ProgramMealPlan/ProgramMealPlan';
import { useParams } from 'react-router-dom';
dayjs.extend(utc);

function ProgramPlansHelper(arg, createElement) {
  if (arg.event.extendedProps.even) {
    return <div>pro</div>;
  } else {
    return (
      <div>
        <ProgramRecipePlan date={arg.event.extendedProps.date} />
      </div>
    );
  }
}

function ProgramPlansContainer() {
  const { programId } = useParams();
  console.log('-----programId', programId);
  const [datesToShow, setDatesToShow] = useState<{ title: string; date: Date; extendedProps: { even: boolean; date: Date } }[]>(
    [],
  );

  function handleEventClick(arg: any) {
    // bind with an arrow function
    // alert(arg.dateStr);
    // console.log('---------event clicked', arg);
    // console.log('---------event clicked data', arg.view.getCurrentData());
  }

  function handleDateClick(arg) {
    // bind with an arrow function
    // console.log('---------date clicked', arg);
    // alert(arg.dateStr);
  }
  const fullMonthWithDates = (dateInfo: DatesSetArg) => {
    let dateStart = dayjs(dateInfo.start);
    let dateItem;
    const dates: { title: string; date: Date; extendedProps: { even: boolean; date: Date } }[] = [];
    while (dateStart < dayjs(dateInfo.end)) {
      dateItem = {
        title: '',
        date: dateStart.toDate(),
        extendedProps: { even: dateStart.get('date') % 2 == 0 ? true : false, date: dateStart.toDate() },
      };
      dateStart = dayjs(dateStart).set('date', dateStart.get('date') + 1);
      dates.push(dateItem);
    }
    setDatesToShow(dates);
  };
  return (
    <>
      <ArrowBackIcon />
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin, listPlugin]}
        initialView="dayGridFourWeek"
        eventClick={handleEventClick}
        dateClick={handleDateClick}
        events={datesToShow}
        datesSet={fullMonthWithDates}
        eventContent={ProgramPlansHelper}
        /* fixedWeekCount={true}
         */
        views={{
          dayGridFourWeek: {
            type: 'dayGrid',
            duration: { weeks: 3 },
            listDayFormat: { weekday: 'long' },
          },
        }}
        dayHeaderContent={(args) => {
          console.log('args', args);
          if (args.text === 'Sun') {
            return <div>Day1</div>;
          }
          return <div>propro</div>;
        }}
        dayCellContent={(args) => {
          return <div></div>;
        }}
        contentHeight={450}
        titleFormat={{
          weekday: undefined,
        }}
        // weekNumberDidMount
      />
    </>
  );
}

export default ProgramPlansContainer;
