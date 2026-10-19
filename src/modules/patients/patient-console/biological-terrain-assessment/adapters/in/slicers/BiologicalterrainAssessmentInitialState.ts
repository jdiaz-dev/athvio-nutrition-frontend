import { BiologicalTerrainAssessment } from 'src/modules/patients/patient-console/biological-terrain-assessment/adapters/out/BiologicalterrainAssessment';

export interface BiologicalTerrainAssessmentState {
  data: BiologicalTerrainAssessment | null;
  loading: boolean; // true while fetching the record from the server
  saving: boolean; // true while GUARDAR's save request is in flight
  error: string | null;
}

export const biologicalTerrainAssessmentInitialState: BiologicalTerrainAssessmentState = {
  data: null,
  loading: false,
  saving: false,
  error: null,
};
