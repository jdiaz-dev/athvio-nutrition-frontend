import { combineReducers, createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  CustomRecipeInitialState,
  CustomRecipes,
  IngredientType,
  MealDataForBuilder,
} from 'src/modules/professionals/custom-recipes/adapters/out/customRecipe.types';
import { getUserFromLocalStorage } from 'src/shared/helpers/LocalStorage';

const initialState: CustomRecipeInitialState = {
  customRecipes: null,
  customRecipe: {
    _id: '',
    professional: getUserFromLocalStorage()._id,
    name: '',
    ingredients: [],
    cookingInstruction: '',
    macros: {
      protein: 0,
      carbs: 0,
      fat: 0,
      calories: 0,
    },
  },
};
const customRecipesSlices = createSlice({
  name: 'customRecipes',
  initialState: initialState.customRecipes,
  reducers: {
    showCustomRecipes: (state, action: PayloadAction<CustomRecipes>) => {
      state = action.payload;
      return state;
    },
  },
});

export const { showCustomRecipes } = customRecipesSlices.actions;

export const customRecipeSlicer = (sliceName: string, initState: MealDataForBuilder) => {
  return createSlice({
    name: sliceName,
    initialState: initState,
    reducers: {
      acceptNewMealDetail: (state, action: PayloadAction<MealDataForBuilder | undefined>) => {
        if (action.payload) {
          state = action.payload;
        }
        return state;
      },
      reinitializeMeal: (state) => {
        state = initialState.customRecipe;
        return state;
      },
      renameMealName: (state, action: PayloadAction<string>) => {
        state.name = action.payload;
        return state;
      },
      addIngredient: (state, action: PayloadAction<IngredientType>) => {
        const indexIngredient = state.ingredients.findIndex((ingredient) => ingredient.name === action.payload.name);

        if (indexIngredient === -1) {
          state.ingredients.push(action.payload);
        } else {
          state.ingredients[indexIngredient].amount += action.payload.amount;
        }
        return state;
      },
      addMacrosToIngredient: (state, action: PayloadAction<IngredientType>) => {

        const fixProblemWithDecimals = (state: number, current: number, prev: number) => {
          const _prev = state < prev ? -prev : prev;
          return (state * 100 + current * 100 - _prev * 100) / 100;
        };

        const recalculateGeneralMacros = (prevMacros: IngredientType): void => {
          state.ingredients[indexIngredient] = action.payload;

          state.macros.protein = fixProblemWithDecimals(state.macros.protein, action.payload.protein || 0, prevMacros.protein || 0);
          state.macros.carbs = fixProblemWithDecimals(state.macros.carbs, action.payload.carbs || 0, prevMacros.carbs || 0);
          state.macros.fat = fixProblemWithDecimals(state.macros.fat, action.payload.fat || 0, prevMacros.fat || 0);
          state.macros.calories = fixProblemWithDecimals(state.macros.calories, action.payload.calories || 0, prevMacros.calories || 0);
        };
        const indexIngredient = state.ingredients.findIndex((ingredient) => ingredient.name === action.payload.name);
        const prevIngredientMacros = state.ingredients[indexIngredient];
        recalculateGeneralMacros(prevIngredientMacros);
        return state;
      },
      removeIngredient: (state, action: PayloadAction<string>) => {
        const indexIngredient = state.ingredients.findIndex((ingredient) => ingredient.name === action.payload);
        state.ingredients.splice(indexIngredient, 1);
        return state;
      },
      renameCookingInstruction: (state, action: PayloadAction<string>) => {
        state.cookingInstruction = action.payload;
        return state;
      },
    },
  });
};

const custoRecipeSlice = customRecipeSlicer('customRecipe', initialState.customRecipe);

export const {
  acceptNewMealDetail,
  renameMealName,
  addIngredient,
  addMacrosToIngredient,
  removeIngredient,
  renameCookingInstruction,
  reinitializeMeal,
} = custoRecipeSlice.actions;

export default combineReducers({
  customRecipes: customRecipesSlices.reducer,
  customRecipe: custoRecipeSlice.reducer,
});
