import { combineReducers, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { customRecipeName } from 'src/modules/professionals/custom-recipes/adapters/in/slicers/CustomRecipeBasicInfo';
import { custoRecipeDetailsSlice } from 'src/modules/professionals/custom-recipes/adapters/in/slicers/CustomRecipeDetailsSlice';
import { customRecipeInitialState } from 'src/modules/professionals/custom-recipes/adapters/in/slicers/CustomRecipeInitialState';
import { CustomRecipes } from 'src/modules/professionals/custom-recipes/adapters/out/customRecipe.types';

const customRecipesSlices = createSlice({
  name: 'customRecipes',
  initialState: customRecipeInitialState.customRecipes,
  reducers: {
    showCustomRecipes: (state, action: PayloadAction<CustomRecipes>) => {
      state = action.payload;
      return state;
    },
  },
});

export const { showCustomRecipes } = customRecipesSlices.actions;

export default combineReducers({
  customRecipes: customRecipesSlices.reducer,
  customRecipeDetails: custoRecipeDetailsSlice.reducer,
  customRecipeBasicInfo: customRecipeName.reducer,
});
