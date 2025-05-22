import { ReduxItemtatus } from 'src/shared/Consts';

export type QuestionaryDetail = {
  _id: string;
  fieldName: string;
  associatedQuestion: string;
  // fieldOptions?: string | string[];
  isEnabled: boolean;
};

export type QuestionaryDetailState = QuestionaryDetail & {
  status: ReduxItemtatus;
};

export type QuestionaryGroup = {
  _id: string;
  title: string;
  description?: string;
  questionaryDetails: QuestionaryDetail[];
};

export type Questionary = {
  questionaryGroups: QuestionaryGroup[];
};

export type QuestionaryDetailAdditionalNote = {
  patientQuestionaryGroup: string;
  patientQuestionaryDetail: string;
  additionalNotes: string;
};
export type PatientQuestionaryBody = Questionary & {
  _id: string;
};

export type GetPatientQuestionaryBody = {
  patient: string;
  professional: string;
};

export type GetPatientQuestionaryRequest = {
  input: GetPatientQuestionaryBody;
};

export type GetPatientQuestionaryResponse = {
  getPatientQuestionary: PatientQuestionaryBody;
};

export type PatientQuestionaryInitialState = {
  patientQuestionary: PatientQuestionaryBody;
};
