/* eslint-disable max-len */
import React, { useContext, useEffect, useState } from 'react';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

import FullCalendar from '@fullcalendar/react'; // must go before plugins
import dayGridPlugin from '@fullcalendar/daygrid'; // a plugin!
import interactionPlugin from '@fullcalendar/interaction';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';

import { Navigate, useParams } from 'react-router-dom';
import ProgramPlansHelper from 'src/modules/professionals/programs/adapters/in/components/ProgramPlansContainer/ProgramPlansHelper';

import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import { ReloadRecordListContext } from 'src/shared/context/ReloadRecordsContext';
import { useReloadRecords } from 'src/shared/hooks/useReloadRecords';
import { Button } from '@mui/material';
import { Modules, WeekActions } from 'src/shared/Consts';
import { useProgram } from 'src/modules/professionals/programs/adapters/out/ProgramActions';
import { CurrentModuleContext } from 'src/shared/context/CurrentModuleContext';
import { assignmentWeekDayHook } from 'src/modules/professionals/programs/adapters/in/components/ProgramPlansContainer/assignmentWeekDayHook';
import { calendarConfigurationHook } from 'src/modules/professionals/programs/adapters/in/components/ProgramPlansContainer/calendarConfigurationHook';
import { AuthContext } from 'src/modules/authentication/authentication/adapters/in/context/AuthContext';
import { Box } from '@mui/system';
import CalendarStyled from 'src/shared/components/CalendarStyled/CalendarStyled';

dayjs.extend(utc);

function ProgramPlansContainer() {
  const { programId } = useParams();
  const authContext = useContext(AuthContext);
  const { getProgram } = useProgram();

  const { reloadRecordList, setReloadRecordList } = useReloadRecords();
  const [redirectToProgramList, setRedirectToProgramList] = useState(false);

  const { handleOnDrop, manageDragEffect } = assignmentWeekDayHook(programId as string);
  const { dateSetHelper, setWeekAction, datesToShow, totalWeeks, maxWeekWithPlans, contentHeight } =
    calendarConfigurationHook(reloadRecordList);

  const input = {
    professional: authContext.professional,
    program: programId as string,
  };

  useEffect(() => {
    const getProgramHelper = async () => {
      await getProgram(input);
    };

    if (authContext.professional) {
      void getProgramHelper();
      setReloadRecordList(false);
    }
  }, [authContext.professional, reloadRecordList]);

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
          <Box sx={{ position: 'relative' }}>
            <CalendarStyled>
              <FullCalendar
                plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin, listPlugin]}
                initialView="dayGridFourWeek"
                // eventClick={handleEventClick}
                // dateClick={handleDateClick}
                headerToolbar={false}
                events={datesToShow}
                editable={true} // enable draggable
                datesSet={dateSetHelper}
                eventContent={ProgramPlansHelper}
                customRenderingReplacesEl={true}
                unselectAuto={false}
                views={{
                  dayGridFourWeek: {
                    type: 'dayGrid',
                    duration: { weeks: totalWeeks, specifiedWeeks: true },
                    listDayFormat: { weekday: 'long' },
                  },
                }}
                // dragScroll={true}
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

                dayCellContent={() => {
                  counterDay++;
                  return <div>Day {counterDay}</div>;
                }}
                contentHeight={contentHeight}
                titleFormat={{
                  weekday: undefined,
                }}
                eventDrop={handleOnDrop}
                eventDataTransform={manageDragEffect}
                progressiveEventRendering={true}
              />
            </CalendarStyled>
          </Box>
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
