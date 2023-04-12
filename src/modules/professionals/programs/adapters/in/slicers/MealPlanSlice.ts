import { programInitialState } from 'src/modules/professionals/programs/adapters/in/slicers/ProgramInitialState';
import { recipeBuilderSlice } from 'src/shared/components/MealBuilder/MealBuilderSlice';

export const mealPlanSlice = recipeBuilderSlice('mealPlan', programInitialState.mealPlan);

export const {
  acceptNewMealDetail,
  renameMealName,
  addIngredient,
  addMacrosToIngredient,
  removeIngredient,
  renameCookingInstruction,
  reinitializeMeal,
} = mealPlanSlice.actions;
