import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { MealBasicInfo } from 'src/shared/components/PlanDetailDialog/Meal.types';

export const mealBasicInfoSlice = (sliceName: string, initialState: MealBasicInfo) => {
  return createSlice({
    name: sliceName,
    initialState: initialState,
    reducers: {
      acceptNewMealBasicInfo: (state, action: PayloadAction<MealBasicInfo>) => {
        state = action.payload;
        return state;
      },
      renameMealTag: (state, action: PayloadAction<string>) => {
        state.mealTag = action.payload;
        return state;
      },
      changeName: (state, action: PayloadAction<string>) => {
        state.name = action.payload;
        return state;
      },
    },
  });
};
