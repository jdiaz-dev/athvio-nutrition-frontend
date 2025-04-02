import { IngredientDetail, Macros } from 'src/shared/components/MealBuilder/MealBuilder.types';

export type MealBasicInfo = {
  position: number;
  mealTag: string;
  name: string;
  image?: string | null;
};

export type MealDetails = {
  _id: string;
  ingredientDetails: IngredientDetail[];
  cookingInstructions: string;
  macros: Macros;
};

export interface Meal extends MealBasicInfo, MealDetails {}
