import { ProgramInitialState } from 'src/modules/professionals/programs/adapters/out/program.types';

export const defaultMealTag = 'First meal';
export const programInitialState: ProgramInitialState = {
  programs: null,
  program: {
    data: { professional: '', _id: '', name: '', description: '', programTags: [], plans: [] },
    loading: false,
    error: null,
  },
  plans: [],
  plan: {
    _id: '',
    title: '',
    week: 0,
    day: 0,
    meals: [],
  },
  meals: [],
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
