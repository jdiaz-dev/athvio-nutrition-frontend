import { NutrientDetails } from 'src/shared/components/MealBuilder/food.types';

export type InternalFood = {
  internalFood: string;
  amountInGrams: number;
};

export type CalculateNutrientsInput = {
  internalFoods: InternalFood[];
};

export type CalculateNutrientsRequest = {
  input: CalculateNutrientsInput;
};

export type CalculateNutrientsResponse = {
  calculateFoodsNutrients: NutrientDetails;
};

export type CalculateNutrientsByMeasureInput = {
  internalFood: string;
  amount: number;
  uri: string;
};

export type CalculateNutrientsByMeasureRequest = {
  input: CalculateNutrientsByMeasureInput;
};

export type CalculateNutrientsByMeasureResponse = {
  calculateNutrientsByMeasure: NutrientDetails;
};
