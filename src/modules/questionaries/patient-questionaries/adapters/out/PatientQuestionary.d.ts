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
  professional: string;
  patient: string;
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

export type PatientQuestionaryDetailInput = {
  questionaryDetail: string;
  answer: string;
  additionalNotes: string;
};

export type PatientQuestionaryGroupInput = {
  questionaryGroup: string;
  questionaryDetails: PatientQuestionaryDetailInput[];
};

export type UpdateAnswerAndAdditionalNotesInput = {
  patient: string;
  professional: string;
  questionary: string;
  questionaryGroups: PatientQuestionaryGroupInput[];
};

export type UpdateAnswerAndAdditionalNotesRequest = {
  input: UpdateAnswerAndAdditionalNotesInput;
};

export type UpdateAnswerAndAdditionalNotesResponse = {
  updateAnswerAndAdditionalNotes: PatientQuestionaryBody;
};

export type SendPatientQuestionaryBody = {
  patient: string;
  professional: string;
  questionary: string;
};

export type SendPatientQuestionaryRequest = {
  input: SendPatientQuestionaryBody;
};

export type SendPatientQuestionaryResponse = {
  sendPatientQuestionary: boolean;
};

export type PatientQuestionaryInitialState = {
  patientQuestionary: PatientQuestionaryBody;
  patientQuestionaryDetails: PatientQuestionaryDetail[];
};
