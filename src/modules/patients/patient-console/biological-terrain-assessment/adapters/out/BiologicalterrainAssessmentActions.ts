import { useCallback } from 'react';
import { useLazyQuery, useMutation } from '@apollo/client';
// Adjust to wherever your app's typed Redux hooks live.
import { GET_BIOLOGICAL_TERRAIN_ASSESSMENT, SAVE_BIOLOGICAL_TERRAIN_ASSESSMENT } from './BiologicalterrainAssessmentQueries';
import {
  BiologicalTerrainAssessment,
  GetBiologicalTerrainAssesmentDto,
  SaveBiologicalTerrainAssessmentInput,
} from './BiologicalterrainAssessment';
import {
  setAssessment,
  setError,
  setLoading,
  setSaving,
} from 'src/modules/patients/patient-console/biological-terrain-assessment/adapters/in/slicers/BiologicalterrainAssessmentSlice';
import { useDispatch } from 'react-redux';

export function useBiologicalTerrainAssessmentActions() {
  const dispatch = useDispatch();

  const [fetchAssessment, { loading: fetching }] = useLazyQuery<
    { getBiologicalTerrainAssessment: BiologicalTerrainAssessment },
    { input: GetBiologicalTerrainAssesmentDto }
  >(GET_BIOLOGICAL_TERRAIN_ASSESSMENT, {
    fetchPolicy: 'network-only',
    onCompleted: (data) => dispatch(setAssessment(data.getBiologicalTerrainAssessment)),
    onError: (error) => dispatch(setError(error.message)),
  });

  const [saveAssessment, { loading: saving }] = useMutation<{
    saveBiologicalTerrainAssessment: BiologicalTerrainAssessment;
  }>(SAVE_BIOLOGICAL_TERRAIN_ASSESSMENT, {
    onCompleted: (data) => dispatch(setAssessment(data.saveBiologicalTerrainAssessment)),
    onError: (error) => dispatch(setError(error.message)),
  });

  const getBiologicalTerrainAssessment = useCallback(
    (patient: string) => {
      dispatch(setLoading(true));
      return fetchAssessment({ variables: { input: { patient } } });
    },
    [dispatch, fetchAssessment],
  );

  const saveBiologicalTerrainAssessment = useCallback(
    (input: SaveBiologicalTerrainAssessmentInput) => {
      dispatch(setSaving(true));
      return saveAssessment({ variables: { input } });
    },
    [dispatch, saveAssessment],
  );

  return {
    getBiologicalTerrainAssessment,
    saveBiologicalTerrainAssessment,
    loading: fetching || saving,
  };
}
