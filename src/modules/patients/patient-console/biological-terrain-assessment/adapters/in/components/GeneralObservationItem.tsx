import React from 'react';
import { TextField } from '@mui/material';
import { useDispatch } from 'react-redux';
import { setObservationValue } from 'src/modules/patients/patient-console/biological-terrain-assessment/adapters/in/slicers/BiologicalterrainAssessmentSlice';
import { Observation } from 'src/modules/patients/patient-console/biological-terrain-assessment/adapters/out/BiologicalterrainAssessment';

export function GeneralObservationItem({ observation }: { observation: Observation }) {
  const dispatch = useDispatch();

  return (
    <TextField
      fullWidth
      size="small"
      variant="outlined"
      value={observation.value ?? ''}
      onChange={(event) => dispatch(setObservationValue({ id: observation.uuid, value: event.target.value }))}
    />
  );
}

export default GeneralObservationItem;
