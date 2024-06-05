import { PatientPlanInitialState } from 'src/modules/patients/patient-console/patient-plans/adapters/out/patientPlan.types';

export const defaultMealTag = 'First meal';
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
