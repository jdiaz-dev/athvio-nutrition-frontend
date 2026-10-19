export enum FunctionalScreeningScore {
  GOOD = 0, // 🟢 Buena función
  MODERATE = 1, // 🟡 Alteración moderada
  SEVERE = 2, // 🔴 Alteración importante
}

export interface Observation {
  uuid: string;
  key: string;
  label: string;
  value?: string | null;
}

export interface FunctionalScreening {
  uuid: string;
  question: string;
  score?: FunctionalScreeningScore | null;
  note?: string | null;
}

export interface GetBiologicalTerrainAssesmentDto {
  patient: string;
}

export interface BiologicalTerrainAssessment {
  uuid: string;
  patient: string;
  generalObservations: Observation[];
  functionalScreeningQuestions: FunctionalScreening[];
  totalScore: number;
  createdAt?: string;
  updatedAt?: string;
}


export interface ObservationValueInput {
  generalObservation: string;
  value?: string | null;
}

export interface FunctionalScreeningAnswerInput {
  functionalScreening: string;
  score?: FunctionalScreeningScore | null;
  note?: string | null;
}

export interface SaveBiologicalTerrainAssessmentInput {
  professional: string;
  patient: string;
  biologicalTerrainAssessment: string;
  generalObservations: ObservationValueInput[];
  functionalScreeningScores: FunctionalScreeningAnswerInput[];
}
