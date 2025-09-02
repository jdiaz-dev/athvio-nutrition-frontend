import { combineReducers, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { customQuestionaryDetailSlice } from 'src/modules/professionals/professional-questionaries/adapters/in/slicers/CustomQuestionaryDetailsSlice';
import { professionalQuestionaryInitialState } from 'src/modules/professionals/professional-questionaries/adapters/in/slicers/ProfessionalQuestionaryInitialState';
import {
  IsEnabledQuestionaryDetails,
  ProfessionalQuestionaryBody,
  QuestionaryDetail,
} from 'src/modules/professionals/professional-questionaries/adapters/out/ProfessionalQuestionary';

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
      state = state.map((item) => (item.uuid === questionaryDetail ? { ...item, isEnabled } : item));
      return state;
    },

    /* addCustomQuestionaryDetail(state, action: PayloadAction<AddCustomQuestionaryDetailInput>) {
      state.push({ ...action.payload, isEnabled: true });
      return state;
    }, */
  },
});
export const { initializeQuestionaryDetails, updateIsEnabledQuestionaryDetail } = questionaryDetailsSlice.actions;

const isEnabledQuestionaryDetailsSlice = createSlice({
  name: 'enableQuestionaryDetail',
  initialState: professionalQuestionaryInitialState.isEnabledQuestionaryDetails,
  reducers: {
    initializeNewEnabledQuestionaryDetail: (state, action: PayloadAction<IsEnabledQuestionaryDetails[]>) => {
      state = action.payload;
      return state;
    },
    manageIsEnabledQuestionaryDetails: (state, action: PayloadAction<IsEnabledQuestionaryDetails>) => {
      const itemFound = state.find((item) => item.questionaryDetail === action.payload.questionaryDetail);

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

export const { initializeNewEnabledQuestionaryDetail, manageIsEnabledQuestionaryDetails, resetIsEnabledQuestionaryDetails } =
  isEnabledQuestionaryDetailsSlice.actions;

export default combineReducers({
  professionalQuestionary: professionalQuestionarySlice.reducer,
  questionaryDetails: questionaryDetailsSlice.reducer,
  isEnabledQuestionaryDetails: isEnabledQuestionaryDetailsSlice.reducer,
  customQuestionaryDetails: customQuestionaryDetailSlice.reducer,
});
