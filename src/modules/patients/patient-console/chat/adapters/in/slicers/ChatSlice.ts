import { ChatBody, CommentBody } from 'src/modules/patients/patient-console/chat/adapters/out/chat.d';
import { PayloadAction, createAction, createSlice } from '@reduxjs/toolkit';

import { chatIntialState } from 'src/modules/patients/patient-console/chat/adapters/in/slicers/ChatInitialState';

export const addChatCommentFailure = createAction<string>('addChatCommentFailure');

const chatSlice = createSlice({
  name: 'chat',
  initialState: chatIntialState,
  reducers: {
    initializeNewPatientChat: (state, action: PayloadAction<ChatBody>) => {
      state.chat.data = action.payload;
      return state;
    },
    newCommentReceived: (state, action: PayloadAction<CommentBody>) => {
      state.chat.data.comments.push(action.payload);
      return state;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(addChatCommentFailure, (state, action) => {
      state.chat.loading = false;
      state.chat.error = action.payload;
    });
  },
});

export const { initializeNewPatientChat, newCommentReceived } = chatSlice.actions;

export default chatSlice.reducer;
