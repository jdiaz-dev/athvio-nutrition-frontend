import { PatientQuestionaryInitialState } from 'src/modules/questionaries/patient-questionaries/adapters/out/PatientQuestionary';

export const patientQuestionaryInitialState: PatientQuestionaryInitialState = {
  patientQuestionary: {
    _id: '',
    professional: '',
    patient: '',
    questionaryGroups: [],
  },
  patientQuestionaryDetails: [],
};
