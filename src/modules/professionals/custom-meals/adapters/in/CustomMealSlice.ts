import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CustomMeal, IngredientType } from 'src/modules/professionals/custom-meals/adapters/out/customMeal.types';

const initialState: CustomMeal = {
  name: '',
  ingredients: [],
  recipe: '',
};

export const customMealSlice = createSlice({
  name: 'customMeal',
  initialState,
  reducers: {
    addIngredient: (state, action: PayloadAction<IngredientType>) => {
      console.log('------action.payload', action.payload)
      state.ingredients.push(action.payload);
    },
    removeIngredient: (state, action: PayloadAction<string>) => {
      const indexIngredient = state.ingredients.findIndex((ingredient) => ingredient.ingredientName === action.payload);
      state.ingredients.splice(indexIngredient, 1);
    },
    updateRecipe: (state, action: PayloadAction<string>) => {
      state.recipe = action.payload;
    },
  },
});

export const { addIngredient, removeIngredient, updateRecipe } = customMealSlice.actions;

export default customMealSlice.reducer;
