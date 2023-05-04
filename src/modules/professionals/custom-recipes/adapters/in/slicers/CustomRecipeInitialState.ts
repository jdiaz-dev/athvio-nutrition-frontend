import { CustomRecipeInitialState } from 'src/modules/professionals/custom-recipes/adapters/out/customRecipe.types';
import { getUserFromLocalStorage } from 'src/shared/helpers/LocalStorage';

export const customRecipeInitialState: CustomRecipeInitialState = {
  customRecipes: null,
  customRecipeDetails: {
    _id: '',
    professional: getUserFromLocalStorage()._id,
    ingredientDetails: [],
    cookingInstructions: '',
    macros: {
      protein: 0,
      carbs: 0,
      fat: 0,
      calories: 0,
      weightInGrams: 0,
    },
  },
  customRecipeName: 'Meal 1',
};
