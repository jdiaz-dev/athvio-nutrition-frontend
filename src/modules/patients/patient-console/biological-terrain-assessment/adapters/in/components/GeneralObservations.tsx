import React from 'react';
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography } from '@mui/material';
// Adjust to wherever your app's typed Redux hooks live.
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { setObservationValue } from 'src/modules/patients/patient-console/biological-terrain-assessment/adapters/in/slicers/BiologicalterrainAssessmentSlice';
import { ReduxStates } from 'src/shared/types/types';
import GeneralObservationItem from 'src/modules/patients/patient-console/biological-terrain-assessment/adapters/in/components/GeneralObservationItem';

export function GeneralObservations() {
  const dispatch = useDispatch();
  const observations = useSelector((state: ReduxStates) => state.biologicalTerrainAssessment.data?.generalObservations ?? []);

  return (
    <Paper variant="outlined" sx={{ p: 2 }}>
      <Typography variant="h6" gutterBottom>
        Observación general del terreno
      </Typography>
      <TableContainer>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell sx={{ width: '40%' }}>Observación</TableCell>
              <TableCell>Hallazgo</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {observations.map((observation) => (
              <TableRow key={observation.uuid}>
                <TableCell>{observation.label}</TableCell>
                <TableCell>
                  <GeneralObservationItem observation={observation} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
}

export default GeneralObservations;
