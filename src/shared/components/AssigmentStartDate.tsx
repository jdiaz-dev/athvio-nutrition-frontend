import React from 'react';
import { Dayjs } from 'dayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

function AssigmentStartDate({ datePickedHandler }: { datePickedHandler: (newDate: Dayjs | null) => void }) {
  return (
    <div style={{ marginBottom: '15px' }}>
      <text style={{ fontWeight: 'bold' }}>Assigment start day</text>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DemoContainer components={['DatePicker']}>
          <DatePicker onChange={datePickedHandler} />
        </DemoContainer>
      </LocalizationProvider>
    </div>
  );
}

export default AssigmentStartDate;
