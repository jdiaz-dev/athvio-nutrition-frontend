import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { programInitialState } from 'src/modules/professionals/programs/adapters/in/slicers/ProgramInitialState';
import { MealPlan } from 'src/modules/professionals/programs/adapters/out/program.types';

/*
  export const programInitialState: ProgramInitialState = {
  programs: null,
  program: {
    professional: getUserFromLocalStorage()._id,
    _id: '',
    name: '',
    description: '',
    programTags: [],
    plans: [],
  },
  plans: [],
  plan: {
    _id: '',
    title: '',
    week: 0,
    day: 0,
    mealPlans: [],
  },
  mealPlan: {
    _id: '',
    mealTag: 'Meal name',
    position: 0,
    meals: [],
    macros: {
      protein: 0,
      carbs: 0,
      fat: 0,
      calories: 0,
    },
  },
};

*/
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
