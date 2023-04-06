import React, { useContext, useState } from 'react';
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
import { Navigate, useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { GET_PROGRAM } from 'src/modules/professionals/programs/adapters/out/ProgramQueries';
import { GetProgramRequest, GetProgramResponse } from 'src/modules/professionals/programs/adapters/out/program.types';
import { ProfessionalIdContext } from 'src/App';
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
  const professionalIdContext = useContext(ProfessionalIdContext);
  // console.log('-----programId', programId);

  const [datesToShow, setDatesToShow] = useState<{ title: string; date: Date; extendedProps: { even: boolean; date: Date } }[]>(
    [],
  );
  let counterDay = 0;
  const [redirectToProgramList, setRedirectToProgramList] = useState(false);

  const { data } = useQuery<GetProgramResponse, GetProgramRequest>(GET_PROGRAM, {
    variables: {
      input: {
        professional: professionalIdContext.professional,
        program: programId as string,
      },
    },
  });
  console.log('----------data', data);
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

  if (redirectToProgramList) {
    const path = `/sidenav/Programs`;
    return <Navigate replace to={path} />;
  }

  return (
    <>
      <ArrowBackIcon
        onClick={() => {
          setRedirectToProgramList(true);
        }}
      />
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
            duration: { weeks: 3, specifiedWeeks: true },
            listDayFormat: { weekday: 'long' },

            dayHeaderFormat: { weekday: 'long' },
            allDayClassNames: 'all-day',
            allDayContent: 'All Day',
          },
        }}
        dayHeaders={false} // hide day headers
        /* dayHeaderContent={(args) => {
          if (args.text === 'Sun') {
            return <div>Day1</div>;
          } else if (args.text === 'Mon') {
            return <div>Day2</div>;
          } else if (args.text === 'Tue') {
            return <div>Day3</div>;
          } else if (args.text === 'Wed') {
            return <div>Day4</div>;
          } else if (args.text === 'Thu') {
            return <div>Day5</div>;
          } else if (args.text === 'Fri') {
            return <div>Day6</div>;
          } else {
            return <div>Day7</div>;
          }
        }} */
        dayCellContent={(info, create) => {
          counterDay++;
          // console.log('------args', counterDay);
          // console.log('------algo', algo)
          // console.log('------mas', mas)
          // const element = create('span', { id: 1 }, info.dayNumberText);
          // return element;
          return <div>Day {counterDay}</div>;
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
