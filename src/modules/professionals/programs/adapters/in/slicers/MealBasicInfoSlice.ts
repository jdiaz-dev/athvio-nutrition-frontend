import { programInitialState } from 'src/modules/professionals/programs/adapters/in/slicers/ProgramInitialState';
import { mealBasicInfoSlice as mealBasicInfoSlicer } from 'src/shared/components/MealDetails/MealBasicInfoSlice';

export const mealBasicInfoSlice = mealBasicInfoSlicer('mealBasicInfo', programInitialState.mealBasicInfo);

export const { acceptNewMealBasicInfo, renameMealTag } = mealBasicInfoSlice.actions;
