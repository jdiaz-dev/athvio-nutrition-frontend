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
    updateQuestionaryGroupItem: (state, action: PayloadAction<PatientQuestionaryGroup>) => {
      const { _id, ...rest } = action.payload;
      const indexFound = state.findIndex((item) => item._id === _id);
      if (indexFound !== -1) {
        state[indexFound] = { _id, ...rest };
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
    updateAnswerAndAdditionalNotes: (
      state,
      action: PayloadAction<Pick<PatientQuestionaryDetail, '_id' | 'answer' | 'additionalNotes'>>,
    ) => {
      const { _id, answer, additionalNotes } = action.payload;
      const indexFound = state.findIndex((group) => group._id === _id);

      if (indexFound !== -1) {
        state[indexFound].answer = answer;
        state[indexFound].additionalNotes = additionalNotes;
      }
      return state;
    },
  },
});

export const { initializePatientQuestionaryDetails, updateAnswerAndAdditionalNotes } = patientQuestionaryDetailsSlice.actions;

export default combineReducers({
  patientQuestionaryGroups: patientQuestionaryGroupsSlice.reducer,
  patientQuestionaryDetails: patientQuestionaryDetailsSlice.reducer,
});
