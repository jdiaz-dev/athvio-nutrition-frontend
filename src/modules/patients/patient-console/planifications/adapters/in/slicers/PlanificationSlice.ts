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

    modifyWeight: (state, action: PayloadAction<number>) => {
      state.patientInformation.weight = action.payload;
      return state;
    },
    modifyHeight: (state, action: PayloadAction<number>) => {
      state.patientInformation.height = action.payload;
      return state;
    },
    modifyAge: (state, action: PayloadAction<number>) => {
      state.patientInformation.age = action.payload;
      return state;
    },
    modifyGender: (state, action: PayloadAction<string>) => {
      state.patientInformation.gender = action.payload;
      return state;
    },
    modifyActivityFactor: (state, action: PayloadAction<Pick<PatientInformation, 'physicActivityFactor' | 'physicActivityName'>>) => {
      state.patientInformation.physicActivityFactor = action.payload.physicActivityFactor;
      state.patientInformation.physicActivityName = action.payload.physicActivityName;
      return state;
    },
    modifyBasalEnergyRate: (state, action: PayloadAction<number>) => {
      state.configuredMacros.basalEnergyRate = action.payload;
      return state;
    },
    modifyTotalCalories: (state, action: PayloadAction<number>) => {
      state.configuredMacros.totalCalories = action.payload;
      return state;
    },
    modifyPlanCalories: (state, action: PayloadAction<number>) => {
      state.configuredMacros.planCalories = action.payload;
      return state;
    },
    modifyCalculatedMacros: (
      state,
      action: PayloadAction<Omit<CalculatedMacros, 'basalEnergyRate' | 'totalCalories' | 'planCalories'>>,
    ) => {
      state.configuredMacros = { ...state.configuredMacros, ...action.payload };
      return state;
    },
    resetPlanification: (state) => {
      state = planificationInitialState.planification;
      return state;
    },
  },
});
export const {
  initializePlanification,
  modifyCalculatedMacros,
  modifyWeight,
  modifyHeight,
  modifyAge,
  modifyGender,
  modifyActivityFactor,
  modifyBasalEnergyRate,
  modifyPlanCalories,
  modifyTotalCalories,
  resetPlanification,
} = planificationSlice.actions;

export default combineReducers({
  planifications: planificationsSlice.reducer,
  planification: planificationSlice.reducer,
});
