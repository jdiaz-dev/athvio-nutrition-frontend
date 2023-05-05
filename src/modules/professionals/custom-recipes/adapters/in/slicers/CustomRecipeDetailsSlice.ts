import { customRecipeInitialState } from 'src/modules/professionals/custom-recipes/adapters/in/slicers/CustomRecipeInitialState';
import { recipeBuilderSlice } from 'src/shared/components/MealBuilder/MealBuilderSlice';

export const custoRecipeDetailsSlice = recipeBuilderSlice('customRecipeDetails', customRecipeInitialState.customRecipeDetails);

export const { acceptNewMealDetail, addIngredient, removeIngredient, renameCookingInstruction, reinitializeMeal } =
  custoRecipeDetailsSlice.actions;
