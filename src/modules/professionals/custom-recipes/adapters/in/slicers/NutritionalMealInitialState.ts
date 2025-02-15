import { NutritionalMealInitialState } from 'src/modules/professionals/custom-recipes/adapters/out/nutritionalMeal.types';

export const defaultNutritionalMeal = 'Meal 1';
export const nutritionalMealInitialState: NutritionalMealInitialState = {
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
    name: defaultNutritionalMeal,
  },
};
