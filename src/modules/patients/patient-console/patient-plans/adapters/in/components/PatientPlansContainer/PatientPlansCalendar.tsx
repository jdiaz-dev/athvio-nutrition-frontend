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

import { useDispatch, useSelector } from 'react-redux';
import { ReloadRecordListContext } from 'src/shared/context/ReloadRecordsContext';
import { CurrentModuleContext } from 'src/shared/context/CurrentModuleContext';
import { Modules } from 'src/shared/Consts';
import { usePatientPlan } from 'src/modules/patients/patient-console/patient-plans/adapters/out/PatientPlanActions';
import { assignmentDateHook } from 'src/modules/patients/patient-console/patient-plans/adapters/in/components/PatientPlansContainer/assignmentDateHook';
import CalendarStyled from 'src/shared/components/CalendarStyled/CalendarStyled';
import { useMediaQuery } from '@mui/material';
import { SidebarContext } from 'src/modules/patients/patient-console/patient-sidebar/context/SidebarContext';
import { DateSet } from 'src/modules/patients/patient-console/patient-plans/adapters/helpers/PatientPlans';
import * as PatientPlanSlice from 'src/modules/patients/patient-console/patient-plans/adapters/in/slicers/PatientPlanSlice';
import CalendarHeader from 'src/modules/patients/patient-console/patient-plans/adapters/in/components/PatientPlansContainer/CalendarHeader';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import { Box } from '@mui/system';
dayjs.extend(utc);

function PatientPlansCalendar() {
  const dispatch = useDispatch();
  const matchDownSM = useMediaQuery((theme: Theme) => theme.breakpoints.down('sm'));
  const calendarRef = useRef<FullCalendar>(null);
  const sidebarContext = useContext(SidebarContext);
  const patientPlansState = useSelector((state: ReduxStates) => state.patientPlans.patientPlans);
  const { patientId } = useParams();
  const { getPatientPlans } = usePatientPlan();
  const { reloadRecordList, setReloadRecordList } = useReloadRecords();
  const [datesToShow, setDatesToShow] = useState<DateItem<PatientPlanDateExtendedProps>[]>([]);

  const { handleOnStart, handleOnDrop, manageDragEffect } = assignmentDateHook(patientId as string);
  const [dateSet, setDateSet] = useState<DateSet | null>(null);
  useEffect(() => {
    if (calendarRef.current) {
      const calendarApi = calendarRef.current.getApi();
      calendarApi.changeView(matchDownSM ? 'listWeek' : 'dayGridMonth');
    }
  }, [matchDownSM]);

  useEffect(() => {
    const fetchPlans = async () => {
      if (dateSet !== null) {
        const input = {
          patient: patientId as string,
          offset: 0,
          limit: 30,
          startDate: dayjs.utc(dateSet.dateStart).set('hour', 0).toISOString(),
          endDate: dayjs.utc(dateSet.dateEnd).set('hour', 0).toISOString(),
        };
        await getPatientPlans(input);
        setReloadRecordList(false);
      }
    };

    fetchPlans();
  }, [dateSet]);

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
      const dates: DateItem<PatientPlanDateExtendedProps>[] = [];

      while (dateStart < dayjs(dateSet ? dateSet.dateEnd : new Date())) {
        const planIndex = patientPlansState.findIndex((plan) => {
          const assignedDateOnlyDate = dayjs
            .utc(plan.assignedDate)
            .set('hour', 0)
            .set('minute', 0)
            .set('second', 0)
            .set('millisecond', 0)
            .toString();
          const dateStartOnlyDate = dayjs
            .utc(dateStart.toString())
            .set('hour', 0)
            .set('minute', 0)
            .set('second', 0)
            .set('millisecond', 0)
            .toString();
          return assignedDateOnlyDate === dateStartOnlyDate;
        });
        dates.push({
          title: '',
          date: dateStart.toDate(),
          extendedProps: {
            patient: patientId as string,
            patientPlanDayInfo: {
              uuid: patientPlansState.length > 0 && planIndex >= 0 ? patientPlansState[planIndex].uuid : null,
              meals: patientPlansState.length > 0 && planIndex >= 0 ? patientPlansState[planIndex].meals : null,
            },
            assignedDate: dateStart.toString(),
          },
        });

        dateStart = dateStart.add(1, 'day');
      }
      return dates;
    };

    if (!datesToShow.length || reloadRecordList || patientPlansState) {
      setDatesToShow(fullWeekTableWithDates());
    }
  }, [reloadRecordList, dateSet, patientPlansState]);

  useEffect(() => {
    return () => {
      dispatch(PatientPlanSlice.resetPatientPlans());
    };
  }, []);
  const handleDateSet = (dateInfo: DatesSetArg) => {
    setDateSet({ dateStart: dateInfo.start, dateEnd: dateInfo.end });
  };

  const handlePrev = () => calendarRef.current?.getApi().prev();
  const handleNext = () => calendarRef.current?.getApi().next();

  return (
    <Box
      sx={{
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        flexGrow: 1,
      }}
    >
      <CurrentModuleContext.Provider value={{ currentModule: Modules.CLIENT_PLANS }}>
        <ReloadRecordListContext.Provider value={{ reloadRecordList, setReloadRecordList }}>
          <CalendarStyled withStylesForCustomScroller={true}>
            <CalendarHeader dateSet={dateSet} handleCalendarNext={handleNext} handleCalendarPrev={handlePrev} />

            <FullCalendar
              plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin, listPlugin]}
              headerToolbar={false}
              events={datesToShow}
              ref={calendarRef}
              editable={true}
              datesSet={handleDateSet}
              eventContent={PatientPlansHelper}
              titleFormat={{ year: 'numeric', month: 'long' }}
              eventDragStart={handleOnStart}
              eventDrop={handleOnDrop}
              eventDataTransform={manageDragEffect}
            />
          </CalendarStyled>
        </ReloadRecordListContext.Provider>
      </CurrentModuleContext.Provider>
    </Box>
  );
}

export default PatientPlansCalendar;
