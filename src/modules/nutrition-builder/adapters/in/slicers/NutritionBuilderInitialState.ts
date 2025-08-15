import { NutritionBuilderInitialState } from 'src/modules/nutrition-builder/adapters/out/nutritionBuilder';

export const nutritionBuilderInitialState: NutritionBuilderInitialState = {
  diseaseCauses: [],
  diseases: [],
  nutritionalPreferences: [],
  totalDays: 3,
  mealsByDay: 3,
  macros: {
    carbs: 30,
    protein: 40,
    fat: 30,
    calories: 1800,
  },
};
