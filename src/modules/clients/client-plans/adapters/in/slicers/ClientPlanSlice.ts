import { combineReducers, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { clientPlanInitialState } from 'src/modules/clients/client-plans/adapters/in/slicers/ClientPlanInitialState';
import { ClientPlanBody, ClientPlans } from 'src/modules/clients/client-plans/adapters/out/clientPlan.types';
import { mealBasicInfoSlice } from 'src/modules/professionals/programs/adapters/in/slicers/MealBasicInfoSlice';
import { mealDetailsSlice } from 'src/modules/professionals/programs/adapters/in/slicers/MealDetailsSlice';

const clientPlansSlice = createSlice({
  name: 'clientPlans',
  initialState: clientPlanInitialState.clientPlans,
  reducers: {
    acceptNewClientPlans: (state, action: PayloadAction<ClientPlans>) => {
      state = action.payload;
      return state;
    },
  },
});

const clientPlanSlice = createSlice({
  name: 'clientPlan',
  initialState: clientPlanInitialState.clientPlan,
  reducers: {
    acceptNewClientPlan: (state, action: PayloadAction<ClientPlanBody>) => {
      state = action.payload;
      return state;
    },
    setNameAndDescription: (state, action: PayloadAction<Pick<ClientPlanBody, 'title'>>) => {
      state.title = action.payload.title;
      return state;
    },
    resetClientPlanItem: (state) => {
      state = clientPlanInitialState.clientPlan;
      return state;
    },
  },
});

export const { acceptNewClientPlans } = clientPlansSlice.actions;
export const { acceptNewClientPlan, setNameAndDescription, resetClientPlanItem } = clientPlanSlice.actions;

export default combineReducers({
  clientPlans: clientPlansSlice.reducer,
  clientPlan: clientPlanSlice.reducer,
  mealDetails: mealDetailsSlice.reducer,
  mealBasicInfo: mealBasicInfoSlice.reducer,
});
