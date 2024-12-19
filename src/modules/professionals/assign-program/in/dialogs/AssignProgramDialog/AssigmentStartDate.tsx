import React from 'react';
import { Dayjs } from 'dayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { useDispatch } from 'react-redux';
import * as AssignProgramSlice from 'src/modules/professionals/assign-program/in/slicers/AssignProgramSlice';

function AssigmentStartDate() {
  const dispatch = useDispatch();

  return (
    <div style={{ marginBottom: '15px' }}>
      <text style={{ fontWeight: 'bold' }}>Assigment start day</text>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DemoContainer components={['DatePicker']}>
          <DatePicker onChange={(newDate) => dispatch(AssignProgramSlice.assignStartDate(newDate as Dayjs))} />
        </DemoContainer>
      </LocalizationProvider>
    </div>
  );
}

export default AssigmentStartDate;
