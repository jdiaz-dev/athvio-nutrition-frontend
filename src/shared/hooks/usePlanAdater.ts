import { usePlan } from 'src/modules/professionals/programs/adapters/out/PlanActions';
import { Modules } from 'src/shared/Consts';
import { Meal } from 'src/shared/components/PlanDetailDialog/Meal.types';
/* 
  professional
  program  entityOwnerOfMealsId 
  week day  -   assigmentOfMeals
  planBody {  - bodyWithMeals
      title
      week
      day
      meals
  }

  professional
  patient
  assignedDate -   assigmentMeals
  meals
*/

export type AssigmentForProgram = { week: number; day: number };
export type AssigmentForPlan = { assignedDate: string };
export type MealsForProgram = { title: string; meals: Meal[] };
export type MealsForPlan = { meals: Meal[] };
type CreatePlanData<T, X> = {
  professional: string;
  entityOwnerOfMealsId: string;
  assigmentOfMeals: T extends AssigmentForProgram ? AssigmentForProgram : AssigmentForPlan;
  bodyWithMeals: X extends MealsForProgram ? MealsForProgram : MealsForPlan;
};
export const usePlanAdapter = (currentModule: string) => {
  const { createProgramPlan } = usePlan();

  const createPlan = async <T, X>({ professional, entityOwnerOfMealsId, assigmentOfMeals, bodyWithMeals }: CreatePlanData<T, X>) => {
    if (currentModule === Modules.PROGRAMS) {
      await createProgramPlan({
        professional,
        program: entityOwnerOfMealsId,
        planBody: {
          week: (assigmentOfMeals as AssigmentForProgram).week,
          day: (assigmentOfMeals as AssigmentForProgram).day,
          title: (bodyWithMeals as MealsForProgram).title,
          meals: (bodyWithMeals as MealsForProgram).meals,
        },
      });
    }
  };

  return {
    createPlan,
  };
};
