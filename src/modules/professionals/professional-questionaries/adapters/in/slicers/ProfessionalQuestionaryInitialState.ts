import { ProfessionalQuestionaryInitialState } from 'src/modules/professionals/professional-questionaries/adapters/out/ProfessionalQuestionary';

export const professionalQuestionaryInitialState: ProfessionalQuestionaryInitialState = {
  professionalQuestionary: {
    uuid: '',
    professional: '',
    questionaryGroups: [],
  },
  questionaryDetails: [],
  isEnabledQuestionaryDetails: [],
  customQuestionaryDetails: [],
};
