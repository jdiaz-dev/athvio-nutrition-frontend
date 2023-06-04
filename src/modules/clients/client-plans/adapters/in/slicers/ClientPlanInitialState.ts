import { ClientPlanInitialState } from 'src/modules/clients/client-plans/adapters/out/clientPlan.types';

export const defaultMealTag = 'First meal';
export const clientPlanInitialState: ClientPlanInitialState = {
  clientPlans: null,
  clientPlan: {
    _id: '',
    client: '',
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
