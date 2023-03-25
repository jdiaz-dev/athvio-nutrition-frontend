export type IngredientType = {
  ingredientName: string;
  amount: number;
  unit: string;
  protein?: number;
  carbs?: number;
  fat?: number;
  calories?: number;
};

export type CustomMeal = {
  name: string;
  ingredients: IngredientType[];
  recipe: string;
};
