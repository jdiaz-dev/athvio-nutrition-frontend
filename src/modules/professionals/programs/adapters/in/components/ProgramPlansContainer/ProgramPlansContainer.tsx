import React, { useContext, useEffect, useState } from 'react';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

import FullCalendar from '@fullcalendar/react'; // must go before plugins
import dayGridPlugin from '@fullcalendar/daygrid'; // a plugin!
import interactionPlugin from '@fullcalendar/interaction';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';

import { DatesSetArg } from '@fullcalendar/core';

import { Navigate, useParams } from 'react-router-dom';
import { ProfessionalIdContext } from 'src/App';
import ProgramPlansHelper from 'src/modules/professionals/programs/adapters/in/components/ProgramPlansContainer/ProgramPlansHelper';

import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import { ReloadRecordListContext } from 'src/shared/context/ReloadRecordsContext';
import { useReloadRecords } from 'src/shared/hooks/useReloadRecords';
import { Button } from '@mui/material';
import { baseHeight, baseWeek, Modules, WeekActions } from 'src/shared/Consts';
import { useProgram } from 'src/modules/professionals/programs/adapters/out/ProgramActions';
import { useSelector } from 'react-redux';
import { DateItem, ReduxStates } from 'src/shared/types/types';
import { ProgramPlanDateExtendedProps } from 'src/modules/professionals/programs/adapters/out/program.types';
import { CurrentModuleContext } from 'src/shared/components/MealBuilder/CurrentModuleContext';
dayjs.extend(utc);

function ProgramPlansContainer() {
  const { programId } = useParams();
  const professionalIdContext = useContext(ProfessionalIdContext);
  const programState = useSelector((state: ReduxStates) => state.programs.program);

  const { getProgram } = useProgram();
  const { reloadRecordList, setReloadRecordList } = useReloadRecords();
  const [redirectToProgramList, setRedirectToProgramList] = useState(false);

  const [datesToShow, setDatesToShow] = useState<DateItem<ProgramPlanDateExtendedProps>[]>([]);
  const [dateSet, setDateSet] = useState<{ dateStart: Date; dateEnd: Date } | null>(null);
  const [totalWeeks, setTotalWeeks] = useState<number>(baseWeek);
  const [contentHeight, setContentHeight] = useState<number>(baseHeight);
  const [weekAction, setWeekAction] = useState<WeekActions>(WeekActions.READY);
  const [maxWeekWithPlans, setMaxWeekWithPlans] = useState<number>(1);
  const input = {
    professional: professionalIdContext.professional,
    program: programId as string,
  };

  useEffect(() => {
    const getProgramHelper = async () => {
      await getProgram(input);
    };

    if (professionalIdContext.professional) {
      void getProgramHelper();
      setReloadRecordList(false);
    }
  }, [professionalIdContext.professional, reloadRecordList]);

  useEffect(() => {
    const weeksBasedOnPlans = programState.plans.length > 0 ? programState.plans[programState.plans.length - 1].week : baseWeek;
    const fullWeekTableWithDates = (): DateItem<ProgramPlanDateExtendedProps>[] => {
      let dateStart = dayjs(dateSet ? dateSet.dateStart : new Date());
      let dateItem: DateItem<ProgramPlanDateExtendedProps>;

      let planDay = 1;
      let planWeek = 1;
      let planIndex: number;

      const dates: DateItem<ProgramPlanDateExtendedProps>[] = [];
      while (dateStart < dayjs(dateSet ? dateSet.dateEnd : new Date())) {
        planIndex = programState.plans.findIndex((plan) => plan.day === planDay);
        dateItem = {
          title: '',
          date: dateStart.toDate(),
          extendedProps: {
            program: programState !== undefined ? programState._id : '',
            planDayInfo: {
              _id: programState.plans.length > 0 && planIndex >= 0 ? programState.plans[planIndex]._id : null,
              totalMeals: programState.plans.length > 0 && planIndex >= 0 ? programState.plans[planIndex].meals.length : null,
            },
            planDay,
            planWeek,
          },
        };
        dateStart = dayjs(dateStart).set('date', dateStart.get('date') + 1);
        planWeek = planDay % 7 === 0 ? planWeek + 1 : planWeek;
        planDay++;
        dates.push(dateItem);
      }
      return dates;
    };
    const handleWeekAction = (): number => {
      if (weekAction === WeekActions.READY) {
        return weeksBasedOnPlans;
      } else if (weekAction === WeekActions.ADD) {
        return totalWeeks + 1;
      } else if (weekAction === WeekActions.REMOVE) {
        return totalWeeks - 1;
      } else {
        return totalWeeks;
      }
    };

    if (dateSet !== null || reloadRecordList) {
      setDatesToShow(fullWeekTableWithDates());
      setMaxWeekWithPlans(weeksBasedOnPlans);
      setTotalWeeks(handleWeekAction());
    }
    if (weekAction !== WeekActions.READY) {
      setWeekAction(WeekActions.NEUTRAL);
    }
  }, [reloadRecordList, dateSet, programState, weekAction]);

  useEffect(() => {
    setContentHeight(baseHeight * totalWeeks);
  }, [totalWeeks]);

  const dateSetHelper = (dateInfo: DatesSetArg) => {
    setDateSet({ dateStart: dateInfo.start, dateEnd: dateInfo.end });
  };

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
      <CurrentModuleContext.Provider value={{ currentModule: Modules.PROGRAMS }}>
        <ReloadRecordListContext.Provider value={{ reloadRecordList, setReloadRecordList }}>
          <FullCalendar
            plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin, listPlugin]}
            initialView="dayGridFourWeek"
            // eventClick={handleEventClick}
            // dateClick={handleDateClick}
            events={datesToShow}
            datesSet={dateSetHelper}
            eventContent={ProgramPlansHelper}
            // handleCustomRendering={eventNewDiv}
            views={{
              dayGridFourWeek: {
                type: 'dayGrid',
                duration: { weeks: totalWeeks, specifiedWeeks: true },
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
            contentHeight={contentHeight}
            titleFormat={{
              weekday: undefined,
            }}
          />

          <Button variant="contained" onClick={() => setWeekAction(WeekActions.ADD)}>
            Add week
          </Button>
          {maxWeekWithPlans < totalWeeks && (
            <Button variant="contained" onClick={() => setWeekAction(WeekActions.REMOVE)}>
              Remove week
            </Button>
          )}
        </ReloadRecordListContext.Provider>
      </CurrentModuleContext.Provider>
    </>
  );
}

export default ProgramPlansContainer;
