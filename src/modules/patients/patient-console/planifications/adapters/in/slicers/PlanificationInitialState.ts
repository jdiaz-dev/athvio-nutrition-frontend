import { PlanificationInitialState } from 'src/modules/patients/patient-console/planifications/helpers/planifications';

export const planificationInitialState: PlanificationInitialState = {
  planifications: [],
  planification: {
    uuid: '',
    patient: '',
    patientInformation: {
      weight: 11,
      height: 111,
      age: 11,
      gender: 'male',
      physicActivityName: '',
      physicActivityFactor: 0,
    },
    configuredMacros: {
      proteinInPercentage: 0,
      carbsInPercentage: 0,
      fatInPercentage: 0,
      proteinDensity: 0,
      carbsDensity: 0,
      fatDensity: 0,
      totalProtein: 0,
      totalCarbs: 0,
      totalFat: 0,
      basalEnergyRate: 0,
      totalCalories: 0,
      planCalories: 0,
    },
    createdAt: '',
  },
};
