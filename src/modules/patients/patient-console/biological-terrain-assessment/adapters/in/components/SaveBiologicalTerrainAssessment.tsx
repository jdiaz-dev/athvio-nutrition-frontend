import React, { useContext } from 'react';
import { Alert, Button, Stack } from '@mui/material';
import { useSelector } from 'react-redux';
import { useBiologicalTerrainAssessmentActions } from 'src/modules/patients/patient-console/biological-terrain-assessment/adapters/out/BiologicalterrainAssessmentActions';
import { SaveBiologicalTerrainAssessmentInput } from 'src/modules/patients/patient-console/biological-terrain-assessment/adapters/out/BiologicalterrainAssessment';
import { ReduxStates } from 'src/shared/types/types';
import { AuthContext } from 'src/modules/auth/auth/adapters/in/context/AuthContext';

export function SaveBiologicalTerrainAssessment() {
  const authContext = useContext(AuthContext);
  const { saveBiologicalTerrainAssessment, loading } = useBiologicalTerrainAssessmentActions();
  const assessment = useSelector((state: ReduxStates) => state.biologicalTerrainAssessment.data);
  const error = useSelector((state: ReduxStates) => state.biologicalTerrainAssessment.error);
  const biologicalTerrainAssessment = useSelector((state: ReduxStates) => state.biologicalTerrainAssessment.data);

  const handleSave = () => {
    if (!assessment) return;

    const input: SaveBiologicalTerrainAssessmentInput = {
      professional: authContext.professional,
      patient: assessment.patient,
      biologicalTerrainAssessment: biologicalTerrainAssessment?.uuid as string,
      generalObservations: assessment.generalObservations.map((observation) => ({
        generalObservation: observation.uuid,
        value: observation.value,
      })),
      functionalScreeningScores: assessment.functionalScreeningQuestions.map((question) => ({
        functionalScreening: question.uuid,
        score: 2,// question.score,
        note: question.note,
      })),
    };

    saveBiologicalTerrainAssessment(input);
  };

  return (
    <Stack spacing={1} alignItems="flex-start">
      {error && <Alert severity="error">{error}</Alert>}
      <Button variant="contained" onClick={handleSave} disabled={!assessment || loading}>
        GUARDAR
      </Button>
    </Stack>
  );
}

export default SaveBiologicalTerrainAssessment;
