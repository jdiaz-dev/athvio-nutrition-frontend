import { IngredientDetail, Macros } from 'src/shared/components/MealBuilder/MealBuilder.types';
import { MealImageSources } from 'src/shared/Consts';

export type MealBasicInfo = {
  position: number;
  mealTag: string;
  name: string;
  image?: File | string | null;
  imageSource?: MealImageSources;
};

export type MealDetails = {
  uuid: string;
  ingredientDetails: IngredientDetail[];
  cookingInstructions: string;
  macros: Macros;
};

export interface Meal extends MealBasicInfo, MealDetails {}
