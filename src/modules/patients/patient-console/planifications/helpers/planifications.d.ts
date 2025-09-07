export type PatientInformation = {
  weight: number;
  height: number;
  age: number;
  gender: string;
  physicActivityName: string;
  physicActivityFactor: number;
};

export type CalculatedMacros = {
  proteinInPercentage: number;
  carbsInPercentage: number;
  fatInPercentage: number;
  totalProtein: number;
  totalCarbs: number;
  totalFat: number;
  basalEnergyRate: number;
  totalCalories: number;
  planCalories: number;
};

export type PlanificationBody = {
  uuid: string;
  patient: string;
  patientInformation: PatientInformation;
  configuredMacros: CalculatedMacros;
  createdAt: string;
};

export type CreatePlanificationInput = Omit<PlanificationBody, 'uuid'>;

export type CreatePlanificationRequest = {
  input: CreatePlanificationInput;
};

export type CreatePlanificationResponse = {
  createPlanification: PlanificationBody;
};

export type GetPlanificationsInput = {
  patient: string;
};

export type GetPlanificationsRequest = {
  input: GetPlanificationsInput;
};

export type GetPlanificationsResponse = {
  getPlanifications: PlanificationBody[];
};

export type UpdatePlanificationInput = CreatePlanificationInput & {
  planification: string;
};

export type UpdatePlanificationRequest = {
  input: UpdatePlanificationInput;
};

export type UpdatePlanificationResponse = {
  updatePlanification: PlanificationBody;
};

export type PlanificationInitialState = {
  planifications: PlanificationBody[];
  planification: PlanificationBody;
};
