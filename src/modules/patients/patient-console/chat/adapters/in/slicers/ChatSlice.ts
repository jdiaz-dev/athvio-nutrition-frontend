import { ChatBody } from 'src/modules/patients/patient-console/chat/adapters/out/chat.d';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { chatIntialState } from 'src/modules/patients/patient-console/chat/adapters/in/slicers/ChatInitialState';

const chatSlice = createSlice({
  name: 'chat',
  initialState: chatIntialState,
  reducers: {
    acceptNewChat: (state, action: PayloadAction<ChatBody>) => {
      state = action.payload;
      return state;
    },
  },
});

export const { acceptNewChat } = chatSlice.actions;

export default chatSlice.reducer;
