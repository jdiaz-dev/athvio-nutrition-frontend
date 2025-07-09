import { Plan, ProgramBody } from 'src/modules/professionals/programs/adapters/out/program.types';
import { Meal } from 'src/shared/components/PlanDetailDialog/Meal.types';

type MealBody = Omit<Meal, 'uuid'>;
type PlanBody = Pick<Plan, 'title' | 'week' | 'day'> & {
  meals: MealBody[];
};

export interface CreateProgramPlanBody {
  professional: string;
  program: string;
  planBody: PlanBody;
}

export interface UpdatePlanAssignedWeekDayBody extends CreateProgramPlanBody {
  professional: string;
  program: string;
  plan: string;
}

export type DuplicateProgramPlanBody = UpdatePlanAssignedWeekDayBody;
export interface CreateProgramPlanRequest {
  input: CreateProgramPlanBody;
}

export interface CreateProgramPlanResponse {
  addProgramPlan: ProgramBody;
}

export interface UpdatePlanAssignedWeekDayRequest {
  input: UpdatePlanAssignedWeekDayBody;
}

export interface UpdatePlanAssignedWeekDayResponse {
  updatePlanAssignedWeekDay: ProgramBody;
}

export interface DuplicateProgramPlanRequest {
  input: DuplicateProgramPlanBody;
}

export interface DuplicateProgramPlanResponse {
  duplicateProgramPlan: ProgramBody;
}

export interface DeleteProgramPlanBody {
  professional: string;
  program: string;
  plan: string;
}
export interface DeleteProgramPlanRequest {
  input: DeleteProgramPlanBody;
}

export interface DeleteProgramPlanResponse {
  deleteProgramPlan: ProgramBody;
}
