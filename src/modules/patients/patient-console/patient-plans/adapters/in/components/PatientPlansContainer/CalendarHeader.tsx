import React, { useEffect, useState } from 'react';
import { AutoFixHigh, ChevronLeft, ChevronRight } from '@mui/icons-material';
import { Box, Button, IconButton, Chip } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import dayjs from 'dayjs';
import { DateSet } from 'src/modules/patients/patient-console/patient-plans/adapters/helpers/PatientPlans';
import PlatientPlansGeneratorDialog from 'src/modules/patients/patient-console/patient-plans/adapters/in/dialogs/PatientPlansGeneratorDialog/PlatientPlansGeneratorDialog';
import { useDispatch, useSelector } from 'react-redux';
import { ReduxStates } from 'src/shared/types/types';
import { Navigate, useParams } from 'react-router-dom';
import * as PlanificationSlice from 'src/modules/patients/patient-console/planifications/adapters/in/slicers/PlanificationSlice';

function CalendarHeader({
  dateSet,
  handleCalendarPrev,
  handleCalendarNext,
}: {
  dateSet: DateSet | null;
  handleCalendarPrev: () => void;
  handleCalendarNext: () => void;
}) {
  const dispatch = useDispatch();

  const { patientId } = useParams();
  const planificationState = useSelector((state: ReduxStates) => state.planifications.planification);
  const [goToPlanificication, setGotoPlanificication] = useState(false);

  const theme = useTheme();
  const [openDialog, setOpenDialog] = useState(false);
  if (goToPlanificication) {
    const path = `/professional/patients/${patientId}/planification`;
    return <Navigate replace to={path} />;
  }
  useEffect(() => {
    return () => {
      dispatch(PlanificationSlice.resetPlanificationTo0cal());
    };
  }, []);

  return (
    <Box
      bgcolor={theme.palette.background.paper}
      borderColor={'red'}
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      pt={1.2}
      pb={1.2}
      pr={2}
    >
      <Box display="flex" alignItems="center">
        <IconButton onClick={handleCalendarPrev}>
          <ChevronLeft />
        </IconButton>
        <Box fontSize="1.5rem" fontWeight="bold" mx={1}>
          {dateSet
            ? dayjs(dateSet.dateStart)
                .add(dayjs(dateSet.dateEnd).diff(dateSet.dateStart, 'days') / 2, 'day')
                .format('MMMM YYYY')
            : 'Calendar'}
        </Box>
        <IconButton onClick={handleCalendarNext}>
          <ChevronRight />
        </IconButton>
      </Box>
      <Box display="flex" gap={1} width="40%" justifyContent="end">
        {planificationState !== null ? (
          <Box display="flex" gap={1} alignItems="center">
            <Chip
              label={`Última planificación: ${planificationState.configuredMacros?.planCalories} cal`}
              color="warning"
              variant="outlined"
            />
          </Box>
        ) : (
          <Box display="flex" gap={1} alignItems="center">
            <Chip
              onClick={() => setGotoPlanificication(true)}
              label={`Crea una planificación antes de crear el plan`}
              color="warning"
              variant="outlined"
            />
          </Box>
        )}
        {/* <Box display="flex" gap={1}>
          <Button variant="contained" startIcon={<AutoFixHigh />} onClick={() => setOpenDialog(true)}>
            Auto-generar plan nutricional
          </Button>
        </Box> */}
      </Box>

      {openDialog && (
        <PlatientPlansGeneratorDialog openPlatientPlansGeneratorDialog={openDialog} setOpenPlatientPlansGeneratorDialog={setOpenDialog} />
      )}
    </Box>
  );
}

export default CalendarHeader;
