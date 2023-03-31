import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ProgramBody, ProgramInitialState, Programs } from 'src/modules/professionals/programs/adapters/out/program.types';
import { getUserFromLocalStorage } from 'src/shared/helpers/LocalStorage';

const initialState: ProgramInitialState = {
  programList: null,
  programItem: {
    professional: getUserFromLocalStorage()._id,
    _id: '',
    name: '',
    description: '',
    programTags: [],
    plans: [],
  },
};

export const programSlice = createSlice({
  name: 'programs',
  initialState,
  reducers: {
    setProgramList: (state, action: PayloadAction<Programs>) => {
      state.programList = action.payload;
    },
    setProgramItem: (state, action: PayloadAction<ProgramBody>) => {
      state.programItem = action.payload;
    },
    setNameAndDescription: (state, action: PayloadAction<Pick<ProgramBody, 'name' | 'description'>>) => {
      state.programItem.name = action.payload.name;
      state.programItem.description = action.payload.description;
    },
    /* updateProgramItem: (state, action: PayloadAction<ProgramBody>) => {
      state.programItem = action.payload;
    }, */
    /*
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

    */
    resetProgramItem: (state) => {
      state.programItem = initialState.programItem;
    },
  },
});

export const {
  setProgramList,
  setProgramItem,
  setNameAndDescription,
  //   updateProgramItem,
  /* updateCustomMealName,
  addIngredient,
  updateIngredient,
  removeIngredient,
  updateRecipe,
  */
  resetProgramItem,
} = programSlice.actions;

export default programSlice.reducer;
