import { combineReducers, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { questionaryConfigInitialState } from 'src/modules/professionals/questionary-config/adapters/in/slicers/QuestionaryConfigInitialState';
import {
  IsEnabledQuestionaryDetails,
  QuestionaryConfigBody,
  QuestionaryDetail,
} from 'src/modules/professionals/questionary-config/adapters/out/QuestionaryConfig';

const questionaryConfigSlice = createSlice({
  name: 'questionaryConfig',
  initialState: questionaryConfigInitialState.questionaryConfig,
  reducers: {
    initializeQuestionaryConfig: (state, action: PayloadAction<QuestionaryConfigBody>) => {
      state = action.payload;
      return state;
    },
  },
});
export const { initializeQuestionaryConfig } = questionaryConfigSlice.actions;

const questionaryDetailsSlice = createSlice({
  name: 'questionaryDetails',
  initialState: questionaryConfigInitialState.questionaryDetails,
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
  },
});
export const { initializeQuestionaryDetails, updateIsEnabledQuestionaryDetail } = questionaryDetailsSlice.actions;

const isEnabledQuestionaryDetailsSlice = createSlice({
  name: 'enableQuestionaryDetail',
  initialState: questionaryConfigInitialState.isEnabledQuestionaryDetails,
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
      state = questionaryConfigInitialState.isEnabledQuestionaryDetails;
      return state;
    },
  },
});

export const { initializeNewEnabledQuestionaryDetail, manageIsEnabledQuestionaryDetails, resetIsEnabledQuestionaryDetails } =
  isEnabledQuestionaryDetailsSlice.actions;

const otherQuestionaryDetailSlice = createSlice({
  name: 'otherQuestionaryDetail',
  initialState: questionaryConfigInitialState.otherQuestionaryDetail,
  reducers: {
    initializeOtherQuestionaryDetail: (state, action: PayloadAction<QuestionaryDetail>) => {
      state = action.payload;
      return state;
    },
    updateOtherQuestionaryDetail: (state, action: PayloadAction<QuestionaryDetail>) => {
      state = action.payload;
      return state;
    },
    resetOtherQuestionaryDetail: (state) => {
      state = questionaryConfigInitialState.otherQuestionaryDetail;
      return state;
    },
  },
});

export const { initializeOtherQuestionaryDetail, updateOtherQuestionaryDetail, resetOtherQuestionaryDetail } =
  otherQuestionaryDetailSlice.actions;

export default combineReducers({
  questionaryConfig: questionaryConfigSlice.reducer,
  questionaryDetails: questionaryDetailsSlice.reducer,
  isEnabledQuestionaryDetails: isEnabledQuestionaryDetailsSlice.reducer,
  otherQuestionaryDetail: otherQuestionaryDetailSlice.reducer,
});