import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// TODO: use own plan initial state or move to shared
import { programInitialState } from 'src/modules/professionals/programs/adapters/in/slicers/ProgramInitialState';
import { Plan } from 'src/modules/professionals/programs/adapters/out/program.types';

export const plansSlice = createSlice({
  name: 'plans',
  initialState: programInitialState.plans,
  reducers: {
    acceptNewPlans: (state, action: PayloadAction<Plan[]>) => {
      state = action.payload;
      return state;
    },
  },
});

export const planSlice = createSlice({
  name: 'plan',
  initialState: programInitialState.plan,
  reducers: {
    acceptNewPlan: (state, action: PayloadAction<Plan>) => {
      state = action.payload;
      return state;
    },
    duplicatingClientPlan: (state, action: PayloadAction<Pick<Plan, '_id'>>) => {
      const planUsinghOnlyId = {
        ...programInitialState.plan, // to reset remaining values
        _id: action.payload._id,
      };

      state = planUsinghOnlyId;
      return state;
    },
  },
});

export const { acceptNewPlans } = plansSlice.actions;
export const { acceptNewPlan, duplicatingClientPlan } = planSlice.actions;
