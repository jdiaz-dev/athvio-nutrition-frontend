export type QuestionaryDetail = {
  _id: string;
  fieldName: string;
  associatedQuestion: string;
  // fieldOptions?: string | string[];
  isEnabled: boolean;
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

export type QuestionaryDetailInput = {
  fieldName: string;
  associatedQuestion: string;
};

export type AddOtherQuestionaryDetailBody = GetQuestionaryConfigBody & {
  questionary: string;
  questionaryGroup: string;
  questionaryDetailInput: QuestionaryDetailInput;
};
export type AddOtherQuestionaryDetailRequest = {
  input: AddOtherQuestionaryDetailBody;
};
export type AddOtherQuestionaryDetailResponse = {
  addOtherQuestionaryDetail: QuestionaryConfigBody;
};

export type UpdateOtherQuestionaryDetailBody = AddOtherQuestionaryDetailBody & {
  questionaryDetail: string;
  questionaryDetailInput: QuestionaryDetailInput & { isEnabled: boolean };
};
export type UpdateOtherQuestionaryDetailRequest = {
  input: UpdateOtherQuestionaryDetailBody;
};
export type UpdateOtherQuestionaryDetailResponse = {
  updateOtherQuestionaryDetail: QuestionaryConfigBody;
};

export type DeleteOtherQuestionaryDetailBody = Omit<AddOtherQuestionaryDetailBody, 'questionaryDetailInput'> & {
  questionaryDetail: string;
};
export type DeleteOtherQuestionaryDetailRequest = {
  input: DeleteOtherQuestionaryDetailBody;
};
export type DeleteOtherQuestionaryDetailResponse = {
  deleteOtherQuestionaryDetail: QuestionaryConfigBody;
};



export type QuestionaryConfigInitialState = {
  questionaryConfig: QuestionaryConfigBody;
  questionaryDetails: QuestionaryDetail[];
  isEnabledQuestionaryDetails: IsEnabledQuestionaryDetails[];
  otherQuestionaryDetail: QuestionaryDetail;
};
