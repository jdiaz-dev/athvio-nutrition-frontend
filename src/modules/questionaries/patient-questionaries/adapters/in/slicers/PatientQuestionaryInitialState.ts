import { PatientQuestionaryInitialState } from 'src/modules/questionaries/patient-questionaries/adapters/out/PatientQuestionary';

export const patientQuestionaryInitialState: PatientQuestionaryInitialState = {
  patientQuestionary: {
    uuid: '',
    professional: '',
    patient: '',
    questionaryGroups: [],
  },
  patientQuestionaryDetails: [],
};
