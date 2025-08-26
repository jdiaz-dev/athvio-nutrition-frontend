import { combineReducers, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { planificationInitialState } from 'src/modules/patients/patient-console/planifications/adapters/in/slicers/PlanificationInitialState';
import { PlanificationBody } from 'src/modules/patients/patient-console/planifications/helpers/planifications';

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

export default combineReducers({
  planifications: planificationsSlice.reducer,
});
