import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Ingredient, Macros, MealDataForBuilder } from 'src/shared/components/MealBuilder/MealBuilder.types';
import { IngredientType } from 'src/shared/Consts';

const fixProblemWithDecimals = (num1: number, num2: number, prev: number) => {
  const _prev = num1 < prev ? -prev : prev;
  return (num1 * 100 + num2 * 100) /* - _prev * 100 */ / 100;
};

const recalculateGeneralMacros = (foodMacros: Macros, ingredientMacros: Ingredient) => ({
  protein: fixProblemWithDecimals(foodMacros.protein, ingredientMacros.protein, foodMacros.protein),
  carbs: fixProblemWithDecimals(foodMacros.carbs, ingredientMacros.carbs, foodMacros.carbs || 0),
  fat: fixProblemWithDecimals(foodMacros.fat, ingredientMacros.fat || 0, foodMacros.fat || 0),
  calories: fixProblemWithDecimals(foodMacros.calories, ingredientMacros.calories || 0, foodMacros.calories || 0),
});

export const recipeBuilderSlice = (sliceName: string, initState: MealDataForBuilder) => {
  return createSlice({
    name: sliceName,
    initialState: initState,
    reducers: {
      acceptNewMealDetail: (state, action: PayloadAction<MealDataForBuilder | undefined>) => {
        if (action.payload) {
          state = action.payload;
        }
        return state;
      },
      reinitializeMeal: (state) => {
        state = initState;
        return state;
      },
      renameMealName: (state, action: PayloadAction<string>) => {
        state.name = action.payload;
        return state;
      },
      addIngredient: (state, action: PayloadAction<Ingredient>) => {
        state.ingredientDetails.push({
          ingredientType: IngredientType.UNIQUE_INGREDIENT,
          ingredient: action.payload,
          equivalents: [],
        });
        state.totalWeight = fixProblemWithDecimals(state.totalWeight, action.payload.amount);
        state.macros = recalculateGeneralMacros(state.macros, action.payload);
        return state;
      },
      /* removeIngredient: (state, action: PayloadAction<string>) => {
        const indexIngredient = state.ingredients.findIndex((ingredient) => ingredient.name === action.payload);
        state.ingredients.splice(indexIngredient, 1);
        return state;
      }, */
      renameCookingInstruction: (state, action: PayloadAction<string>) => {
        state.cookingInstructions = action.payload;
        return state;
      },
    },
  });
};
