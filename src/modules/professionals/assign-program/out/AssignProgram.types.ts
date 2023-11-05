import { Dayjs } from 'dayjs';
import { Meal } from 'src/shared/components/PlanDetailDialog/Meal.types';

export interface AssignedProgram {
  client: string;
  assignatedDate: Date;
  meals: Meal[];
}

export interface AssignProgramBody {
  professional: string;
  program: string;
  clients: string[];
  assignmentStartDate: Dayjs;
  startingDay: number;
}

export interface ClientToAssign {
  _id: string;
  firstName: string;
  lastName: string;
}
export interface AssignProgramInitialState extends Omit<AssignProgramBody, 'clients'> {
  clients: ClientToAssign[];
}

export interface AssignProgramRequest {
  input: AssignProgramBody;
}

export interface AssignProgramResponse {
  assignProgram: AssignedProgram[];
}
