import React from 'react';
import PatientPlansCalendar from './PatientPlansCalendar';
import { Box } from '@mui/material';

function PatientPlansContainer() {
  return (
    <Box
      sx={{
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        flexGrow: 1,
      }}
    >
      <PatientPlansCalendar />
    </Box>
  );
}

export default PatientPlansContainer;
