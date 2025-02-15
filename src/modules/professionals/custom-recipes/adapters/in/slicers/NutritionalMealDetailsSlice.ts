import { nutritionalMealInitialState } from 'src/modules/professionals/custom-recipes/adapters/in/slicers/NutritionalMealInitialState';
import { recipeBuilderSlice } from 'src/shared/components/MealBuilder/MealBuilderSlice';

export const nutritionalMealDetailsSlice = recipeBuilderSlice('nutritionalMealDetails', nutritionalMealInitialState.nutritionalMealDetails);

export const { acceptNewMealDetail, addIngredient, removeIngredient, renameCookingInstruction, reinitializeMeal } =
  nutritionalMealDetailsSlice.actions;
