import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { programInitialState } from 'src/modules/professionals/programs/adapters/in/slicers/ProgramInitialState';
import { Plan } from 'src/modules/professionals/programs/adapters/out/program.types';

//todo: analize if still is necesary to manage plan slice and plans slice
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
    duplicatingProgramPlan: (state, action: PayloadAction<Pick<Plan, 'uuid'>>) => {
      const planUsinghOnlyId = {
        ...programInitialState.plan, // to reset remaining values
        uuid: action.payload.uuid,
      };

      state = planUsinghOnlyId;
      return state;
    },
  },
});

export const { acceptNewPlans } = plansSlice.actions;
export const { acceptNewPlan, duplicatingProgramPlan } = planSlice.actions;
