import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CustomMeal, IngredientType } from 'src/modules/professionals/custom-meals/adapters/out/customMeal.types';
import { getUserFromLocalStorage } from 'src/shared/helpers/LocalStorage';

const initialState: CustomMeal = {
  professionalId: getUserFromLocalStorage()._id,
  name: '',
  ingredients: [],
  recipe: '',
};

export const customMealSlice = createSlice({
  name: 'customMeal',
  initialState,
  reducers: {
    /* setProfessionaId: (state, action: PayloadAction<string>) => {
      state.professionalId = action.payload;
    }, */
    updateCustomMealName: (state, action: PayloadAction<string>) => {
      state.name = action.payload;
    },
    addIngredient: (state, action: PayloadAction<IngredientType>) => {
      const indexIngredient = state.ingredients.findIndex(
        (ingredient) => ingredient.ingredientName === action.payload.ingredientName,
      );

      if (indexIngredient === -1) {
        state.ingredients.push(action.payload);
      } else {
        state.ingredients[indexIngredient].amount += action.payload.amount;
      }
    },
    updateIngredient: (state, action: PayloadAction<IngredientType>) => {
      const indexIngredient = state.ingredients.findIndex(
        (ingredient) => ingredient.ingredientName === action.payload.ingredientName,
      );
      state.ingredients[indexIngredient] = action.payload;
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

export const { updateCustomMealName, addIngredient, updateIngredient, removeIngredient, updateRecipe } =
  customMealSlice.actions;

export default customMealSlice.reducer;
