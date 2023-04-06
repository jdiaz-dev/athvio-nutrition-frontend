import { combineReducers, createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  CustomRecipeBody,
  CustomRecipeInitialState,
  CustomRecipes,
  IngredientType,
} from 'src/modules/professionals/custom-recipes/adapters/out/customRecipe.types';
import { getUserFromLocalStorage } from 'src/shared/helpers/LocalStorage';

const initialState: CustomRecipeInitialState = {
  customRecipes: null,
  customRecipe: {
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
console.log('--------------hello from slice')
const customRecipesSlices = createSlice({
  name: 'customRecipes',
  initialState: initialState.customRecipes,
  reducers: {
    showCustomRecipes: (state, action: PayloadAction<CustomRecipes>) => {
      console.log('-----------action.type', action.type);
      console.log('-----------action.type', action);
      state = action.payload;
      return state;
    },
  },
});

export const { showCustomRecipes } = customRecipesSlices.actions;

export const customRecipeSlice = createSlice({
  name: 'customRecipe',
  initialState: initialState.customRecipe,
  // applyMiddleware(...middleware),
  reducers: {
    /*
      showCustomRecipes
      showCustomRecipeDetail
      reinitializeCustomRecipe

      refactor setupdateCustomRecipeName
    */
    /* showCustomRecipes: (state, action: PayloadAction<CustomRecipes>) => {
      console.log('-----------action.type', action.type);
      state.customRecipes = action.payload;
    }, */
    showCustomRecipeDetail: (state, action: PayloadAction<CustomRecipeBody | undefined>) => {
      if (action.payload) state = action.payload;
      return state;
    },
    reinitializeCustomRecipe: (state) => {
      state = initialState.customRecipe;
      return state;
    },
    renameCustomRecipeName: (state, action: PayloadAction<string>) => {
      state.name = action.payload;
      return state;
    },
    addIngredient: (state, action: PayloadAction<IngredientType>): any => {
      const indexIngredient = state.ingredients.findIndex(
        (ingredient) => ingredient.ingredientName === action.payload.ingredientName,
      );

      if (indexIngredient === -1) {
        state.ingredients.push(action.payload);
      } else {
        state.ingredients[indexIngredient].amount += action.payload.amount;
      }
      return state;
      // return state.ingredients[0];
    },
    addMacrosToIngredient: (state, action: PayloadAction<IngredientType>) => {
      const fixProblemWithDecimals = (state: number, current: number, prev: number) => {
        return (state * 100 + current * 100 - prev * 100) / 100;
      };

      const recalculateGeneralMacros = (prevMacros: IngredientType): void => {
        state.ingredients[indexIngredient] = action.payload;

        state.macros.protein = fixProblemWithDecimals(state.macros.protein, action.payload.protein || 0, prevMacros.protein || 0);
        state.macros.carbs = fixProblemWithDecimals(state.macros.carbs, action.payload.carbs || 0, prevMacros.carbs || 0);
        state.macros.fat = fixProblemWithDecimals(state.macros.fat, action.payload.fat || 0, prevMacros.fat || 0);
        state.macros.calories = fixProblemWithDecimals(
          state.macros.calories,
          action.payload.calories || 0,
          prevMacros.calories || 0,
        );
      };
      const indexIngredient = state.ingredients.findIndex(
        (ingredient) => ingredient.ingredientName === action.payload.ingredientName,
      );
      const prevIngredientMacros = state.ingredients[indexIngredient];
      recalculateGeneralMacros(prevIngredientMacros);
      return state;
    },
    removeIngredient: (state, action: PayloadAction<string>) => {
      const indexIngredient = state.ingredients.findIndex((ingredient) => ingredient.ingredientName === action.payload);
      state.ingredients.splice(indexIngredient, 1);
      return state;
    },
    renameCookingInstruction: (state, action: PayloadAction<string>) => {
      state.cookingInstruction = action.payload;
      return state;
    },
  },
});

export const myReducers = combineReducers({
  customRecipes: customRecipesSlices.reducer,
  customRecipe: customRecipeSlice.reducer,
});

/* export const crossSliceReducer = (state, action) => {
  if (action.type === 'CROSS_SLICE_ACTION') {
    const newName = action.payload + state.counter.value;
    const namesState = state.names;
    state = {
      ...state,
      names: { ...namesState, value: [...state.names.value, newName] },
    };
  }
  return state;
}; */

// export const myReducers = reducer(initialState, { type: 'CROSS_SLICE_ACTION', payload: 'test' });

export const {
  // showCustomRecipes,
  showCustomRecipeDetail,
  renameCustomRecipeName,
  addIngredient,
  addMacrosToIngredient,
  removeIngredient,
  renameCookingInstruction,
  reinitializeCustomRecipe,
} = customRecipeSlice.actions;

export default customRecipeSlice.reducer;
