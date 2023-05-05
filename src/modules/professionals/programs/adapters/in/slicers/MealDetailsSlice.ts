import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { programInitialState } from 'src/modules/professionals/programs/adapters/in/slicers/ProgramInitialState';
import { MealDetails } from 'src/modules/professionals/programs/adapters/out/program.types';
import { recipeBuilderSlice } from 'src/shared/components/MealBuilder/MealBuilderSlice';

/* export const mealDetailsSlice = createSlice({
  name: 'mealDetails',
  initialState: programInitialState.mealDetails,
  reducers: {
    acceptNewMealDetail: (state, action: PayloadAction<MealDetails>) => {
      state = action.payload;
      return state;
    },
  },
});
 */
export const mealDetailsSlice = recipeBuilderSlice('customRecipeDetails', programInitialState.mealDetails);

export const { acceptNewMealDetail, addIngredient, removeIngredient, renameCookingInstruction, reinitializeMeal } =
  mealDetailsSlice.actions;
