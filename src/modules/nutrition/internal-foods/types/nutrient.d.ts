import { NutrientDetails } from 'src/shared/components/MealBuilder/food.types';

export type InternalFood = {
  internalFood: string;
  amount: number;
};

export type CalculateNutrientsInput = {
  internalFoods: InternalFood[];
};

export type CalculateNutrientsRequest = {
  input: CalculateNutrientsInput;
};

export type CalculateNutrientsResponse = {
  calculateNutrients: NutrientDetails;
};
