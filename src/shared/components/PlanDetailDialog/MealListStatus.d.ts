import { ReduxItemtatus } from 'src/shared/Consts';
import { Meal } from 'src/shared/components/PlanDetailDialog/Meal.types';

export type MealWithStatus = Meal & {
  status: ReduxItemtatus;
};
