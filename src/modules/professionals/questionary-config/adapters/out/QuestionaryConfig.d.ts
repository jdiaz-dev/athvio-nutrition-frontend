export type QuestionaryDetail = {
  _id: string;
  fieldName: string;
  associatedQuestion: string;
  // fieldOptions?: string | string[];
  isEnabled: boolean;
};

export type QuestionaryDetailState = Omit<QuestionaryDetail> & {
  status: string;
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

export type QuestionaryConfigBody = Questionary & {
  _id: string;
  professional: string;
};

export type GetQuestionaryConfigBody = {
  professional: string;
};

export type GetQuestionaryConfigRequest = {
  input: GetQuestionaryConfigBody;
};

export type GetQuestionaryConfigResponse = {
  getQuestionary: QuestionaryConfigBody;
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
  enableQuestionaryDetails: QuestionaryConfigBody;
};

export type AddCustomQuestionaryDetailInput = Pick<QuestionaryDetail, 'fieldName' | 'associatedQuestion'> & {
  questionaryDetail: string;
};

export type AddCustomQuestionaryDetail = AddCustomQuestionaryDetailInput & {
  questionaryDetail: string;
};

export type AddCustomQuestionaryDetailBody = GetQuestionaryConfigBody & {
  questionary: string;
  questionaryGroup: string;
  questionaryDetailsInput: AddCustomQuestionaryDetailInput[];
};
export type UpdateCustomQuestionaryDetailInput = Omit<QuestionaryDetail, '_id'> & {
  questionaryDetail: string;
};

export type UpdateCustomQuestionaryDetailBody = AddCustomQuestionaryDetailBody & {
  questionaryDetailsInput: UpdateCustomQuestionaryDetailInput[];
};

export type DeleteCustomQuestionaryDetailBody = Omit<AddCustomQuestionaryDetailBody, 'questionaryDetailsInput'> & {
  questionaryDetails: string[];
};
export type CustomQuestionaryDetailsCrudRequest = {
  toAdd: AddCustomQuestionaryDetailBody;
  toUpdate: UpdateCustomQuestionaryDetailBody;
  toDelete: DeleteCustomQuestionaryDetailBody;
  shouldToAdd: boolean;
  shouldToUpdate: boolean;
  shouldToDelete: boolean;
};
export type DeleteCustomQuestionaryDetailsCrudResponse = {
  addCustomQuestionaryDetails?: QuestionaryConfigBody;
  updateCustomQuestionaryDetails?: QuestionaryConfigBody;
  deleteCustomQuestionaryDetails?: QuestionaryConfigBody;
};

export type QuestionaryConfigInitialState = {
  questionaryConfig: QuestionaryConfigBody;
  questionaryDetails: QuestionaryDetail[];
  isEnabledQuestionaryDetails: IsEnabledQuestionaryDetails[];
  customQuestionaryDetails: QuestionaryDetailState[];

  /* {
    currentState: QuestionaryDetail[];
    added: AddCustomQuestionaryDetail[];
    updated: UpdateCustomQuestionaryDetailInput[];
    deleted: string[];
  }; */
};
