import { Plan, ProgramBody } from 'src/modules/professionals/programs/adapters/out/program.types';

export interface CreateProgramPlanBody extends Omit<Plan, '_id' | 'title' | 'mealPlans'> {
  professional: string;
  program: string;
}
export interface CreateProgramPlanRequest {
  input: CreateProgramPlanBody;
}

export interface CreateProgramPlanResponse {
  addProgramPlan: ProgramBody;
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
