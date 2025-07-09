import { combineReducers, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { patientQuestionaryInitialState } from 'src/modules/questionaries/patient-questionaries/adapters/in/slicers/PatientQuestionaryInitialState';
import {
  PatientQuestionaryBody,
  PatientQuestionaryDetail,
  PatientQuestionaryGroup,
} from 'src/modules/questionaries/patient-questionaries/adapters/out/PatientQuestionary';

const patientQuestionaryGroupsSlice = createSlice({
  name: 'patientQuestionaryGroups',
  initialState: patientQuestionaryInitialState.patientQuestionary,
  reducers: {
    initializePatientQuestionaryGroups: (state, action: PayloadAction<PatientQuestionaryBody>) => {
      state = action.payload;
      return state;
    },
    updateQuestionaryGroupItem: (state, action: PayloadAction<Pick<PatientQuestionaryGroup, 'uuid' | 'questionaryDetails'>>) => {
      const { uuid, questionaryDetails } = action.payload;
      const indexFound = state.questionaryGroups.findIndex((item) => item.uuid === uuid);
      if (indexFound !== -1) {
        state.questionaryGroups[indexFound].questionaryDetails = questionaryDetails;
      }
      return state;
    },
  },
});
export const { initializePatientQuestionaryGroups, updateQuestionaryGroupItem } = patientQuestionaryGroupsSlice.actions;

const patientQuestionaryDetailsSlice = createSlice({
  name: 'patientQuestionaryDetails',
  initialState: patientQuestionaryInitialState.patientQuestionaryDetails,
  reducers: {
    initializePatientQuestionaryDetails: (state, action: PayloadAction<PatientQuestionaryDetail[]>) => {
      state = action.payload;
      return state;
    },
    updateAnswer: (state, action: PayloadAction<Pick<PatientQuestionaryDetail, 'uuid' | 'answer'>>) => {
      const { uuid, answer } = action.payload;
      const indexFound = state.findIndex((group) => group.uuid === uuid);

      if (indexFound !== -1) {
        state[indexFound].answer = answer;
      }
      return state;
    },
    updateAdditionalNotes: (state, action: PayloadAction<Pick<PatientQuestionaryDetail, 'uuid' | 'additionalNotes'>>) => {
      const { uuid, additionalNotes } = action.payload;
      const indexFound = state.findIndex((group) => group.uuid === uuid);

      if (indexFound !== -1) {
        state[indexFound].additionalNotes = additionalNotes;
      }
      return state;
    },
  },
});

export const { initializePatientQuestionaryDetails, updateAnswer, updateAdditionalNotes } = patientQuestionaryDetailsSlice.actions;

export default combineReducers({
  patientQuestionary: patientQuestionaryGroupsSlice.reducer,
  patientQuestionaryDetails: patientQuestionaryDetailsSlice.reducer,
});
