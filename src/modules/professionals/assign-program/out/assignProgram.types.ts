import { Meal } from "src/shared/components/PlanDetailDialog/Meal.types";

export interface AssignedProgram {
  client: string;
  assignatedDate: Date;
  meals: Meal[];
}

export interface AssignProgramRequest {
  professional: string;
  program: string;
  client: string;
  assignmentStartDay: Date;
  startingDay: number;
}

export interface AssignProgramResponse {
  assignProgram: AssignedProgram[];
}
