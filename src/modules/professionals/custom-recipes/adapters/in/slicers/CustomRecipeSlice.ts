import { combineReducers, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { customRecipeName } from 'src/modules/professionals/custom-recipes/adapters/in/slicers/CustomRecipeBasicInfo';
import { customRecipeDetailsSlice } from 'src/modules/professionals/custom-recipes/adapters/in/slicers/CustomRecipeDetailsSlice';
import { customRecipeInitialState } from 'src/modules/professionals/custom-recipes/adapters/in/slicers/CustomRecipeInitialState';
import { NutritionalMealBody, NutritionalMeals } from 'src/modules/professionals/custom-recipes/adapters/out/customRecipe.types';

const customRecipesSlices = createSlice({
  name: 'nutritionalMeals',
  initialState: customRecipeInitialState.nutritionalMeals,
  reducers: {
    showCustomRecipes: (state, action: PayloadAction<NutritionalMeals>) => {
      state = action.payload;
      return state;
    },
    addCustomRecipe: (state, action: PayloadAction<NutritionalMealBody>) => {
      state?.data.push(action.payload);
      return state;
    },
    updateCustomRecipe: (state, action: PayloadAction<NutritionalMealBody>) => {
      const indexFound = state?.data.findIndex((item) => item._id === action.payload._id);
      if (indexFound !== undefined && indexFound !== -1 && state?.data) {
        state.data[indexFound] = action.payload;
      }

      return state;
    },
  },
});

export const { showCustomRecipes, addCustomRecipe, updateCustomRecipe } = customRecipesSlices.actions;

export default combineReducers({
  nutritionalMeals: customRecipesSlices.reducer,
  nutritionalMealDetails: customRecipeDetailsSlice.reducer,
  nutritionalMealBasicInfo: customRecipeName.reducer,
});
