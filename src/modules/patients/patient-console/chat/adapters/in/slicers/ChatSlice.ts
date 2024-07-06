import { ChatBody, CommentBody } from 'src/modules/patients/patient-console/chat/adapters/out/chat.d';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { chatIntialState } from 'src/modules/patients/patient-console/chat/adapters/in/slicers/ChatInitialState';

const chatSlice = createSlice({
  name: 'chat',
  initialState: chatIntialState,
  reducers: {
    acceptNewPatientChat: (state, action: PayloadAction<ChatBody>) => {
      state = action.payload;
      return state;
    },
    newPatientCommentReceived: (state, action: PayloadAction<CommentBody>) => {
      state.comments.push(action.payload);
      return state;
    },
  },
});

export const { acceptNewPatientChat, newPatientCommentReceived } = chatSlice.actions;

export default chatSlice.reducer;
