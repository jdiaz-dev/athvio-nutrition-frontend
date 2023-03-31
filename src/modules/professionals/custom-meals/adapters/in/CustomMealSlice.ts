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
    totalProtein: 0,
    totalCarbs: 0,
    totalFat: 0,
    totalCalories: 0,
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
      const fixProblemWithDecimals = (state: number, current: number, prev: number) => {
        return (state * 100 + current * 100 - prev * 100) / 100;
      };

      const recalculateGeneralMacros = (prevMacros: IngredientType): void => {
        state.customMealItem.ingredients[indexIngredient] = action.payload;

        state.customMealItem.totalProtein = fixProblemWithDecimals(
          state.customMealItem.totalProtein,
          action.payload.protein || 0,
          prevMacros.protein || 0,
        );
        state.customMealItem.totalCarbs = fixProblemWithDecimals(
          state.customMealItem.totalCarbs,
          action.payload.carbs || 0,
          prevMacros.carbs || 0,
        );
        state.customMealItem.totalFat = fixProblemWithDecimals(
          state.customMealItem.totalFat,
          action.payload.fat || 0,
          prevMacros.fat || 0,
        );
        state.customMealItem.totalCalories = fixProblemWithDecimals(
          state.customMealItem.totalCalories,
          action.payload.calories || 0,
          prevMacros.calories || 0,
        );
      };
      const indexIngredient = state.customMealItem.ingredients.findIndex(
        (ingredient) => ingredient.ingredientName === action.payload.ingredientName,
      );
      const prevIngredientMacros = state.customMealItem.ingredients[indexIngredient];
      recalculateGeneralMacros(prevIngredientMacros);
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
