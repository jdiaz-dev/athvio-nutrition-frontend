import { combineReducers, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { patientPlanInitialState } from 'src/modules/patients/patient-console/patient-plans/adapters/in/slicers/PatientPlanInitialState';
import { patientPlanMealBasicInfoSlice } from 'src/modules/patients/patient-console/patient-plans/adapters/in/slicers/MealBasicInfoSlice';
import { patientPlanMealDetailsSlice } from 'src/modules/patients/patient-console/patient-plans/adapters/in/slicers/MealDetailsSlice';
import { PatientPlanBody } from 'src/modules/patients/patient-console/patient-plans/adapters/out/patientPlan.types';
import { mealListSlice } from 'src/modules/patients/patient-console/patient-plans/adapters/in/slicers/MealsListSlice';

const patientPlansSlice = createSlice({
  name: 'patientPlans',
  initialState: patientPlanInitialState.patientPlans,
  reducers: {
    initializeNewPatientPlans: (state, action: PayloadAction<PatientPlanBody[]>) => {
      state = action.payload;
      return state;
    },
    resetPatientPlans: (state) => {
      state = patientPlanInitialState.patientPlans;
      return state;
    },
    modififyingSpecificPatientPlan: (state, action: PayloadAction<PatientPlanBody>) => {
      const patientPlanIndex = state.findIndex((item) => item.uuid === action.payload.uuid);
      if (patientPlanIndex !== -1) state[patientPlanIndex] = action.payload;
      return state;
    },
    addNewPatientPlan: (state, action: PayloadAction<PatientPlanBody>) => {
      state.push(action.payload);

      if (state.length > 0) {
        state.sort((a, b) => new Date(b.assignedDate).getTime() - new Date(a.assignedDate).getTime());
      }
      return state;
    },
    addManyNewPatientPlans: (state, action: PayloadAction<PatientPlanBody[]>) => {
      state = state.concat(action.payload);

      if (state.length > 0) {
        state.sort((a, b) => new Date(b.assignedDate).getTime() - new Date(a.assignedDate).getTime());
      }
      return state;
    },
    removePatientPlan: (state, action: PayloadAction<PatientPlanBody>) => {
      state = state.filter((item) => item.uuid !== action.payload.uuid);
      return state;
    },
  },
});

const patientPlanSlice = createSlice({
  name: 'patientPlan',
  initialState: patientPlanInitialState.patientPlan,
  reducers: {
    acceptNewPatientPlan: (state, action: PayloadAction<PatientPlanBody>) => {
      state = action.payload;
      return state;
    },
    setNameAndDescription: (state, action: PayloadAction<Pick<PatientPlanBody, 'title'>>) => {
      state.title = action.payload.title;
      return state;
    },
    duplicatingPatientPlan: (state, action: PayloadAction<Pick<PatientPlanBody, 'uuid'>>) => {
      const planUsinghOnlyId = {
        ...patientPlanInitialState.patientPlan, // to reset remaining values
        uuid: action.payload.uuid,
      };

      state = planUsinghOnlyId;
      return state;
    },
    resetPatientPlanItem: (state) => {
      state = patientPlanInitialState.patientPlan;
      return state;
    },
  },
});

export const {
  initializeNewPatientPlans,
  resetPatientPlans,
  modififyingSpecificPatientPlan,
  addNewPatientPlan,
  addManyNewPatientPlans,
  removePatientPlan,
} = patientPlansSlice.actions;
export const { acceptNewPatientPlan, setNameAndDescription, duplicatingPatientPlan, resetPatientPlanItem } = patientPlanSlice.actions;

export default combineReducers({
  patientPlans: patientPlansSlice.reducer,
  patientPlan: patientPlanSlice.reducer,
  mealList: mealListSlice.reducer,
  mealDetails: patientPlanMealDetailsSlice.reducer,
  mealBasicInfo: patientPlanMealBasicInfoSlice.reducer,
});
