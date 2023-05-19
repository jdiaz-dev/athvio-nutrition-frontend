import React, { useState } from 'react';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Navigate, useParams } from 'react-router-dom';
import { DatesSetArg } from '@fullcalendar/core';

import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid'; // a plugin!
import interactionPlugin from '@fullcalendar/interaction';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';
import ClientPlansHelper from 'src/modules/clients/client-plans/adapters/in/components/ClientPlansContainer/ClientPlansHelper';
import { DateItem } from 'src/shared/types/types';

function ClientPlansContainer() {
  const { clientId } = useParams();
  const [redirectToClientList, setRedirectToClientList] = useState(false);
  const [dateSet, setDateSet] = useState<{ dateStart: Date; dateEnd: Date } | null>(null);
  const [datesToShow, setDatesToShow] = useState<DateItem<DateItemExtendedProps>[]>([]);

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
    </div>
  );
}

export default ClientPlansContainer;
