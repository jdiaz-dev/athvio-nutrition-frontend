import { programInitialState } from 'src/modules/professionals/programs/adapters/in/slicers/ProgramInitialState';
import { mealBasicInfoSlice as mealBasicInfoSlicer } from 'src/shared/components/PlanDetailDialog/MealBasicInfoSlice';

export const programPlanMealBasicInfoSlice = mealBasicInfoSlicer('mealBasicInfo', programInitialState.mealBasicInfo);

export const { acceptNewMealBasicInfo, renameMealTag, changeName, setImage } = programPlanMealBasicInfoSlice.actions;
