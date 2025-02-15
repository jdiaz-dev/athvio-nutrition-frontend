import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { nutritionalMealInitialState } from 'src/modules/professionals/custom-recipes/adapters/in/slicers/NutritionalMealInitialState';

export const nutritionalMealName = createSlice({
  name: 'nutritionalMealBasicInfo',
  initialState: nutritionalMealInitialState.nutritionalMealBasicInfo,
  reducers: {
    renameNutritionalMeal: (state, action: PayloadAction<string>) => {
      state.name = action.payload;
      return state;
    },
  },
});

export const { renameNutritionalMeal } = nutritionalMealName.actions;
