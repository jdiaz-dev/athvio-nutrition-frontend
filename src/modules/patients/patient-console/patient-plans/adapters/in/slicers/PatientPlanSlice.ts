import { combineReducers, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { patientPlanInitialState } from 'src/modules/patients/patient-console/patient-plans/adapters/in/slicers/PatientPlanInitialState';
import { mealBasicInfoSlice } from 'src/modules/patients/patient-console/patient-plans/adapters/in/slicers/MealBasicInfoSlice';
import { mealDetailsSlice } from 'src/modules/patients/patient-console/patient-plans/adapters/in/slicers/MealDetailsSlice';
import { PatientPlanBody } from 'src/modules/patients/patient-console/patient-plans/adapters/out/patientPlan.types';
import { mealListSlice } from 'src/modules/patients/patient-console/patient-plans/adapters/in/slicers/MealsListSlice';

const patientPlansSlice = createSlice({
  name: 'patientPlans',
  initialState: patientPlanInitialState.patientPlans,
  reducers: {
    acceptNewPatientPlans: (state, action: PayloadAction<PatientPlanBody[]>) => {
      state = action.payload;
      return state;
    },
    modififyingSpecificPatientPlan: (state, action: PayloadAction<PatientPlanBody>) => {
      const patientPlanIndex = state.findIndex((item) => (item._id = action.payload._id));
      state[patientPlanIndex] = action.payload;
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
    duplicatingPatientPlan: (state, action: PayloadAction<Pick<PatientPlanBody, '_id'>>) => {
      const planUsinghOnlyId = {
        ...patientPlanInitialState.patientPlan, // to reset remaining values
        _id: action.payload._id,
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

export const { acceptNewPatientPlans, modififyingSpecificPatientPlan } = patientPlansSlice.actions;
export const { acceptNewPatientPlan, setNameAndDescription, duplicatingPatientPlan, resetPatientPlanItem } = patientPlanSlice.actions;

export default combineReducers({
  patientPlans: patientPlansSlice.reducer,
  patientPlan: patientPlanSlice.reducer,
  mealList: mealListSlice.reducer,
  mealDetails: mealDetailsSlice.reducer,
  mealBasicInfo: mealBasicInfoSlice.reducer,
});
