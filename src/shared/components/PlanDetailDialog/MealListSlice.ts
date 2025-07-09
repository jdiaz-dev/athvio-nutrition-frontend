import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ReduxItemtatus } from 'src/shared/Consts';
import { Meal } from 'src/shared/components/PlanDetailDialog/Meal.types';
import { MealWithStatus } from 'src/shared/components/PlanDetailDialog/MealList';

export const mealListSlicer = (sliceName: string, initialState: MealWithStatus[]) => {
  return createSlice({
    name: sliceName,
    initialState,
    reducers: {
      initializeMeals(state, action: PayloadAction<Meal[]>) {
        state = action.payload.map((item) => ({ ...item, status: ReduxItemtatus.INITIALIZED }));
        return state;
      },
      addMeal: (state, action: PayloadAction<Meal>) => {
        state.push({ ...action.payload, status: ReduxItemtatus.CREATED });
        return state;
      },
      updateMeal: (state, action: PayloadAction<Meal>) => {
        const itemFoundIndex = state.findIndex((item) => item.uuid === action.payload.uuid);
        if (itemFoundIndex != -1) state[itemFoundIndex] = { ...action.payload, status: ReduxItemtatus.UPDATED };
        return state;
      },
      deleteMeal: (state, action: PayloadAction<string>) => {
        const itemFoundIndex = state.findIndex((item) => item.uuid === action.payload);
        if (itemFoundIndex != -1) {
          state[itemFoundIndex] = { ...state[itemFoundIndex], status: ReduxItemtatus.DELETED };
        }
        return state;
      },
    },
  });
};
