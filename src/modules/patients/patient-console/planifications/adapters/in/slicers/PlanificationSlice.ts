import { combineReducers, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { planificationInitialState } from 'src/modules/patients/patient-console/planifications/adapters/in/slicers/PlanificationInitialState';
import {
  CalculatedMacros,
  PatientInformation,
  PlanificationBody,
} from 'src/modules/patients/patient-console/planifications/helpers/planifications';

const planificationsSlice = createSlice({
  name: 'planifications',
  initialState: planificationInitialState.planifications,
  reducers: {
    initializePlanifications: (state, action: PayloadAction<PlanificationBody[]>) => {
      state = action.payload;
      return state;
    },
    acceptNewPlanification: (state, action: PayloadAction<PlanificationBody>) => {
      if (state) state.push(action.payload);
      return state;
    },
    modifyPlanification: (state, action: PayloadAction<PlanificationBody>) => {
      if (state) {
        const indexFound = state.findIndex((item) => item.uuid === action.payload.uuid);
        state[indexFound] = action.payload;
      }
      return state;
    },
  },
});
export const { initializePlanifications, acceptNewPlanification, modifyPlanification } = planificationsSlice.actions;

const planificationSlice = createSlice({
  name: 'planification',
  initialState: planificationInitialState.planification,
  reducers: {
    initializePlanification: (state, action: PayloadAction<PlanificationBody>) => {
      state = action.payload;
      return state;
    },
    modifyPatientInformationAndCalories: (state, action: PayloadAction<PatientInformation & { calories: number }>) => {
      const { calories, ...rest } = action.payload;
      state.patientInformation = rest;
      state.configuredMacros.calories = calories;
      return state;
    },
    modifyCalculatedMacros: (state, action: PayloadAction<Omit<CalculatedMacros, 'calories'>>) => {
      state.configuredMacros = { ...state.configuredMacros, ...action.payload };
      return state;
    },
    resetPlanification: (state) => {
      state = planificationInitialState.planification;
      return state;
    },
  },
});
export const { initializePlanification, modifyPatientInformationAndCalories, modifyCalculatedMacros, resetPlanification } =
  planificationSlice.actions;

export default combineReducers({
  planifications: planificationsSlice.reducer,
  planification: planificationSlice.reducer,
});
