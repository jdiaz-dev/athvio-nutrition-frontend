import { nutritionalMealInitialState } from 'src/modules/professionals/nutritional-meals/adapters/in/slicers/NutritionalMealInitialState';
import { mealBuilderSlice } from 'src/shared/components/MealBuilder/MealBuilderSlice';

export const nutritionalMealDetailsSlice = mealBuilderSlice('nutritionalMealDetails', nutritionalMealInitialState.nutritionalMealDetails);

export const { acceptNewMealDetail, addIngredient, updateAmountIngredient, removeIngredient, renameCookingInstruction, reinitializeMeal } =
  nutritionalMealDetailsSlice.actions;
