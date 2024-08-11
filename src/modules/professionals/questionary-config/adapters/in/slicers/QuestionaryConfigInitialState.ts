import { QuestionaryConfigInitialState } from 'src/modules/professionals/questionary-config/adapters/out/QuestionaryConfig';

export const questionaryConfigInitialState: QuestionaryConfigInitialState = {
  questionaryConfig: {
    _id: '',
    professional: '',
    questionaryGroups: [],
  },
  questionaryDetails:[],
  enableQuestionaryDetails: [],
  otherQuestionaryDetail: {
    _id: '',
    fieldName: '',
    associatedQuestion: '',
    enabled: true,
  },
};
