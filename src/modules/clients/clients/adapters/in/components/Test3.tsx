import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  CustomRecipeBody,
  CustomRecipeInitialState,
  CustomRecipes,
  IngredientType,
} from 'src/modules/professionals/custom-recipes/adapters/out/customRecipe.types';
import { getUserFromLocalStorage } from 'src/shared/helpers/LocalStorage';

const initialStateRecipes = {
  customRecipe: {
    name: '',
    ingredients: [],
  },
};

export const customRecipeSlice = createSlice({
  name: 'customRecipe',
  initialState: initialStateRecipes,
  // applyMiddleware(...middleware),
  reducers: {
    renameCustomRecipeName: (state, action: PayloadAction<string>) => {
      state.customRecipe.name = action.payload;
    },
  },
});

export const { renameCustomRecipeName } = customRecipeSlice.actions;

export default customRecipeSlice.reducer;
