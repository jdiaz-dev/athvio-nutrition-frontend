import { Dayjs } from 'dayjs';
import { Meal } from 'src/shared/components/PlanDetailDialog/Meal.types';

export interface AssignedProgram {
  patient: string;
  assignatedDate: Date;
  meals: Meal[];
}

export interface AssignProgramBody {
  professional: string;
  program: string;
  patients: string[];
  assignmentStartDate: string;
  startingDay: number;
}

export interface PatientToAssign {
  _id: string;
  firstname: string;
  lastname: string;
}
export interface AssignProgramInitialState extends Omit<AssignProgramBody, 'patients'> {
  patients: PatientToAssign[];
}

export interface AssignProgramRequest {
  input: AssignProgramBody;
}

export interface AssignProgramResponse {
  assignProgram: AssignedProgram[];
}
