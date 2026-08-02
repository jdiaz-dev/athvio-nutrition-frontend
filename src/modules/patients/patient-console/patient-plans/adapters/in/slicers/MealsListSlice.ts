import { mealListInitialState } from 'src/shared/components/PlanDetailDialog/MealListInitialState';
import { mealListSlicer } from 'src/shared/components/PlanDetailDialog/MealListSlice';

export const mealListSlice = mealListSlicer('mealList', mealListInitialState);

export const { initializeMeals, addMeal, updateMeal, reorderMeals, deleteMeal } = mealListSlice.actions;
