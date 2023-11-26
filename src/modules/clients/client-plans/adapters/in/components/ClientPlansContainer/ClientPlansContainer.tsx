import React, { useContext, useEffect, useState } from 'react';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Navigate, useParams } from 'react-router-dom';
import { DatesSetArg } from '@fullcalendar/core';

import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid'; // a plugin!
import interactionPlugin from '@fullcalendar/interaction';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';
import ClientPlansHelper from 'src/modules/clients/client-plans/adapters/in/components/ClientPlansContainer/ClientPlansHelper';
import { DateItem, ReduxStates } from 'src/shared/types/types';
import { ClientPlanDateExtendedProps } from 'src/modules/clients/clients/adapters/out/client.types';
import { ProfessionalIdContext } from 'src/App';
import { useReloadRecords } from 'src/shared/hooks/useReloadRecords';
import dayjs from 'dayjs';
import { useSelector } from 'react-redux';
import { ReloadRecordListContext } from 'src/shared/context/ReloadRecordsContext';
import { CurrentModuleContext } from 'src/shared/context/CurrentModuleContext';
import { Modules } from 'src/shared/Consts';
import { useClientPlan } from 'src/modules/clients/client-plans/adapters/out/ClientPlanActions';

function ClientPlansContainer() {
  const professionalIdContext = useContext(ProfessionalIdContext);
  const clientPlansState = useSelector((state: ReduxStates) => state.clientPlans.clientPlans || []);
  const { clientId } = useParams();
  const { getClientPlans } = useClientPlan();
  const { reloadRecordList, setReloadRecordList } = useReloadRecords();
  const [redirectToClientList, setRedirectToClientList] = useState(false);
  const [dateSet, setDateSet] = useState<{ dateStart: Date; dateEnd: Date } | null>(null);
  const [datesToShow, setDatesToShow] = useState<DateItem<ClientPlanDateExtendedProps>[]>([]);
  const input = {
    professional: professionalIdContext.professional,
    client: clientId as string,
    offset: 0,
    limit: 30,
  };

  useEffect(() => {
    const getProgramHelper = async () => {
      await getClientPlans(input);
    };

    if (professionalIdContext.professional) {
      void getProgramHelper();
      setReloadRecordList(false);
    }
  }, [professionalIdContext.professional, reloadRecordList]);

  useEffect(() => {
    // const weeksBasedOnPlans = clientPlansState.plans.length > 0 ? clientPlansState.plans[clientPlansState.plans.length - 1].week : baseWeek;
    const fullWeekTableWithDates = (): DateItem<ClientPlanDateExtendedProps>[] => {
      let dateStart = dayjs(dateSet ? dateSet.dateStart : new Date());
      let dateItem: DateItem<ClientPlanDateExtendedProps>;

      let planDay = 1;
      let planWeek = 1;
      let planIndex: number;

      const dates: DateItem<ClientPlanDateExtendedProps>[] = [];
      while (dateStart < dayjs(dateSet ? dateSet.dateEnd : new Date())) {
        planIndex = clientPlansState.findIndex((plan) => {
          return dayjs(plan.assignedDate).toString() === dateStart.toString();
        });
        dateItem = {
          title: '',
          date: dateStart.toDate(),
          extendedProps: {
            client: clientId as string,
            clientPlanDayInfo: {
              _id: clientPlansState.length > 0 && planIndex >= 0 ? clientPlansState[planIndex]._id : null,
              totalMeals: clientPlansState.length > 0 && planIndex >= 0 ? clientPlansState[planIndex].meals.length : null,
            },
            assignedDate: new Date(dateStart.toString()),
          },
        };
        dateStart = dayjs(dateStart).set('date', dateStart.get('date') + 1);
        planWeek = planDay % 7 === 0 ? planWeek + 1 : planWeek;
        planDay++;
        dates.push(dateItem);
      }
      return dates;
    };
    /* const handleWeekAction = (): number => {
      if (weekAction === WeekActions.READY) {
        return weeksBasedOnPlans;
      } else if (weekAction === WeekActions.ADD) {
        return totalWeeks + 1;
      } else if (weekAction === WeekActions.REMOVE) {
        return totalWeeks - 1;
      } else {
        return totalWeeks;
      }
    }; */

    if (datesToShow.length === 0 || reloadRecordList || clientPlansState) {
      setDatesToShow(fullWeekTableWithDates());
      // setMaxWeekWithPlans(weeksBasedOnPlans);
      // setTotalWeeks(handleWeekAction());
      // setWeekAction(WeekActions.NEUTRAL);
    }
  }, [reloadRecordList, dateSet, clientPlansState /* weekAction */]);

  const dateSetHelper = (dateInfo: DatesSetArg) => {
    setDateSet({ dateStart: dateInfo.start, dateEnd: dateInfo.end });
  };

  if (redirectToClientList) {
    const path = `/sidenav/Clients`;
    return <Navigate replace to={path} />;
  }

  return (
    <div>
      <ArrowBackIcon
        onClick={() => {
          setRedirectToClientList(true);
        }}
      />
      <CurrentModuleContext.Provider value={{ currentModule: Modules.CLIENT_PLANS }}>
        <ReloadRecordListContext.Provider value={{ reloadRecordList, setReloadRecordList }}>
          <FullCalendar
            plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin, listPlugin]}
            // eventClick={handleEventClick}
            // dateClick={handleDateClick}

            events={datesToShow}
            datesSet={dateSetHelper}
            eventContent={ClientPlansHelper}
            // handleCustomRendering={eventNewDiv}

            // dayHeaders={false}
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
            /* dayCellContent={(info, create) => {
          counterDay++;
          return <div>Day {counterDay}</div>;
        }} */

            // contentHeight={contentHeight}

            titleFormat={{
              weekday: undefined,
            }}
          />
        </ReloadRecordListContext.Provider>
      </CurrentModuleContext.Provider>
    </div>
  );
}

export default ClientPlansContainer;
