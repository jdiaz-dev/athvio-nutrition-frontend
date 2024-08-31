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

export type AddOtherQuestionaryDetailInput = Pick<QuestionaryDetail, 'fieldName' | 'associatedQuestion'> & {
  questionaryDetail: string;
};

export type AddOtherQuestionaryDetail = AddOtherQuestionaryDetailInput & {
  questionaryDetail: string;
};

export type AddOtherQuestionaryDetailBody = GetQuestionaryConfigBody & {
  questionary: string;
  questionaryGroup: string;
  questionaryDetailsInput: AddOtherQuestionaryDetailInput[];
};
export type UpdateOtherQuestionaryDetailInput = Omit<QuestionaryDetail, '_id'> & {
  questionaryDetail: string;
};

export type UpdateOtherQuestionaryDetailBody = AddOtherQuestionaryDetailBody & {
  questionaryDetailsInput: UpdateOtherQuestionaryDetailInput[];
};

export type DeleteOtherQuestionaryDetailBody = Omit<AddOtherQuestionaryDetailBody, 'questionaryDetailsInput'> & {
  questionaryDetails: string[];
};
export type OtherQuestionaryDetailsCrudRequest = {
  toAdd: AddOtherQuestionaryDetailBody;
  toUpdate: UpdateOtherQuestionaryDetailBody;
  toDelete: DeleteOtherQuestionaryDetailBody;
  shouldToAdd: boolean;
  shouldToUpdate: boolean;
  shouldToDelete: boolean;
};
export type DeleteOtherQuestionaryDetailsCrudResponse = {
  addOtherQuestionaryDetails?: QuestionaryConfigBody;
  updateOtherQuestionaryDetails?: QuestionaryConfigBody;
  deleteOtherQuestionaryDetails?: QuestionaryConfigBody;
};

export type QuestionaryConfigInitialState = {
  questionaryConfig: QuestionaryConfigBody;
  questionaryDetails: QuestionaryDetail[];
  isEnabledQuestionaryDetails: IsEnabledQuestionaryDetails[];
  otherQuestionaryDetails: QuestionaryDetailState[];

  /* {
    currentState: QuestionaryDetail[];
    added: AddOtherQuestionaryDetail[];
    updated: UpdateOtherQuestionaryDetailInput[];
    deleted: string[];
  }; */
};
