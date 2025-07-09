import { IngredientDetail, Macros } from 'src/shared/components/MealBuilder/MealBuilder.types';

export type MealBasicInfo = {
  position: number;
  mealTag: string;
  name: string;
  image?: string | null;
};

export type MealDetails = {
  uuid: string;
  ingredientDetails: IngredientDetail[];
  cookingInstructions: string;
  macros: Macros;
};

export interface Meal extends MealBasicInfo, MealDetails {}
