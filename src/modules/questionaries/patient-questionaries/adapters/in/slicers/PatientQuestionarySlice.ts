import { combineReducers, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { patientQuestionaryInitialState } from 'src/modules/questionaries/patient-questionaries/adapters/in/slicers/PatientQuestionaryInitialState';
import {
  PatientQuestionaryDetail,
  PatientQuestionaryGroup,
} from 'src/modules/questionaries/patient-questionaries/adapters/out/PatientQuestionary';

const patientQuestionaryGroupsSlice = createSlice({
  name: 'patientQuestionaryGroups',
  initialState: patientQuestionaryInitialState.patientQuestionaryGroups,
  reducers: {
    initializePatientQuestionaryGroups: (state, action: PayloadAction<PatientQuestionaryGroup[]>) => {
      state = action.payload;
      return state;
    },
    updateQuestionaryGroupItem: (state, action: PayloadAction<Pick<PatientQuestionaryGroup, '_id' | 'questionaryDetails'>>) => {
      const { _id, questionaryDetails } = action.payload;
      const indexFound = state.findIndex((item) => item._id === _id);
      if (indexFound !== -1) {
        state[indexFound].questionaryDetails = questionaryDetails;
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
    updateAnswer: (state, action: PayloadAction<Pick<PatientQuestionaryDetail, '_id' | 'answer'>>) => {
      const { _id, answer } = action.payload;
      const indexFound = state.findIndex((group) => group._id === _id);

      if (indexFound !== -1) {
        state[indexFound].answer = answer;
      }
      return state;
    },
    updateAdditionalNotes: (state, action: PayloadAction<Pick<PatientQuestionaryDetail, '_id' | 'additionalNotes'>>) => {
      const { _id, additionalNotes } = action.payload;
      const indexFound = state.findIndex((group) => group._id === _id);

      if (indexFound !== -1) {
        state[indexFound].additionalNotes = additionalNotes;
      }
      return state;
    },
  },
});

export const { initializePatientQuestionaryDetails, updateAnswer, updateAdditionalNotes } = patientQuestionaryDetailsSlice.actions;

export default combineReducers({
  patientQuestionaryGroups: patientQuestionaryGroupsSlice.reducer,
  patientQuestionaryDetails: patientQuestionaryDetailsSlice.reducer,
});
