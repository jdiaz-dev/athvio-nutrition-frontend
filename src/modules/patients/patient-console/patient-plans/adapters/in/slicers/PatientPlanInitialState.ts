import { PatientPlanInitialState } from 'src/modules/patients/patient-console/patient-plans/adapters/out/patientPlan.types';
import { defaultMealTag } from 'src/shared/Consts';

export const patientPlanInitialState: PatientPlanInitialState = {
  patientPlans: [],
  patientPlan: {
    _id: '',
    patient: '',
    title: '',
    assignedDate: new Date(),
    meals: [],
  },
  mealBasicInfo: {
    position: 0,
    mealTag: defaultMealTag,
    name: 'Meal name',
  },
  mealList: [],
  mealDetails: {
    _id: '',
    ingredientDetails: [],
    cookingInstructions: '',
    macros: {
      protein: 0,
      carbs: 0,
      fat: 0,
      calories: 0,
      weightInGrams: 0,
    },
  },
};
