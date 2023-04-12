import { combineReducers, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CustomRecipeInitialState, CustomRecipes } from 'src/modules/professionals/custom-recipes/adapters/out/customRecipe.types';
import { recipeBuilderSlice } from 'src/shared/components/MealBuilder/MealBuilderSlice';
import { getUserFromLocalStorage } from 'src/shared/helpers/LocalStorage';

const initialState: CustomRecipeInitialState = {
  customRecipes: null,
  customRecipe: {
    _id: '',
    professional: getUserFromLocalStorage()._id,
    name: 'Meal 1',
    ingredients: [],
    cookingInstruction: '',
    macros: {
      protein: 0,
      carbs: 0,
      fat: 0,
      calories: 0,
    },
  },
};
const customRecipesSlices = createSlice({
  name: 'customRecipes',
  initialState: initialState.customRecipes,
  reducers: {
    showCustomRecipes: (state, action: PayloadAction<CustomRecipes>) => {
      state = action.payload;
      return state;
    },
  },
});

export const { showCustomRecipes } = customRecipesSlices.actions;

const custoRecipeSlice = recipeBuilderSlice('customRecipe', initialState.customRecipe);

export const {
  acceptNewMealDetail,
  renameMealName,
  addIngredient,
  addMacrosToIngredient,
  removeIngredient,
  renameCookingInstruction,
  reinitializeMeal,
} = custoRecipeSlice.actions;

export default combineReducers({
  customRecipes: customRecipesSlices.reducer,
  customRecipe: custoRecipeSlice.reducer,
});
