import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  CustomIngredient,
  DisplayedIngredient,
  Ingredient,
  IngredientDetail,
  Macros,
  MealBuilderBody,
} from 'src/shared/components/MealBuilder/MealBuilder.types';
import { IngredientType, MeasureSizes } from 'src/shared/Consts';

const fixProblemWithDecimals = (num1: number, num2: number) => {
  return parseFloat((num1 + num2).toFixed(2));
};

const recalculateGeneralMacros = (foodMacros: Macros, macrosToAdd: Macros): Macros => ({
  protein: fixProblemWithDecimals(foodMacros.protein, macrosToAdd.protein),
  carbs: fixProblemWithDecimals(foodMacros.carbs, macrosToAdd.carbs),
  fat: fixProblemWithDecimals(foodMacros.fat, macrosToAdd.fat),
  calories: fixProblemWithDecimals(foodMacros.calories, macrosToAdd.calories),
  weightInGrams: fixProblemWithDecimals(foodMacros.weightInGrams, macrosToAdd.weightInGrams),
});

export const mealBuilderSlice = (sliceName: string, initState: MealBuilderBody) => {
  return createSlice({
    name: sliceName,
    initialState: initState,
    reducers: {
      acceptNewMealDetail: (state, action: PayloadAction<MealBuilderBody | undefined>) => {
        if (action.payload) {
          state = action.payload;
        }
        return state;
      },
      reinitializeMeal: (state) => {
        state = initState;
        return state;
      },
      addIngredient: (state, action: PayloadAction<IngredientDetail>) => {
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
      updateAmountIngredient: (state, action: PayloadAction<{ name: string; newAmount: number }>) => {
        const { name, newAmount } = action.payload;
        const indexIngredient = state.ingredientDetails.findIndex(
          (ingredientDetail) =>
            (ingredientDetail.ingredientType === IngredientType.UNIQUE_INGREDIENT && ingredientDetail.ingredient?.name === name) ||
            (ingredientDetail.ingredientType === IngredientType.CUSTOM_INGREDIENT && ingredientDetail.customIngredient?.name === name),
        );

        if (indexIngredient !== -1) {
          const ingredient = state.ingredientDetails[indexIngredient].ingredient as Ingredient;
          const amountInNumber = parseInt(ingredient.amount);
          const newMacros: Macros = {
            weightInGrams:
              ingredient.label === MeasureSizes.GRAM_LABEL_ENGLISH || ingredient.label === MeasureSizes.GRAM_LABEL_SPANISH
                ? newAmount
                : newAmount * ingredient.weightInGrams,
            protein: Number(((ingredient.protein * newAmount) / amountInNumber).toFixed(2)),
            carbs: Number(((ingredient.carbs * newAmount) / amountInNumber).toFixed(2)),
            fat: Number(((ingredient.fat * newAmount) / amountInNumber).toFixed(2)),
            calories: Number(((ingredient.calories * newAmount) / amountInNumber).toFixed(2)),
          };

          (state.ingredientDetails[indexIngredient].ingredient as Ingredient) = {
            amount: newAmount.toString(),
            name: ingredient.name,
            label: ingredient.label,
            ...newMacros,
          };
        }
      },
      removeIngredient: (state, action: PayloadAction<Pick<DisplayedIngredient, 'ingredientType' | 'name'>>) => {
        let indexIngredient;

        if (action.payload.ingredientType === IngredientType.UNIQUE_INGREDIENT) {
          indexIngredient = state.ingredientDetails.findIndex(
            (ingredientDetail) =>
              ingredientDetail.ingredientType === action.payload.ingredientType &&
              ingredientDetail.ingredient?.name === action.payload.name,
          );
        } else if (action.payload.ingredientType === IngredientType.CUSTOM_INGREDIENT) {
          indexIngredient = state.ingredientDetails.findIndex(
            (ingredientDetail) =>
              ingredientDetail.ingredientType === action.payload.ingredientType &&
              ingredientDetail.customIngredient?.name === action.payload.name,
          );
        }

        state.ingredientDetails.splice(indexIngredient as number, 1);
        return state;
      },
      renameCookingInstruction: (state, action: PayloadAction<string>) => {
        state.cookingInstructions = action.payload;
        return state;
      },
    },
  });
};
