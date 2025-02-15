import { combineReducers, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { nutritionalMealName } from 'src/modules/professionals/custom-recipes/adapters/in/slicers/NutritionalMealBasicInfo';
import { nutritionalMealDetailsSlice } from 'src/modules/professionals/custom-recipes/adapters/in/slicers/NutritionalMealDetailsSlice';
import { nutritionalMealInitialState } from 'src/modules/professionals/custom-recipes/adapters/in/slicers/NutritionalMealInitialState';
import { NutritionalMealBody, NutritionalMeals } from 'src/modules/professionals/custom-recipes/adapters/out/nutritionalMeal.types';

const nutritionalMealSlices = createSlice({
  name: 'nutritionalMeals',
  initialState: nutritionalMealInitialState.nutritionalMeals,
  reducers: {
    showNutritionalMeals: (state, action: PayloadAction<NutritionalMeals>) => {
      state = action.payload;
      return state;
    },
    addNutritionalMeal: (state, action: PayloadAction<NutritionalMealBody>) => {
      state?.data.push(action.payload);
      return state;
    },
    updateNutritionalMeal: (state, action: PayloadAction<NutritionalMealBody>) => {
      const indexFound = state?.data.findIndex((item) => item._id === action.payload._id);
      if (indexFound !== undefined && indexFound !== -1 && state?.data) {
        state.data[indexFound] = action.payload;
      }

      return state;
    },
  },
});

export const { showNutritionalMeals, addNutritionalMeal, updateNutritionalMeal } = nutritionalMealSlices.actions;

export default combineReducers({
  nutritionalMeals: nutritionalMealSlices.reducer,
  nutritionalMealDetails: nutritionalMealDetailsSlice.reducer,
  nutritionalMealBasicInfo: nutritionalMealName.reducer,
});
