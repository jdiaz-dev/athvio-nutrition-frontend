import { customRecipeInitialState } from 'src/modules/professionals/custom-recipes/adapters/in/slicers/CustomRecipeInitialState';
import { recipeBuilderSlice } from 'src/shared/components/MealBuilder/MealBuilderSlice';

export const customRecipeDetailsSlice = recipeBuilderSlice('customRecipeDetails', customRecipeInitialState.customRecipeDetails);

export const { acceptNewMealDetail, addIngredient, removeIngredient, renameCookingInstruction, reinitializeMeal } =
  customRecipeDetailsSlice.actions;
