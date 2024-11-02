import { Modules } from 'src/shared/Consts';
import { usePlanMeal } from 'src/modules/professionals/programs/adapters/out/MealActions';
import { usePatientPlanMeal } from 'src/modules/patients/patient-console/patient-plans/adapters/out/PlanMealActions';
import { Meal } from 'src/shared/components/PlanDetailDialog/Meal.types';

interface CreateMeal {
  professional: string;
  domainOwnerId: string;
  planOwnerId: string;
  mealBody: Omit<Meal, '_id'>;
}

interface UpdateMeal extends CreateMeal {
  meal: string;
}

interface DeleteMeal extends Omit<CreateMeal, 'mealBody'> {
  meal: string;
}

export const useMealDetailAdapter = (currentModule: string) => {
  const { createPlanMeal, updatePlanMeal, deletePlanMeal } = usePlanMeal();
  const { createPatientPlanMeal, updatePatientPlanMeal, deletePatientPlanMeal } = usePatientPlanMeal();

  const createMeal = async (data: CreateMeal) => {
    if (currentModule === Modules.PROGRAMS) {
      await createPlanMeal({
        professional: data.professional,
        program: data.domainOwnerId,
        plan: data.planOwnerId,
        mealBody: data.mealBody,
      });
    } else if (currentModule === Modules.CLIENT_PLANS) {
      await createPatientPlanMeal({
        professional: data.professional,
        patient: data.domainOwnerId,
        patientPlan: data.planOwnerId,
        mealBody: data.mealBody,
      });
    }
  };

  const updateMeal = async (data: UpdateMeal) => {
    if (currentModule === Modules.PROGRAMS) {
      await updatePlanMeal({
        professional: data.professional,
        program: data.domainOwnerId,
        plan: data.planOwnerId,
        meal: data.meal,
        mealBody: data.mealBody,
      });
    } else {
      await updatePatientPlanMeal({
        professional: data.professional,
        patient: data.domainOwnerId,
        patientPlan: data.planOwnerId,
        meal: data.meal,
        mealBody: data.mealBody,
      });
    }
  };

  const deleteMeal = async (data: DeleteMeal) => {
    if (currentModule === Modules.PROGRAMS) {
      await deletePlanMeal({
        professional: data.professional,
        program: data.domainOwnerId,
        plan: data.planOwnerId,
        meal: data.meal,
      });
    } else {
      await deletePatientPlanMeal({
        professional: data.professional,
        patient: data.domainOwnerId,
        patientPlan: data.planOwnerId,
        meal: data.meal,
      });
    }
  };

  return { 
  createMeal, updateMeal, deleteMeal };
};
