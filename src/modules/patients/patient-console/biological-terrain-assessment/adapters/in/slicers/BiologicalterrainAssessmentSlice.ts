import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { biologicalTerrainAssessmentInitialState } from 'src/modules/patients/patient-console/biological-terrain-assessment/adapters/in/slicers/BiologicalterrainAssessmentInitialState';
import {
  BiologicalTerrainAssessment,
  FunctionalScreeningScore,
} from 'src/modules/patients/patient-console/biological-terrain-assessment/adapters/out/BiologicalterrainAssessment';

const biologicalTerrainAssessmentSlice = createSlice({
  name: 'biologicalTerrainAssessment',
  initialState: biologicalTerrainAssessmentInitialState,
  reducers: {
    setLoading(state, action: PayloadAction<boolean>) {
      state.loading = action.payload;
    },
    setSaving(state, action: PayloadAction<boolean>) {
      state.saving = action.payload;
    },
    setError(state, action: PayloadAction<string>) {
      state.error = action.payload;
      state.loading = false;
      state.saving = false;
    },
    setAssessment(state, action: PayloadAction<BiologicalTerrainAssessment>) {
      state.data = action.payload;
      state.loading = false;
      state.saving = false;
      state.error = null;
    },
    setObservationValue(state, action: PayloadAction<{ id: string; value: string }>) {
      const observation = state.data?.generalObservations.find((item) => item.uuid === action.payload.id);
      if (observation) observation.value = action.payload.value;
    },
    setFunctionalScreeningScore(state, action: PayloadAction<{ id: string; score: FunctionalScreeningScore }>) {
      if (!state.data) return;
      const question = state.data.functionalScreeningQuestions.find((item) => item.uuid === action.payload.id);
      if (question) question.score = action.payload.score;
      state.data.totalScore = state.data.functionalScreeningQuestions.reduce((sum, item) => sum + (item.score ?? 0), 0);
    },
    setFunctionalScreeningNote(state, action: PayloadAction<{ id: string; note: string }>) {
      const question = state.data?.functionalScreeningQuestions.find((item) => item.uuid === action.payload.id);
      if (question) question.note = action.payload.note;
    },
  },
});

export const {
  setLoading,
  setSaving,
  setError,
  setAssessment,
  setObservationValue,
  setFunctionalScreeningScore,
  setFunctionalScreeningNote,
} = biologicalTerrainAssessmentSlice.actions;

export default biologicalTerrainAssessmentSlice.reducer;
