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

enum Operation {
  ADDITION = 'addition',
  SUBTRACTION = 'subtraction',
}
const realizeOperation = (num1: number, num2: number, operation: Operation) => {
  return operation === Operation.ADDITION ? num1 + num2 : num1 - num2;
};

const recalculateGeneralMacros = (foodMacros: Macros, macrosToAdd: Macros, operation: Operation): Macros => ({
  protein: realizeOperation(foodMacros.protein, macrosToAdd.protein, operation),
  carbs: realizeOperation(foodMacros.carbs, macrosToAdd.carbs, operation),
  fat: realizeOperation(foodMacros.fat, macrosToAdd.fat, operation),
  calories: realizeOperation(foodMacros.calories, macrosToAdd.calories, operation),
  weightInGrams: realizeOperation(foodMacros.weightInGrams, macrosToAdd.weightInGrams, operation),
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
          state.macros = recalculateGeneralMacros(state.macros, macros, Operation.ADDITION);
        } else if (action.payload.ingredientType === IngredientType.CUSTOM_INGREDIENT) {
          state.macros = recalculateGeneralMacros(
            state.macros,
            (action.payload.customIngredient as CustomIngredient).macros,
            Operation.ADDITION,
          );
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
            protein: Number((ingredient.protein * newAmount) / amountInNumber),
            carbs: Number((ingredient.carbs * newAmount) / amountInNumber),
            fat: Number((ingredient.fat * newAmount) / amountInNumber),
            calories: Number((ingredient.calories * newAmount) / amountInNumber),
          };

          (state.ingredientDetails[indexIngredient].ingredient as Ingredient) = {
            amount: newAmount.toString(),
            name: ingredient.name,
            label: ingredient.label,
            internalFood: ingredient.internalFood,
            ...newMacros,
          };
          state.macros = recalculateGeneralMacros(state.macros, ingredient, Operation.SUBTRACTION);
          state.macros = recalculateGeneralMacros(state.macros, newMacros, Operation.ADDITION);
        }
        return state;
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

        const deletedIngredient = state.ingredientDetails[indexIngredient as number].ingredient as Ingredient;
        state.ingredientDetails.splice(indexIngredient as number, 1);
        state.macros = recalculateGeneralMacros(state.macros, deletedIngredient, Operation.SUBTRACTION);
        return state;
      },
      renameCookingInstruction: (state, action: PayloadAction<string>) => {
        state.cookingInstructions = action.payload;
        return state;
      },
    },
  });
};
