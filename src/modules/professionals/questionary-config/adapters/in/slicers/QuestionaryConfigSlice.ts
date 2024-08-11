import { combineReducers, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { questionaryConfigInitialState } from 'src/modules/professionals/questionary-config/adapters/in/slicers/QuestionaryConfigInitialState';
import {
  EnableQuestionaryDetails,
  QuestionaryConfigBody,
  QuestionaryDetail,
} from 'src/modules/professionals/questionary-config/adapters/out/QuestionaryConfig';

const questionaryConfigSlice = createSlice({
  name: 'questionaryConfig',
  initialState: questionaryConfigInitialState.questionaryConfig,
  reducers: {
    initializeNewQuestionaryConfig: (state, action: PayloadAction<QuestionaryConfigBody>) => {
      state = action.payload;
      return state;
    },
  },
});
export const { initializeNewQuestionaryConfig } = questionaryConfigSlice.actions;

const questionaryDetailsSlice = createSlice({
  name: 'enableQuestionaryDetail',
  initialState: questionaryConfigInitialState.questionaryDetails,
  reducers: {
    initializeQuestionaryDetails: (state, action: PayloadAction<QuestionaryDetail[]>) => {
      state = action.payload;
      return state;
    },
    manageEnabledInQuestionaryDetail: (state, action: PayloadAction<EnableQuestionaryDetails>) => {
      // state.enabled = action.payload.enabled;
      return state;
    },
  },
});


const enableQuestionaryDetailsSlice = createSlice({
  name: 'enableQuestionaryDetail',
  initialState: questionaryConfigInitialState.enableQuestionaryDetails,
  reducers: {
    initializeNewEnabledQuestionaryDetail: (state, action: PayloadAction<EnableQuestionaryDetails[]>) => {
      state = action.payload;
      return state;
    },
    updateEnabledQuestionaryDetail: (state, action: PayloadAction<EnableQuestionaryDetails>) => {
      // state.enabled = action.payload.enabled;
      return state;
    },
    resetQuestionaryDetail: (state) => {
      state = questionaryConfigInitialState.enableQuestionaryDetails;
      return state;
    },
  },
});

export const { initializeNewEnabledQuestionaryDetail, updateEnabledQuestionaryDetail, resetQuestionaryDetail } =
  enableQuestionaryDetailsSlice.actions;

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
  enableQuestionaryDetails: enableQuestionaryDetailsSlice.reducer,
  otherQuestionaryDetail: otherQuestionaryDetailSlice.reducer,
});
