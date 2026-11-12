import { ReduxItemtatus } from 'src/shared/Consts';

export enum OptionType {
  MULTIPLE_SELECTOR = 'multiple_selector',
  TEXT = 'text',
  SELECTOR = 'selector',
  BOOLEAN = 'boolean',
  HOUR = 'hour',
}

export type Option = {
  uuid: string;
  name: string;
};

export type PatientQuestionaryDetail = {
  uuid: string;
  fieldName: string;
  associatedQuestion: string;
  answer: string;
  additionalNotes: string;
  options?: Option[];
  optionType: OptionType;
};

export type QuestionaryDetailState = PatientQuestionaryDetail & {
  status: ReduxItemtatus;
};

export type PatientQuestionaryGroup = {
  uuid: string;
  title: string;
  description?: string;
  questionaryDetails: PatientQuestionaryDetail[];
};

export type PatientQuestionaryBody = {
  uuid: string;
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

export type PatientQuestionaryAnswersInput = {
  questionaryDetail: string;
  answer: string;
};

export type AnswersAndAdditionalNotesInput = PatientQuestionaryAnswersInput & {
  additionalNotes: string;
};

export type PatientQuestionaryGroupInput<T> = {
  questionaryGroup: string;
  questionaryDetails: T[];
};

export type UpdateAnswersInput = {
  patient: string;
  professional: string;
  questionary: string;
  questionaryGroups: PatientQuestionaryGroupInput<PatientQuestionaryAnswersInput>[];
};
export type UpdateAnswersAndAdditionalNotesInput = UpdateAnswersInput & {
  questionaryGroups: PatientQuestionaryGroupInput<AnswersAndAdditionalNotesInput>[];
};

export type UpdatePatientQuestionaryAnswersRequest = {
  input: UpdateAnswersInput;
};

export type UpdatePatientQuestionaryAnswersResponse = {
  updatePatientQuestionaryAnswers: PatientQuestionaryBody;
};

export type UpdateAnswersAndAdditionalNotesRequest = {
  input: UpdateAnswersAndAdditionalNotesInput;
};

export type UpdateAnswersAndAdditionalNotesResponse = {
  updateAnswersAndAdditionalNotes: PatientQuestionaryBody;
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
