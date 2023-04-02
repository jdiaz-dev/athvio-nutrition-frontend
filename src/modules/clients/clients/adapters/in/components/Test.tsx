import React, { useState } from 'react';
import FullCalendar from '@fullcalendar/react'; // must go before plugins
import interactionPlugin from '@fullcalendar/interaction';
import dayGridPlugin from '@fullcalendar/daygrid'; // a plugin!
import timeGridPlugin from '@fullcalendar/timegrid';

import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { DatesSetArg } from '@fullcalendar/core';
import dayjs, { Dayjs } from 'dayjs';
import utc from 'dayjs/plugin/utc';
dayjs.extend(utc);

function RenderEventContent({ date }: { date: Date }) {
  console.log('----------RenderEventContent', date);
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button variant="outlined" onClick={handleClickOpen}>
        Add recipes
      </Button>
      <Dialog open={open} onClose={handleClose} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description">
        <DialogTitle id="alert-dialog-title">{"Use Google's location service?"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">{date.toString()}</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Disagree</Button>
          <Button onClick={handleClose} autoFocus>
            Agree
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

function Helper(arg, createElement) {
  console.log('--------helper', arg.event.extendedProps);

  if (arg.event.extendedProps.even) {
    return <div>pro</div>;
  } else {
    return (
      <div>
        <RenderEventContent date={arg.event.extendedProps.date} />
      </div>
    );
  }
}

export default function DemoApp() {
  const [datesToShow, setDatesToShow] = useState<{ title: string; date: Date; extendedProps: { even: boolean; date: Date } }[]>(
    [],
  );

  function handleEventClick(arg: any) {
    // bind with an arrow function
    // alert(arg.dateStr);
    console.log('---------event clicked', arg);
    // console.log('---------event clicked data', arg.view.getCurrentData());
  }

  function handleDateClick(arg) {
    // bind with an arrow function
    console.log('---------date clicked', arg);

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
  return (
    <div>
      {/* <RenderEventContent /> */}
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        eventClick={handleEventClick}
        dateClick={handleDateClick}
        events={datesToShow}
        datesSet={fullMonthWithDates}
        eventContent={Helper}
      />
    </div>
  );
}
