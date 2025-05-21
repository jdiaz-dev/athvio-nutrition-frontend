import { ReduxItemtatus } from 'src/shared/Consts';
import { Meal } from 'src/shared/components/PlanDetailDialog/Meal.types';

export type MealWithStatus = Meal & {
  status: ReduxItemtatus;
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
