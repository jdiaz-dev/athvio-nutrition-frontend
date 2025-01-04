import React, { useContext, useEffect } from 'react';

import FullCalendar from '@fullcalendar/react'; // must go before plugins
import dayGridPlugin from '@fullcalendar/daygrid'; // a plugin!
import interactionPlugin from '@fullcalendar/interaction';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';
import { makeStyles } from 'tss-react/mui';

import { useParams } from 'react-router-dom';
import ProgramPlansHelper from 'src/modules/professionals/programs/adapters/in/components/ProgramPlansContainer/ProgramPlansHelper';

import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import { ReloadRecordListContext } from 'src/shared/context/ReloadRecordsContext';
import { useReloadRecords } from 'src/shared/hooks/useReloadRecords';
import { Button, Typography } from '@mui/material';
import { Modules, WeekActions } from 'src/shared/Consts';
import { useProgram } from 'src/modules/professionals/programs/adapters/out/ProgramActions';
import { CurrentModuleContext } from 'src/shared/context/CurrentModuleContext';
import { assignmentWeekDayHook } from 'src/modules/professionals/programs/adapters/in/components/ProgramPlansContainer/assignmentWeekDayHook';
import { calendarConfigurationHook } from 'src/modules/professionals/programs/adapters/in/components/ProgramPlansContainer/calendarConfigurationHook';
import { AuthContext } from 'src/modules/authentication/authentication/adapters/in/context/AuthContext';
import { Box } from '@mui/system';
import CalendarStyled from 'src/shared/components/CalendarStyled/CalendarStyled';
import { EventSourceInput } from '@fullcalendar/core';
import { useSelector } from 'react-redux';
import { ReduxStates } from 'src/shared/types/types';

dayjs.extend(utc);

const styles = makeStyles()(() => {
  return {
    button: {
      width: '150px',
      margin: '15px 20px 15px 20px',
    },
  };
});

function ProgramPlansContainer() {
  const { programId } = useParams();
  const authContext = useContext(AuthContext);
  const { getProgram } = useProgram();
  const { data: programState } = useSelector((state: ReduxStates) => state.programs.program);

  const { reloadRecordList, setReloadRecordList } = useReloadRecords();

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

  let counterDay = 0;
  const { classes } = styles();

  return (
    <>
      <CurrentModuleContext.Provider value={{ currentModule: Modules.PROGRAMS }}>
        <ReloadRecordListContext.Provider value={{ reloadRecordList, setReloadRecordList }}>
          <Box sx={{ width: '96%', margin: '0 auto', marginTop: '1%' }}>
            <Typography variant="h5" align="left" style={{ marginBottom: '6px' }}>
              {programState.name}
            </Typography>
            <CalendarStyled>
              <FullCalendar
                plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin, listPlugin]}
                initialView="dayGridFourWeek"
                // eventClick={handleEventClick}
                // dateClick={handleDateClick}
                headerToolbar={false}
                events={datesToShow as EventSourceInput}
                editable={true} // enable draggable
                datesSet={dateSetHelper}
                eventContent={ProgramPlansHelper}
                customRenderingReplaces={true}
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
                height={'auto'} //allowed me to void have overflow: scroll
                initialDate={'1999-01-01'} //to void focus in current day
                titleFormat={{
                  weekday: undefined,
                }}
                eventDrop={handleOnDrop}
                eventDataTransform={manageDragEffect}
                progressiveEventRendering={true}
              />
            </CalendarStyled>
          </Box>
          <Button className={classes.button} variant="contained" onClick={() => setWeekAction(WeekActions.ADD)}>
            Add week
          </Button>
          {maxWeekWithPlans < totalWeeks && (
            <Button className={classes.button} variant="contained" onClick={() => setWeekAction(WeekActions.REMOVE)}>
              Remove week
            </Button>
          )}
        </ReloadRecordListContext.Provider>
      </CurrentModuleContext.Provider>
    </>
  );
}

export default ProgramPlansContainer;
