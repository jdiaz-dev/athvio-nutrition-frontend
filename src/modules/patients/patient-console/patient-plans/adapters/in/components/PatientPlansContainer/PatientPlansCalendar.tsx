import React, { useContext, useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import { DatesSetArg } from '@fullcalendar/core';

import { Theme } from '@mui/material/styles';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';
import PatientPlansHelper from 'src/modules/patients/patient-console/patient-plans/adapters/in/components/PatientPlansContainer/PatientPlansHelper';
import { DateItem, ReduxStates } from 'src/shared/types/types';
import { PatientPlanDateExtendedProps } from 'src/modules/patients/patients/adapters/out/patient.types';
import { useReloadRecords } from 'src/shared/hooks/useReloadRecords';
import dayjs from 'dayjs';
import { useSelector } from 'react-redux';
import { ReloadRecordListContext } from 'src/shared/context/ReloadRecordsContext';
import { CurrentModuleContext } from 'src/shared/context/CurrentModuleContext';
import { Modules } from 'src/shared/Consts';
import { usePatientPlan } from 'src/modules/patients/patient-console/patient-plans/adapters/out/PatientPlanActions';
import { assignmentDateHook } from 'src/modules/patients/patient-console/patient-plans/adapters/in/components/PatientPlansContainer/assignmentDateHook';
import CalendarStyled from 'src/shared/components/CalendarStyled/CalendarStyled';
import { useMediaQuery } from '@mui/material';
import { SidebarContext } from 'src/modules/patients/patient-console/patient-sidebar/context/SidebarContext';

function PatientPlansCalendar() {
  const matchDownSM = useMediaQuery((theme: Theme) => theme.breakpoints.down('sm'));
  const calendarRef = useRef<FullCalendar>(null);
  const sidebarContext = useContext(SidebarContext);
  const patientPlansState = useSelector((state: ReduxStates) => state.patientPlans.patientPlans);
  const { patientId } = useParams();
  const { getPatientPlans } = usePatientPlan();
  const { reloadRecordList, setReloadRecordList } = useReloadRecords();
  const [dateSet, setDateSet] = useState<{ dateStart: Date; dateEnd: Date } | null>(null);
  const [datesToShow, setDatesToShow] = useState<DateItem<PatientPlanDateExtendedProps>[]>([]);
  const input = {
    patient: patientId as string,
    offset: 0,
    limit: 30,
  };

  const { handleOnStart, handleOnDrop, manageDragEffect } = assignmentDateHook(patientId as string);

  useEffect(() => {
    const calendarEl = calendarRef.current;
    if (calendarEl) {
      const calendarApi = calendarEl.getApi();
      const newView = matchDownSM ? 'listWeek' : 'dayGridMonth';
      calendarApi.changeView(newView);
      // setCalendarView(newView);
    }
  }, [matchDownSM]);

  useEffect(() => {
    const getProgramHelper = async () => {
      await getPatientPlans(input);
      setReloadRecordList(false);
    };

    if (reloadRecordList) void getProgramHelper();
  }, [reloadRecordList]);
  useEffect(() => {
    setTimeout(() => {
      // Triggers a reflow, ensure that fullcalendar resize after to open/close the patientSideBar
      window.dispatchEvent(new Event('resize'));
      if (calendarRef.current) {
        calendarRef.current.getApi().updateSize();
      }
    }, 300);
  }, [sidebarContext.openSidebar]);

  useEffect(() => {
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
    }
  }, [reloadRecordList, dateSet, patientPlansState /* weekAction */]);

  const dateSetHelper = (dateInfo: DatesSetArg) => {
    console.log('---------dateInfo', dateInfo);
    setDateSet({ dateStart: dateInfo.start, dateEnd: dateInfo.end });
  };

  return (
    <>
      <CurrentModuleContext.Provider value={{ currentModule: Modules.CLIENT_PLANS }}>
        <ReloadRecordListContext.Provider value={{ reloadRecordList, setReloadRecordList }}>
          <CalendarStyled withStylesForCustomScroller={true}>
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
              ref={calendarRef}
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
          </CalendarStyled>
        </ReloadRecordListContext.Provider>
      </CurrentModuleContext.Provider>
    </>
  );
}

export default PatientPlansCalendar;
