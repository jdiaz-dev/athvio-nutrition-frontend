import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  CustomRecipeBody,
  CustomRecipeInitialState,
  CustomRecipes,
  IngredientType,
} from 'src/modules/professionals/custom-recipes/adapters/out/customRecipe.types';
import { getUserFromLocalStorage } from 'src/shared/helpers/LocalStorage';

const initialState: CustomRecipeInitialState = {
  customRecipes: null,
  customRecipe: {
    professional: getUserFromLocalStorage()._id,
    name: '',
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

export const customRecipeSlice = createSlice({
  name: 'customRecipe',
  initialState,
  // applyMiddleware(...middleware),
  reducers: {
    /*
      showCustomRecipes
      showCustomRecipeDetail
      reinitializeCustomRecipe

      refactor setupdateCustomRecipeName
    */
    showCustomRecipes: (state, action: PayloadAction<CustomRecipes>) => {
      console.log('-----------action.type', action.type);
      state.customRecipes = action.payload;
    },
    showCustomRecipeDetail: (state, action: PayloadAction<CustomRecipeBody | undefined>) => {
      if (action.payload) state.customRecipe = action.payload;
    },
    reinitializeCustomRecipe: (state) => {
      state.customRecipe = initialState.customRecipe;
    },
    renameCustomRecipeName: (state, action: PayloadAction<string>) => {
      state.customRecipe.name = action.payload;
    },
    addIngredient: (state, action: PayloadAction<IngredientType>): any => {
      /* const indexIngredient = state.customRecipe.ingredients.findIndex(
        (ingredient) => ingredient.ingredientName === action.payload.ingredientName,
      );

      if (indexIngredient === -1) {
        state.customRecipe.ingredients.push(action.payload);
      } else {
        state.customRecipe.ingredients[indexIngredient].amount += action.payload.amount;
      } */
      return state.customRecipe.ingredients[0];
    },
    addMacrosToIngredient: (state, action: PayloadAction<IngredientType>) => {
      const fixProblemWithDecimals = (state: number, current: number, prev: number) => {
        return (state * 100 + current * 100 - prev * 100) / 100;
      };

      const recalculateGeneralMacros = (prevMacros: IngredientType): void => {
        state.customRecipe.ingredients[indexIngredient] = action.payload;

        state.customRecipe.macros.protein = fixProblemWithDecimals(
          state.customRecipe.macros.protein,
          action.payload.protein || 0,
          prevMacros.protein || 0,
        );
        state.customRecipe.macros.carbs = fixProblemWithDecimals(
          state.customRecipe.macros.carbs,
          action.payload.carbs || 0,
          prevMacros.carbs || 0,
        );
        state.customRecipe.macros.fat = fixProblemWithDecimals(
          state.customRecipe.macros.fat,
          action.payload.fat || 0,
          prevMacros.fat || 0,
        );
        state.customRecipe.macros.calories = fixProblemWithDecimals(
          state.customRecipe.macros.calories,
          action.payload.calories || 0,
          prevMacros.calories || 0,
        );
      };
      const indexIngredient = state.customRecipe.ingredients.findIndex(
        (ingredient) => ingredient.ingredientName === action.payload.ingredientName,
      );
      const prevIngredientMacros = state.customRecipe.ingredients[indexIngredient];
      recalculateGeneralMacros(prevIngredientMacros);
    },
    removeIngredient: (state, action: PayloadAction<string>) => {
      const indexIngredient = state.customRecipe.ingredients.findIndex(
        (ingredient) => ingredient.ingredientName === action.payload,
      );
      state.customRecipe.ingredients.splice(indexIngredient, 1);
    },
    renameCookingInstruction: (state, action: PayloadAction<string>) => {
      state.customRecipe.cookingInstruction = action.payload;
    },
  },
});

export const {
  showCustomRecipes,
  showCustomRecipeDetail,
  renameCustomRecipeName,
  addIngredient,
  addMacrosToIngredient,
  removeIngredient,
  renameCookingInstruction,
  reinitializeCustomRecipe,
} = customRecipeSlice.actions;

export default customRecipeSlice.reducer;
