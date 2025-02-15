import { CustomRecipeInitialState } from 'src/modules/professionals/custom-recipes/adapters/out/customRecipe.types';

export const defaultRecipeName = 'Meal 1';
export const customRecipeInitialState: CustomRecipeInitialState = {
  nutritionalMeals: null,
  nutritionalMealDetails: {
    _id: '',
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
  nutritionalMealBasicInfo: {
    professional: '',
    name: defaultRecipeName,
  },
};
