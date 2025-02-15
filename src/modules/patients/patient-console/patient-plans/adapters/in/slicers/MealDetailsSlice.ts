import { patientPlanInitialState } from 'src/modules/patients/patient-console/patient-plans/adapters/in/slicers/PatientPlanInitialState';
import { mealBuilderSlice } from 'src/shared/components/MealBuilder/MealBuilderSlice';

export const patientPlanMealDetailsSlice = mealBuilderSlice('mealDetails', patientPlanInitialState.mealDetails);

export const { acceptNewMealDetail, addIngredient, removeIngredient, renameCookingInstruction, reinitializeMeal } =
  patientPlanMealDetailsSlice.actions;
