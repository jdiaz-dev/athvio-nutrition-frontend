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

export const otherQuestionaryDetailSlice = createSlice({
  name: 'otherQuestionaryDetails',
  initialState: questionaryDetailsAdapter.getInitialState(),
  reducers: {
    initializeOtherQuestionaryDetails(state, action: PayloadAction<QuestionaryDetailState[]>) {
      questionaryDetailsAdapter.setAll(
        state,
        action.payload.map((item) => ({ ...item, status: '' })),
      );
    },
    addOther: (state, action: PayloadAction<QuestionaryDetailState>) => {
      questionaryDetailsAdapter.addOne(state, { ...action.payload, status: CustomQuestionaryDetailState.CREATED });
    },
    updateOther: (state, action: PayloadAction<QuestionaryDetail>) => {
      const { _id, ...rest } = action.payload;
      questionaryDetailsAdapter.updateOne(state, { id: _id, changes: { ...rest, status: CustomQuestionaryDetailState.UPDATED } });
    },
    deleteOther: (state, action: PayloadAction<string>) => {
      questionaryDetailsAdapter.updateOne(state, { id: action.payload, changes: { status: CustomQuestionaryDetailState.DELETED } });
    },
  },
});

export const { initializeOtherQuestionaryDetails, addOther, updateOther, deleteOther } = otherQuestionaryDetailSlice.actions;

const { selectAll } = questionaryDetailsAdapter.getSelectors<any>((state) => state);

export const useSelectAllEntities = () => {
  return useSelector((state: ReduxStates) => {
    const res = selectAll(state.questionaryConfig.otherQuestionaryDetails);
    return res;
  });
};
