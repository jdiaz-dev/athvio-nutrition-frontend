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
    initializePlanification: (state, action: PayloadAction<PlanificationBody | null>) => {
      state = action.payload;
      return state;
    },

    modifyWeight: (state, action: PayloadAction<number>) => {
      if (state !== null) state.patientInformation.weight = action.payload;
      return state;
    },
    modifyHeight: (state, action: PayloadAction<number>) => {
      if (state !== null) state.patientInformation.height = action.payload;
      return state;
    },
    modifyAge: (state, action: PayloadAction<number>) => {
      if (state !== null) state.patientInformation.age = action.payload;
      return state;
    },
    modifyGender: (state, action: PayloadAction<string>) => {
      if (state !== null) state.patientInformation.gender = action.payload;
      return state;
    },
    modifyActivityFactor: (state, action: PayloadAction<Pick<PatientInformation, 'physicActivityFactor' | 'physicActivityName'>>) => {
      if (state !== null) {
        state.patientInformation.physicActivityFactor = action.payload.physicActivityFactor;
        state.patientInformation.physicActivityName = action.payload.physicActivityName;
      }
      return state;
    },
    modifyBasalEnergyRate: (state, action: PayloadAction<number>) => {
      if (state !== null) state.configuredMacros.basalEnergyRate = action.payload;
      return state;
    },
    modifyTotalCalories: (state, action: PayloadAction<number>) => {
      if (state !== null) state.configuredMacros.totalCalories = action.payload;
      return state;
    },
    modifyPlanCalories: (state, action: PayloadAction<number>) => {
      if (state !== null) state.configuredMacros.planCalories = action.payload;
      return state;
    },
    modifyCalculatedMacros: (
      state,
      action: PayloadAction<Omit<CalculatedMacros, 'basalEnergyRate' | 'totalCalories' | 'planCalories'>>,
    ) => {
      if (state !== null) state.configuredMacros = { ...state.configuredMacros, ...action.payload };
      return state;
    },
    resetPlanificationTo3000cal: (state) => {
      state = planificationInitialState.planification;
      if (state) state = { ...state, configuredMacros: { ...state.configuredMacros, planCalories: 3000 } };
      return state;
    },
    resetPlanificationTo0cal: (state) => {
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
  resetPlanificationTo3000cal,
  resetPlanificationTo0cal,
} = planificationSlice.actions;

export default combineReducers({
  planifications: planificationsSlice.reducer,
  planification: planificationSlice.reducer,
});
