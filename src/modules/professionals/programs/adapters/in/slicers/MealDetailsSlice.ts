import { programInitialState } from 'src/modules/professionals/programs/adapters/in/slicers/ProgramInitialState';
import { mealBuilderSlice } from 'src/shared/components/MealBuilder/MealBuilderSlice';

export const programPlanMealDetailsSlice = mealBuilderSlice('mealDetails', programInitialState.mealDetails);

export const { acceptNewMealDetail, addIngredient, updateAmountIngredient,  removeIngredient, renameCookingInstruction, reinitializeMeal } =
  programPlanMealDetailsSlice.actions;
