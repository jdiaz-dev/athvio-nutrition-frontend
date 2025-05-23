import { ReduxItemtatus } from 'src/shared/Consts';

export type PatientQuestionaryDetail = {
  _id: string;
  fieldName: string;
  associatedQuestion: string;
  answer: string;
  additionalNotes: string;
  // fieldOptions?: string | string[];
};

export type QuestionaryDetailState = PatientQuestionaryDetail & {
  status: ReduxItemtatus;
};

export type PatientQuestionaryGroup = {
  _id: string;
  title: string;
  description?: string;
  questionaryDetails: PatientQuestionaryDetail[];
};

export type PatientQuestionaryBody = {
  _id: string;
  questionaryGroups: PatientQuestionaryGroup[];
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
  patientQuestionaryGroups: PatientQuestionaryGroup[];
  patientQuestionaryDetails: PatientQuestionaryDetail[];
};
