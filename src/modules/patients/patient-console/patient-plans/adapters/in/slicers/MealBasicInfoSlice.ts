import { patientPlanInitialState } from 'src/modules/patients/patient-console/patient-plans/adapters/in/slicers/PatientPlanInitialState';
import { mealBasicInfoSlice as mealBasicInfoSlicer } from 'src/shared/components/PlanDetailDialog/MealBasicInfoSlice';

export const patientPlanMealBasicInfoSlice = mealBasicInfoSlicer('mealBasicInfo', patientPlanInitialState.mealBasicInfo);

export const { acceptNewMealBasicInfo, renameMealTag, changeName } = patientPlanMealBasicInfoSlice.actions;
