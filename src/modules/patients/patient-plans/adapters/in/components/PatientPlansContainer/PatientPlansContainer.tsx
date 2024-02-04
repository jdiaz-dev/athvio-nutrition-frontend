import React, { useContext, useEffect, useState } from 'react';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Navigate, useParams } from 'react-router-dom';
import { DatesSetArg } from '@fullcalendar/core';

import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid'; // a plugin!
import interactionPlugin from '@fullcalendar/interaction';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';
import PatientPlansHelper from 'src/modules/patients/patient-plans/adapters/in/components/PatientPlansContainer/PatientPlansHelper';
import { DateItem, ReduxStates } from 'src/shared/types/types';
import { PatientPlanDateExtendedProps } from 'src/modules/patients/patients/adapters/out/patient.types';
import { useReloadRecords } from 'src/shared/hooks/useReloadRecords';
import dayjs from 'dayjs';
import { useSelector } from 'react-redux';
import { ReloadRecordListContext } from 'src/shared/context/ReloadRecordsContext';
import { CurrentModuleContext } from 'src/shared/context/CurrentModuleContext';
import { Modules } from 'src/shared/Consts';
import { usePatientPlan } from 'src/modules/patients/patient-plans/adapters/out/PatientPlanActions';
import { assignmentDateHook } from 'src/modules/patients/patient-plans/adapters/in/components/PatientPlansContainer/assignmentDateHook';
import { AuthContext } from 'src/modules/authentication/authentication/adapters/in/context/AuthContext';

function PatientPlansContainer() {
  const authContext = useContext(AuthContext);
  const patientPlansState = useSelector((state: ReduxStates) => state.patientPlans.patientPlans || []);
  const { patientId } = useParams();
  const { getPatientPlans } = usePatientPlan();
  const { reloadRecordList, setReloadRecordList } = useReloadRecords();
  const [redirectToPatientList, setRedirectToPatientList] = useState(false);
  const [dateSet, setDateSet] = useState<{ dateStart: Date; dateEnd: Date } | null>(null);
  const [datesToShow, setDatesToShow] = useState<DateItem<PatientPlanDateExtendedProps>[]>([]);
  const input = {
    professional: authContext.professional,
    patient: patientId as string,
    offset: 0,
    limit: 30,
  };
  console.log('-----------PatientPlansContainer')
  const { handleOnStart, handleOnDrop, manageDragEffect } = assignmentDateHook(patientId as string, setReloadRecordList);
  useEffect(() => {
    const getProgramHelper = async () => {
      await getPatientPlans(input);
    };

    if (authContext.professional) {
      void getProgramHelper();
      setReloadRecordList(false);
    }
  }, [authContext.professional, reloadRecordList]);

  useEffect(() => {
    // const   = patientPlansState.plans.length > 0 ? patientPlansState.plans[patientPlansState.plans.length - 1].week : baseWeek;
    const fullWeekTableWithDates = (): DateItem<PatientPlanDateExtendedProps>[] => {
      let dateStart = dayjs(dateSet ? dateSet.dateStart : new Date());
      let dateItem: DateItem<PatientPlanDateExtendedProps>;

      let planDay = 1;
      let planWeek = 1;
      let planIndex: number;

      const dates: DateItem<PatientPlanDateExtendedProps>[] = [];
      while (dateStart < dayjs(dateSet ? dateSet.dateEnd : new Date())) {
        planIndex = patientPlansState.findIndex((plan) => {
          return dayjs(plan.assignedDate).toString() === dateStart.toString();
        });
        dateItem = {
          title: '',
          date: dateStart.toDate(),
          extendedProps: {
            patient: patientId as string,
            patientPlanDayInfo: {
              _id: patientPlansState.length > 0 && planIndex >= 0 ? patientPlansState[planIndex]._id : null,
              meals: patientPlansState.length > 0 && planIndex >= 0 ? patientPlansState[planIndex].meals : null,
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

    if (datesToShow.length === 0 || reloadRecordList || patientPlansState) {
      setDatesToShow(fullWeekTableWithDates());
      // setMaxWeekWithPlans(weeksBasedOnPlans);
      // setTotalWeeks(handleWeekAction());
      // setWeekAction(WeekActions.NEUTRAL);
    }
  }, [reloadRecordList, dateSet, patientPlansState /* weekAction */]);

  const dateSetHelper = (dateInfo: DatesSetArg) => {
    setDateSet({ dateStart: dateInfo.start, dateEnd: dateInfo.end });
  };

  if (redirectToPatientList) {
    const path = `/sidenav/Patients`;
    return <Navigate replace to={path} />;
  }

  return (
    <div>
      <ArrowBackIcon
        onClick={() => {
          setRedirectToPatientList(true);
        }}
      />
      <CurrentModuleContext.Provider value={{ currentModule: Modules.CLIENT_PLANS }}>
        <ReloadRecordListContext.Provider value={{ reloadRecordList, setReloadRecordList }}>
          <FullCalendar
            plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin, listPlugin]}
            // eventClick={handleEventClick}
            // dateClick={handleDateClick}
            headerToolbar={{
              left: 'title',
              center: '',
              right: 'prev,next',
            }}
            events={datesToShow}
            editable={true}
            datesSet={dateSetHelper}
            eventContent={PatientPlansHelper}
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
              year: 'numeric',
              month: 'long',
            }}
            eventDragStart={handleOnStart}
            eventDrop={handleOnDrop}
            eventDataTransform={manageDragEffect}
          />
        </ReloadRecordListContext.Provider>
      </CurrentModuleContext.Provider>
    </div>
  );
}

export default PatientPlansContainer;
