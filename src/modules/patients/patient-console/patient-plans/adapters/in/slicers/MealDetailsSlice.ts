import { patientPlanInitialState } from 'src/modules/patients/patient-console/patient-plans/adapters/in/slicers/PatientPlanInitialState';
import { recipeBuilderSlice } from 'src/shared/components/MealBuilder/MealBuilderSlice';

export const mealDetailsSlice = recipeBuilderSlice('mealDetails', patientPlanInitialState.mealDetails);

export const { acceptNewMealDetail, addIngredient, removeIngredient, renameCookingInstruction, reinitializeMeal } =
  mealDetailsSlice.actions;
