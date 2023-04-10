import { combineReducers, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { customRecipeSlicer } from 'src/modules/professionals/custom-recipes/adapters/in/CustomRecipeSlice';
import { ProgramBody, ProgramInitialState, Programs } from 'src/modules/professionals/programs/adapters/out/program.types';
import { getUserFromLocalStorage } from 'src/shared/helpers/LocalStorage';

export const programInitialState: ProgramInitialState = {
  programs: null,
  program: {
    professional: getUserFromLocalStorage()._id,
    _id: '',
    name: '',
    description: '',
    programTags: [],
    plans: [],
  },
  mealPlan: {
    _id: '',
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

const programsSlice = createSlice({
  name: 'programs',
  initialState: programInitialState.programs,
  reducers: {
    setProgramList: (state, action: PayloadAction<Programs>) => {
      state = action.payload;
      return state;
    },
  },
});

export const { setProgramList } = programsSlice.actions;

export const programSlice = createSlice({
  name: 'program',
  initialState: programInitialState.program,
  reducers: {
    setProgramItem: (state, action: PayloadAction<ProgramBody>) => {
      state = action.payload;
      return state;
    },
    setNameAndDescription: (state, action: PayloadAction<Pick<ProgramBody, 'name' | 'description'>>) => {
      state.name = action.payload.name;
      state.description = action.payload.description;
      return state;
    },
    /* updateProgramItem: (state, action: PayloadAction<ProgramBody>) => {
      state.programItem = action.payload;
    }, */
    /*
    updateCustomRecipeName: (state, action: PayloadAction<string>) => {
      state.customRecipeItem.name = action.payload;
    },
    addIngredient: (state, action: PayloadAction<IngredientType>) => {
      const indexIngredient = state.customRecipeItem.ingredients.findIndex(
        (ingredient) => ingredient.name === action.payload.name,
      );

      if (indexIngredient === -1) {
        state.customRecipeItem.ingredients.push(action.payload);
      } else {
        state.customRecipeItem.ingredients[indexIngredient].amount += action.payload.amount;
      }
    },
    updateIngredient: (state, action: PayloadAction<IngredientType>) => {
      const fixProblemWithDecimals = (state: number, current: number, prev: number) => {
        return (state * 100 + current * 100 - prev * 100) / 100;
      };

      const recalculateGeneralMacros = (prevMacros: IngredientType): void => {
        state.customRecipeItem.ingredients[indexIngredient] = action.payload;

        state.customRecipeItem.totalProtein = fixProblemWithDecimals(
          state.customRecipeItem.totalProtein,
          action.payload.protein || 0,
          prevMacros.protein || 0,
        );
        state.customRecipeItem.totalCarbs = fixProblemWithDecimals(
          state.customRecipeItem.totalCarbs,
          action.payload.carbs || 0,
          prevMacros.carbs || 0,
        );
        state.customRecipeItem.totalFat = fixProblemWithDecimals(
          state.customRecipeItem.totalFat,
          action.payload.fat || 0,
          prevMacros.fat || 0,
        );
        state.customRecipeItem.totalCalories = fixProblemWithDecimals(
          state.customRecipeItem.totalCalories,
          action.payload.calories || 0,
          prevMacros.calories || 0,
        );
      };
      const indexIngredient = state.customRecipeItem.ingredients.findIndex(
        (ingredient) => ingredient.name === action.payload.name,
      );
      const prevIngredientMacros = state.customRecipeItem.ingredients[indexIngredient];
      recalculateGeneralMacros(prevIngredientMacros);
    },
    removeIngredient: (state, action: PayloadAction<string>) => {
      const indexIngredient = state.customRecipeItem.ingredients.findIndex(
        (ingredient) => ingredient.name === action.payload,
      );
      state.customRecipeItem.ingredients.splice(indexIngredient, 1);
    },
    updateRecipe: (state, action: PayloadAction<string>) => {
      state.customRecipeItem.recipe = action.payload;
    },

    */
    resetProgramItem: (state) => {
      state = programInitialState.program;
      return state;
    },
  },
});

const mealSlice = customRecipeSlicer('mealPlan', programInitialState.mealPlan);

export const {
  // showCustomRecipes,
  acceptNewMealDetail,
  renameMealName,
  addIngredient,
  addMacrosToIngredient,
  removeIngredient,
  renameCookingInstruction,
  reinitializeMeal,
} = mealSlice.actions;

export const {
  setProgramItem,
  setNameAndDescription,
  //   updateProgramItem,
  /* updateCustomRecipeName,
  addIngredient,
  updateIngredient,
  removeIngredient,
  updateRecipe,
  */
  resetProgramItem,
} = programSlice.actions;

export default combineReducers({
  programs: programsSlice.reducer,
  program: programSlice.reducer,
  mealPlan: mealSlice.reducer,
});
