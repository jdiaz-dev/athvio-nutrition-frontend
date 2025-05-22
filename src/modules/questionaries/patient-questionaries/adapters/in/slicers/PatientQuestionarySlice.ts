import { combineReducers, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { patientQuestionaryInitialState } from 'src/modules/questionaries/patient-questionaries/adapters/in/slicers/PatientQuestionaryInitialState';
import {
  PatientQuestionaryBody,
  QuestionaryDetailAdditionalNote,
} from 'src/modules/questionaries/patient-questionaries/adapters/out/PatientQuestionary';
import { customQuestionaryDetailSlice } from 'src/modules/questionaries/professional-questionaries/adapters/in/slicers/CustomQuestionaryDetailsSlice';
import { professionalQuestionaryInitialState } from 'src/modules/questionaries/professional-questionaries/adapters/in/slicers/ProfessionalQuestionaryInitialState';
import {
  IsEnabledQuestionaryDetails,
  ProfessionalQuestionaryBody,
  QuestionaryDetail,
} from 'src/modules/questionaries/professional-questionaries/adapters/out/ProfessionalQuestionary';
import { ReduxStates } from 'src/shared/types/types';

const professionalQuestionarySlice = createSlice({
  name: 'professionalQuestionary',
  initialState: professionalQuestionaryInitialState.professionalQuestionary,
  reducers: {
    initializeProfessionalQuestionary: (state, action: PayloadAction<ProfessionalQuestionaryBody>) => {
      state = action.payload;
      return state;
    },
  },
});
export const { initializeProfessionalQuestionary } = professionalQuestionarySlice.actions;

const questionaryDetailsSlice = createSlice({
  name: 'questionaryDetails',
  initialState: professionalQuestionaryInitialState.questionaryDetails,
  reducers: {
    initializeQuestionaryDetails: (state, action: PayloadAction<QuestionaryDetail[]>) => {
      state = action.payload;
      return state;
    },
    updateIsEnabledQuestionaryDetail: (state, action: PayloadAction<IsEnabledQuestionaryDetails>) => {
      const { questionaryDetail, isEnabled } = action.payload;
      state = state.map((item) => (item._id === questionaryDetail ? { ...item, isEnabled } : item));
      return state;
    },

    /* addCustomQuestionaryDetail(state, action: PayloadAction<AddCustomQuestionaryDetailInput>) {
      state.push({ ...action.payload, isEnabled: true });
      return state;
    }, */
  },
});
export const { initializeQuestionaryDetails, updateIsEnabledQuestionaryDetail } = questionaryDetailsSlice.actions;

const patientQuestionarySlice = createSlice({
  name: 'patientQuestionary',
  initialState: patientQuestionaryInitialState.patientQuestionary,
  reducers: {
    initializePatientQuestionary: (state, action: PayloadAction<PatientQuestionaryBody>) => {
      state = action.payload;
      return state;
    },
    updatePatientQuestionaryDetail: (state, action: PayloadAction<QuestionaryDetailAdditionalNote>) => {
      const { patientQuestionaryGroup, patientQuestionaryDetail, additionalNotes } = action.payload;
      const itemFound = state.questionaryGroups.find((group) => group._id === patientQuestionaryGroup);

      if (itemFound) {
        state = state.filter((item) => item.questionaryDetail !== itemFound.questionaryDetail);
      } else {
        state.push(action.payload);
      }
      return state;
    },
    resetIsEnabledQuestionaryDetails: (state) => {
      state = professionalQuestionaryInitialState.isEnabledQuestionaryDetails;
      return state;
    },
  },
});

export const { initializePatientQuestionary, updatePatientQuestionaryDetail, resetIsEnabledQuestionaryDetails } =
  patientQuestionarySlice.actions;

export default combineReducers({
  professionalQuestionary: professionalQuestionarySlice.reducer,
  questionaryDetails: questionaryDetailsSlice.reducer,
  isEnabledQuestionaryDetails: patientQuestionarySlice.reducer,
  customQuestionaryDetails: customQuestionaryDetailSlice.reducer,
});
