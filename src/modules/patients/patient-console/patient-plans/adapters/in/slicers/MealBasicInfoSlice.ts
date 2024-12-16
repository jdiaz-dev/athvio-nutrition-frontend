import { programInitialState } from 'src/modules/professionals/programs/adapters/in/slicers/ProgramInitialState';
import { mealBasicInfoSlice as mealBasicInfoSlicer } from 'src/shared/components/PlanDetailDialog/MealBasicInfoSlice';

export const patientPlanMealBasicInfoSlice = mealBasicInfoSlicer('mealBasicInfo', programInitialState.mealBasicInfo);

export const { acceptNewMealBasicInfo, renameMealTag } = patientPlanMealBasicInfoSlice.actions;
