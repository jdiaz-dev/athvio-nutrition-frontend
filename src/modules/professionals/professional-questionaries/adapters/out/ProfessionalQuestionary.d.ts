import { ReduxItemtatus } from 'src/shared/Consts';

export type QuestionaryDetail = {
  uuid: string;
  fieldName: string;
  associatedQuestion: string;
  // fieldOptions?: string | string[];
  isEnabled: boolean;
};

export type QuestionaryDetailState = QuestionaryDetail & {
  status: ReduxItemtatus;
};

export type QuestionaryGroup = {
  uuid: string;
  title: string;
  description?: string;
  questionaryDetails: QuestionaryDetail[];
};

export type Questionary = {
  questionaryGroups: QuestionaryGroup[];
};

export type ProfessionalQuestionaryBody = Questionary & {
  uuid: string;
  professional: string;
};

export type GetProfessionalQuestionaryBody = {
  professional: string;
};

export type GetProfessionalQuestionaryRequest = {
  input: GetProfessionalQuestionaryBody;
};

export type GetProfessionalQuestionaryResponse = {
  getProfessionalQuestionary: ProfessionalQuestionaryBody;
};

export type IsEnabledQuestionaryDetails = Pick<QuestionaryDetail, 'isEnabled'> & { questionaryDetail: string };

export type EnableQuestionaryDetailsBody = {
  questionary: string;
  professional: string;
  questionaryGroup: string;
  questionaryDetails: IsEnabledQuestionaryDetails[];
};

export type EnableQuestionaryDetailRequest = {
  input: EnableQuestionaryDetailsBody;
};

export type EnableQuestionaryDetailResponse = {
  enableQuestionaryDetails: ProfessionalQuestionaryBody;
};

export type AddCustomQuestionaryDetailInput = Pick<QuestionaryDetail, 'fieldName' | 'associatedQuestion' | 'isEnabled'>;

export type AddCustomQuestionaryDetail = AddCustomQuestionaryDetailInput & {
  questionaryDetail: string;
};

export type AddCustomQuestionaryDetailBody = GetProfessionalQuestionaryBody & {
  questionary: string;
  questionaryGroup: string;
  questionaryDetailsInput: AddCustomQuestionaryDetailInput[];
};
export type UpdateCustomQuestionaryDetailInput = Omit<QuestionaryDetail, 'uuid'> & {
  questionaryDetail: string;
};

export type UpdateCustomQuestionaryDetailBody = AddCustomQuestionaryDetailBody & {
  questionaryDetailsInput: UpdateCustomQuestionaryDetailInput[];
};

export type DeleteCustomQuestionaryDetailBody = Omit<AddCustomQuestionaryDetailBody, 'questionaryDetailsInput'> & {
  questionaryDetails: string[];
};
export type CustomQuestionaryDetailsCrudRequest = {
  toAddInput: AddCustomQuestionaryDetailBody;
  toUpdateInput: UpdateCustomQuestionaryDetailBody;
  toDeleteInput: DeleteCustomQuestionaryDetailBody;
  shouldToAdd: boolean;
  shouldToUpdate: boolean;
  shouldToDelete: boolean;
};
export type CustomQuestionaryDetailsCrudResponse = {
  addCustomQuestionaryDetails?: ProfessionalQuestionaryBody;
  updateCustomQuestionaryDetails?: ProfessionalQuestionaryBody;
  deleteCustomQuestionaryDetails?: ProfessionalQuestionaryBody;
};

export type ProfessionalQuestionaryInitialState = {
  professionalQuestionary: ProfessionalQuestionaryBody;
  questionaryDetails: QuestionaryDetail[];
  isEnabledQuestionaryDetails: IsEnabledQuestionaryDetails[];
  customQuestionaryDetails: QuestionaryDetailState[];
};
