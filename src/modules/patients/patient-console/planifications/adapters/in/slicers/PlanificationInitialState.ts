import { PlanificationInitialState } from 'src/modules/patients/patient-console/planifications/helpers/planifications';

export const planificationInitialState: PlanificationInitialState = {
  planifications: [],
  planification: {
    uuid: '',
    patient: '',
    patientInformation: {
      weight: 0,
      height: 0,
      age: 0,
      gender: '',
      physicActivityName: '',
      physicActivityFactor: 0,
    },
    configuredMacros: {
      protein: 0,
      carbs: 0,
      fat: 0,
      calories: 0,
    },
    createdAt: '',
  },
};
