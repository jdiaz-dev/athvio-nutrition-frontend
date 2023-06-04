import { programInitialState } from 'src/modules/professionals/programs/adapters/in/slicers/ProgramInitialState';
import { recipeBuilderSlice } from 'src/shared/components/MealBuilder/MealBuilderSlice';

export const mealDetailsSlice = recipeBuilderSlice('customRecipeDetails', programInitialState.mealDetails);

export const { acceptNewMealDetail, addIngredient, removeIngredient, renameCookingInstruction, reinitializeMeal } =
  mealDetailsSlice.actions;
