import { QuestionaryConfigInitialState } from 'src/modules/professionals/questionary-config/adapters/out/QuestionaryConfig';

export const questionaryConfigInitialState: QuestionaryConfigInitialState = {
  questionaryConfig: {
    _id: '',
    professional: '',
    questionaryGroups: [],
  },
  questionaryDetails:[],
  isEnabledQuestionaryDetails: [],
  otherQuestionaryDetail: {
    _id: '',
    fieldName: '',
    associatedQuestion: '',
    isEnabled: true,
  },
};
