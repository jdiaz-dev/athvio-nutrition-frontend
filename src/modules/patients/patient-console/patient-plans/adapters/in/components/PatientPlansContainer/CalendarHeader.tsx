import React from 'react';
import { AutoFixHigh, ChevronLeft, ChevronRight } from '@mui/icons-material';
import { Box, Button, IconButton } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import dayjs from 'dayjs';
import { DateSet } from 'src/modules/patients/patient-console/patient-plans/adapters/helpers/PatientPlans';

function CalendarHeader({
  dateSet,
  handleCalendarPrev,
  handleCalendarNext,
}: {
  dateSet: DateSet | null;
  handleCalendarPrev: () => void;
  handleCalendarNext: () => void;
}) {
  const theme = useTheme();

  return (
    <Box bgcolor={theme.palette.background.paper} borderColor={"red"} display="flex" justifyContent="space-between" alignItems="center" pt={1.2} pb={1.2} pr={2}>
      <Box display="flex" alignItems="center">
        <IconButton onClick={handleCalendarPrev}>
          <ChevronLeft />
        </IconButton>
        <Box fontSize="1.5rem" fontWeight="bold" mx={1}>
          {dateSet ? dayjs(dateSet.dateStart).format('MMMM YYYY') : 'Calendar'}
        </Box>
        <IconButton onClick={handleCalendarNext}>
          <ChevronRight />
        </IconButton>
      </Box>

      <Box display="flex" gap={1}>
        <Button variant="contained" startIcon={<AutoFixHigh />}>
          Auto-generate plan
        </Button>
      </Box>
    </Box>
  );
}

export default CalendarHeader;
