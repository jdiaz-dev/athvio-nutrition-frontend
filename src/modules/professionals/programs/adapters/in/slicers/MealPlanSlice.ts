import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { programInitialState } from 'src/modules/professionals/programs/adapters/in/slicers/ProgramInitialState';
import { MealPlan } from 'src/modules/professionals/programs/adapters/out/program.types';

export const mealPlanSlice = createSlice({
  name: 'mealPlan',
  initialState: programInitialState.mealPlan,
  reducers: {
    acceptNewMealDetail: (state, action: PayloadAction<MealPlan>) => {
      state = action.payload;
      return state;
    },
  },
});

export const { acceptNewMealDetail } = mealPlanSlice.actions;
