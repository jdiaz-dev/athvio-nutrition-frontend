import { createEntityAdapter, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { useSelector } from 'react-redux';
import { QuestionaryDetail, QuestionaryDetailState } from 'src/modules/professionals/questionary-config/adapters/out/QuestionaryConfig';
import { ReduxStates } from 'src/shared/types/types';

export enum CustomQuestionaryDetailState {
  CREATED = 'created',
  UPDATED = 'updated',
  DELETED = 'deleted',
}
export const questionaryDetailsAdapter = createEntityAdapter({
  selectId: (questionaryDetail: QuestionaryDetailState) => questionaryDetail._id,
  sortComparer: (a, b) => a._id.localeCompare(b._id),
});

export const customQuestionaryDetailSlice = createSlice({
  name: 'customQuestionaryDetails',
  initialState: questionaryDetailsAdapter.getInitialState(),
  reducers: {
    initializeCustomQuestionaryDetails(state, action: PayloadAction<QuestionaryDetailState[]>) {
      questionaryDetailsAdapter.setAll(
        state,
        action.payload.map((item) => ({ ...item, status: '' })),
      );
    },
    addCustom: (state, action: PayloadAction<QuestionaryDetailState>) => {
      questionaryDetailsAdapter.addOne(state, { ...action.payload, status: CustomQuestionaryDetailState.CREATED });
    },
    updateCustom: (state, action: PayloadAction<QuestionaryDetail>) => {
      const { _id, ...rest } = action.payload;
      questionaryDetailsAdapter.updateOne(state, { id: _id, changes: { ...rest, status: CustomQuestionaryDetailState.UPDATED } });
    },
    deleteCustom: (state, action: PayloadAction<string>) => {
      questionaryDetailsAdapter.updateOne(state, { id: action.payload, changes: { status: CustomQuestionaryDetailState.DELETED } });
    },
  },
});

export const { initializeCustomQuestionaryDetails, addCustom, updateCustom, deleteCustom } = customQuestionaryDetailSlice.actions;

const { selectAll } = questionaryDetailsAdapter.getSelectors<any>((state) => state);

export const useSelectAllEntities = () => {
  return useSelector((state: ReduxStates) => {
    const res = selectAll(state.questionaryConfig.customQuestionaryDetails);
    return res;
  });
};
