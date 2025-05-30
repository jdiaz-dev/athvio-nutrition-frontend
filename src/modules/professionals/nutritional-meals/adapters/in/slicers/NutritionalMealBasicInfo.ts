import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  defaultNutritionalMeal,
  nutritionalMealInitialState,
} from 'src/modules/professionals/nutritional-meals/adapters/in/slicers/NutritionalMealInitialState';

export const nutritionalMealName = createSlice({
  name: 'nutritionalMealBasicInfo',
  initialState: nutritionalMealInitialState.nutritionalMealBasicInfo,
  reducers: {
    renameNutritionalMeal: (state, action: PayloadAction<string>) => {
      state.name = action.payload;
      return state;
    },
    resetName: (state) => {
      state.name = defaultNutritionalMeal;
      return state;
    },
    setImage: (state, action: PayloadAction<string | null>) => {
      state.image = action.payload;
      return state;
    },
  },
});

export const { renameNutritionalMeal, resetName, setImage } = nutritionalMealName.actions;
