import React, { useCallback, useContext, useEffect, useState } from 'react';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

import FullCalendar from '@fullcalendar/react'; // must go before plugins
import dayGridPlugin from '@fullcalendar/daygrid'; // a plugin!
import interactionPlugin from '@fullcalendar/interaction';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';

import { DatesSetArg } from '@fullcalendar/core';

import { Navigate, useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { GET_PROGRAM } from 'src/modules/professionals/programs/adapters/out/ProgramQueries';
import { DateItem, GetProgramRequest, GetProgramResponse, Plan } from 'src/modules/professionals/programs/adapters/out/program.types';
import { ProfessionalIdContext } from 'src/App';
import ProgramPlansHelper from 'src/modules/professionals/programs/adapters/in/components/ProgramPlansContainer/ProgramPlansHelper';

import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import { ReloadRecordListContext } from 'src/shared/context/ReloadRecordsContext';
import { useReloadRecords } from 'src/shared/hooks/useReloadRecords';
dayjs.extend(utc);

export const eventNewDiv = ({ event, el, view }) => {
  console.log(view.calendar.getOption('contextValues'));
  // Creating `div` to replace the default <a href=""/> for event
  const eventDiv = document.createElement('div');
  eventDiv.innerText = 'hellow';
  // Get classes on the default `a.fc-timeline-event`
  const classes = Array.from(el.classList);
  // Add classes to the new `div`
  eventDiv.classList.add(...classes);

  ReactDOM.render(<EventContent event={event} />, eventDiv);

  return eventDiv;
};
function ProgramPlansContainer() {
  const { programId } = useParams();
  const professionalIdContext = useContext(ProfessionalIdContext);

  const { reloadRecordList, setReloadRecordList } = useReloadRecords();

  const [datesToShow, setDatesToShow] = useState<DateItem[]>([]);
  const [redirectToProgramList, setRedirectToProgramList] = useState(false);
  const [plans, setPlans] = useState<Plan[] | null>(null);
  const input = {
    professional: professionalIdContext.professional,
    program: programId as string,
  };
  const { data, refetch } = useQuery<GetProgramResponse, GetProgramRequest>(GET_PROGRAM, {
    variables: {
      input,
    },
  });
  useEffect(() => {
    if (data !== undefined) {
      setPlans(data.getProgram.plans);
    }
    return () => {
      setPlans(null);
    };
  }, [data]);
  useEffect(() => {
    console.log(' hellow');
    if (reloadRecordList) {
      void refetch({ input });
      setReloadRecordList(false);
    }
  }, [reloadRecordList]);
  // function handleEventClick(arg: any) {}
  // function handleDateClick(arg) {}

  const fullMonthWithDates = useCallback(
    (dateInfo: DatesSetArg) => {
      console.log('-----------dateInfo1', dateInfo);

      let dateStart = dayjs(dateInfo.start);
      let dateItem: DateItem;
      const dates: DateItem[] = [];

      let dayPlan = 1;
      let planIndex: number;
      console.log(' -------*********************----------- plans', plans);

      while (dateStart < dayjs(dateInfo.end)) {
        planIndex = plans?.findIndex((plan) => plan.day === dayPlan) as number;
        dateItem = {
          title: '',
          date: dateStart.toDate(),
          extendedProps: {
            program: data && data?.getProgram._id ? data?.getProgram._id : '',
            plan: plans !== null && planIndex >= 0 ? plans[planIndex] : null,
            dayPlan,
          },
        };
        dateStart = dayjs(dateStart).set('date', dateStart.get('date') + 1);
        dayPlan++;
        dates.push(dateItem);
      }
      setDatesToShow(dates);
    },
    [plans],
  );

  if (redirectToProgramList) {
    const path = `/sidenav/Programs`;
    return <Navigate replace to={path} />;
  }

  let counterDay = 0;
  return (
    <>
      <ArrowBackIcon
        onClick={() => {
          setRedirectToProgramList(true);
        }}
      />
      <ReloadRecordListContext.Provider value={{ reloadRecordList, setReloadRecordList }}>
        {plans !== null && (
          <FullCalendar
            plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin, listPlugin]}
            initialView="dayGridFourWeek"
            // eventClick={handleEventClick}
            // dateClick={handleDateClick}
            events={datesToShow}
            datesSet={fullMonthWithDates}
            eventContent={ProgramPlansHelper}
            // handleCustomRendering={eventNewDiv}
            views={{
              dayGridFourWeek: {
                type: 'dayGrid',
                duration: { weeks: 3, specifiedWeeks: true },
                listDayFormat: { weekday: 'long' },
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

            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            dayCellContent={(info, create) => {
              counterDay++;
              return <div>Day {counterDay}</div>;
            }}
            contentHeight={450}
            titleFormat={{
              weekday: undefined,
            }}
          />
        )}
      </ReloadRecordListContext.Provider>
    </>
  );
}

export default ProgramPlansContainer;
