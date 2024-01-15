import { combineReducers, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { clientPlanInitialState } from 'src/modules/clients/client-plans/adapters/in/slicers/ClientPlanInitialState';
import { mealBasicInfoSlice } from 'src/modules/clients/client-plans/adapters/in/slicers/MealBasicInfoSlice';
import { mealDetailsSlice } from 'src/modules/clients/client-plans/adapters/in/slicers/MealDetailsSlice';
import { ClientPlanBody } from 'src/modules/clients/client-plans/adapters/out/clientPlan.types';

const clientPlansSlice = createSlice({
  name: 'clientPlans',
  initialState: clientPlanInitialState.clientPlans,
  reducers: {
    acceptNewClientPlans: (state, action: PayloadAction<ClientPlanBody[]>) => {
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
    duplicatingClientPlan: (state, action: PayloadAction<Pick<ClientPlanBody, '_id'>>) => {
      const planUsinghOnlyId = {
        ...clientPlanInitialState.clientPlan, // to reset remaining values
        _id: action.payload._id,
      };

      state = planUsinghOnlyId;
      return state;
    },
    resetClientPlanItem: (state) => {
      state = clientPlanInitialState.clientPlan;
      return state;
    },
  },
});

export const { acceptNewClientPlans } = clientPlansSlice.actions;
export const { acceptNewClientPlan, setNameAndDescription, duplicatingClientPlan, resetClientPlanItem } = clientPlanSlice.actions;

export default combineReducers({
  clientPlans: clientPlansSlice.reducer,
  clientPlan: clientPlanSlice.reducer,
  mealDetails: mealDetailsSlice.reducer,
  mealBasicInfo: mealBasicInfoSlice.reducer,
});
