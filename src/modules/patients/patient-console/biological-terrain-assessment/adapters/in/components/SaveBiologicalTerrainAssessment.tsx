import React, { useContext } from 'react';
import { Alert, Button, Stack } from '@mui/material';
import { useSelector } from 'react-redux';
import { useBiologicalTerrainAssessmentActions } from 'src/modules/patients/patient-console/biological-terrain-assessment/adapters/out/BiologicalterrainAssessmentActions';
import { SaveBiologicalTerrainAssessmentInput } from 'src/modules/patients/patient-console/biological-terrain-assessment/adapters/out/BiologicalterrainAssessment';
import { ReduxStates } from 'src/shared/types/types';
import { AuthContext } from 'src/modules/auth/auth/adapters/in/context/AuthContext';
import { SnackbarProps } from 'src/shared/types/snackbar';
import { openSnackbar } from 'src/shared/components/Snackbar/snackbar';

export function SaveBiologicalTerrainAssessment() {
  const authContext = useContext(AuthContext);
  const { saveBiologicalTerrainAssessment, loading } = useBiologicalTerrainAssessmentActions();
  const assessment = useSelector((state: ReduxStates) => state.biologicalTerrainAssessment.data);
  const error = useSelector((state: ReduxStates) => state.biologicalTerrainAssessment.error);
  const biologicalTerrainAssessment = useSelector((state: ReduxStates) => state.biologicalTerrainAssessment.data);

  const handleSave = async () => {
    if (!assessment) return;

    const input: SaveBiologicalTerrainAssessmentInput = {
      professional: authContext.professional,
      patient: assessment.patient,
      totalScore: assessment.totalScore,
      biologicalTerrainAssessment: biologicalTerrainAssessment?.uuid as string,
      generalObservations: assessment.generalObservations.map((observation) => ({
        generalObservation: observation.uuid,
        value: observation.value,
      })),
      functionalScreeningScores: assessment.functionalScreeningQuestions.map((question) => ({
        functionalScreening: question.uuid,
        score: question.score,
        note: question.note,
      })),
    };

    const res = await saveBiologicalTerrainAssessment(input);
    if (res.data) {
      openSnackbar({
        open: true,
        message: 'La evaluación del terreno biológico fue salvada correctamente.',
        variant: 'alert',
        alert: {
          color: 'success',
        },
      } as SnackbarProps);
    } else {
      openSnackbar({
        open: true,
        message: 'Hubo un error guardando la información.',
        variant: 'alert',
        alert: {
          color: 'error',
        },
      } as SnackbarProps);
    }
  };

  return (
    <Stack spacing={1} alignItems="flex-end" marginBottom={1}>
      {error && <Alert severity="error">{error}</Alert>}
      <Button variant="contained" onClick={handleSave} disabled={!assessment || loading}>
        GUARDAR
      </Button>
    </Stack>
  );
}

export default SaveBiologicalTerrainAssessment;
