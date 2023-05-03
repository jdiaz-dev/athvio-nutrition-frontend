import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  CustomIngredient,
  Ingredient,
  IngredientDetail,
  Macros,
  MealDataForBuilder,
} from 'src/shared/components/MealBuilder/MealBuilder.types';
import { IngredientType } from 'src/shared/Consts';

const fixProblemWithDecimals = (num1: number, num2: number, prev?: number) => {
  // const _prev = num1 < prev ? -prev : prev;
  return (num1 * 100 + num2 * 100) /* - _prev * 100 */ / 100;
};

const recalculateGeneralMacros = (foodMacros: Macros, macrosToAdd: Macros): Macros => ({
  protein: fixProblemWithDecimals(foodMacros.protein, macrosToAdd.protein, foodMacros.protein),
  carbs: fixProblemWithDecimals(foodMacros.carbs, macrosToAdd.carbs, foodMacros.carbs || 0),
  fat: fixProblemWithDecimals(foodMacros.fat, macrosToAdd.fat || 0, foodMacros.fat || 0),
  calories: fixProblemWithDecimals(foodMacros.calories, macrosToAdd.calories || 0, foodMacros.calories || 0),
  weightInGrams: fixProblemWithDecimals(foodMacros.weightInGrams, macrosToAdd.weightInGrams, foodMacros.weightInGrams),
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
      addIngredient: (state, action: PayloadAction<IngredientDetail>) => {
        /* action.payload.map((ingredientDetail) => {
          if (ingredientDetail.ingredientType === IngredientType.UNIQUE_INGREDIENT) {
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            const { label, name, amount, ...macros } = ingredientDetail.ingredient as Ingredient;
            state.macros = recalculateGeneralMacros(state.macros, macros);
          } else if (ingredientDetail.ingredientType === IngredientType.CUSTOM_INGREDIENT) {
            state.macros = recalculateGeneralMacros(state.macros, (ingredientDetail.customIngredient as CustomIngredient).macros);
          }
          state.ingredientDetails.push(ingredientDetail);
        }); */
        if (action.payload.ingredientType === IngredientType.UNIQUE_INGREDIENT) {
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          const { label, name, amount, ...macros } = action.payload.ingredient as Ingredient;
          state.macros = recalculateGeneralMacros(state.macros, macros);
        } else if (action.payload.ingredientType === IngredientType.CUSTOM_INGREDIENT) {
          state.macros = recalculateGeneralMacros(state.macros, (action.payload.customIngredient as CustomIngredient).macros);
        }
        state.ingredientDetails.push(action.payload);

        return state;
      },
      /* removeIngredient: (state, action: PayloadAction<string>) => {
        const indexIngredient = state.ingredientDetails.findIndex((ingredient) => ingredient. === action.payload);
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
