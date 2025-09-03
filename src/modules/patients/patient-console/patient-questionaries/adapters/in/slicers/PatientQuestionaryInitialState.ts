import { PatientQuestionaryInitialState } from 'src/modules/patients/patient-console/patient-questionaries/adapters/out/PatientQuestionary';

export const patientQuestionaryInitialState: PatientQuestionaryInitialState = {
  patientQuestionary: {
    uuid: '',
    professional: '',
    patient: '',
    questionaryGroups: [],
  },
  patientQuestionaryDetails: [],
};
