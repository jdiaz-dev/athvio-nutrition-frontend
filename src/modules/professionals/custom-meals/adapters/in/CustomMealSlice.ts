import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  CustomMealBody,
  CustomMealInitialState,
  CustomMeals,
  IngredientType,
} from 'src/modules/professionals/custom-meals/adapters/out/customMeal.types';
import { getUserFromLocalStorage } from 'src/shared/helpers/LocalStorage';

const initialState: CustomMealInitialState = {
  customMealList: null,
  customMealItem: {
    professional: getUserFromLocalStorage()._id,
    name: '',
    ingredients: [],
    recipe: '',
  },
};

export const customMealSlice = createSlice({
  name: 'customMeal',
  initialState,
  reducers: {
    setCustomMealList: (state, action: PayloadAction<CustomMeals>) => {
      state.customMealList = action.payload;
    },
    setCustomMealItem: (state, action: PayloadAction<CustomMealBody | undefined>) => {
      if (action.payload) state.customMealItem = action.payload;
    },
    updateCustomMealName: (state, action: PayloadAction<string>) => {
      state.customMealItem.name = action.payload;
    },
    addIngredient: (state, action: PayloadAction<IngredientType>) => {
      const indexIngredient = state.customMealItem.ingredients.findIndex(
        (ingredient) => ingredient.ingredientName === action.payload.ingredientName,
      );

      if (indexIngredient === -1) {
        state.customMealItem.ingredients.push(action.payload);
      } else {
        state.customMealItem.ingredients[indexIngredient].amount += action.payload.amount;
      }
    },
    updateIngredient: (state, action: PayloadAction<IngredientType>) => {
      const indexIngredient = state.customMealItem.ingredients.findIndex(
        (ingredient) => ingredient.ingredientName === action.payload.ingredientName,
      );
      state.customMealItem.ingredients[indexIngredient] = action.payload;
    },
    removeIngredient: (state, action: PayloadAction<string>) => {
      const indexIngredient = state.customMealItem.ingredients.findIndex(
        (ingredient) => ingredient.ingredientName === action.payload,
      );
      state.customMealItem.ingredients.splice(indexIngredient, 1);
    },
    updateRecipe: (state, action: PayloadAction<string>) => {
      state.customMealItem.recipe = action.payload;
    },
    resetCustomMealItem: (state) => {
      state.customMealItem = initialState.customMealItem;
    },
  },
});

export const {
  setCustomMealList,
  setCustomMealItem,
  updateCustomMealName,
  addIngredient,
  updateIngredient,
  removeIngredient,
  updateRecipe,
  resetCustomMealItem,
} = customMealSlice.actions;

export default customMealSlice.reducer;
