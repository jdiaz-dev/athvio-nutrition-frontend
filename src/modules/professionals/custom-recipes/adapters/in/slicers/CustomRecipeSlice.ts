import { combineReducers, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { customRecipeName } from 'src/modules/professionals/custom-recipes/adapters/in/slicers/CustomRecipeBasicInfo';
import { customRecipeDetailsSlice } from 'src/modules/professionals/custom-recipes/adapters/in/slicers/CustomRecipeDetailsSlice';
import { customRecipeInitialState } from 'src/modules/professionals/custom-recipes/adapters/in/slicers/CustomRecipeInitialState';
import { CustomRecipeBody, CustomRecipes } from 'src/modules/professionals/custom-recipes/adapters/out/customRecipe.types';

const customRecipesSlices = createSlice({
  name: 'customRecipes',
  initialState: customRecipeInitialState.customRecipes,
  reducers: {
    showCustomRecipes: (state, action: PayloadAction<CustomRecipes>) => {
      state = action.payload;
      return state;
    },
    addCustomRecipe: (state, action: PayloadAction<CustomRecipeBody>) => {
      state?.data.push(action.payload);
      return state;
    },
    updateCustomRecipe: (state, action: PayloadAction<CustomRecipeBody>) => {
      const indexFound = state?.data.findIndex((item) => item._id === action.payload._id);
      if (indexFound && indexFound !== -1 && state?.data) state.data[indexFound] = action.payload;

      return state;
    },
  },
});

export const { showCustomRecipes, addCustomRecipe, updateCustomRecipe } = customRecipesSlices.actions;

export default combineReducers({
  customRecipes: customRecipesSlices.reducer,
  customRecipeDetails: customRecipeDetailsSlice.reducer,
  customRecipeBasicInfo: customRecipeName.reducer,
});
