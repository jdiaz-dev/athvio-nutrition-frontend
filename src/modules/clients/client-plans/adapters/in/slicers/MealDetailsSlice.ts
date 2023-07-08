import { clientPlanInitialState } from 'src/modules/clients/client-plans/adapters/in/slicers/ClientPlanInitialState';
import { recipeBuilderSlice } from 'src/shared/components/MealBuilder/MealBuilderSlice';

export const mealDetailsSlice = recipeBuilderSlice('mealDetails', clientPlanInitialState.mealDetails);

export const { acceptNewMealDetail, addIngredient, removeIngredient, renameCookingInstruction, reinitializeMeal } =
  mealDetailsSlice.actions;
