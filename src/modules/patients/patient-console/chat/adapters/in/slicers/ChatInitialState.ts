import { ChatInitialState } from 'src/modules/patients/patient-console/chat/adapters/out/chat.d';

export const chatIntialState: ChatInitialState = {
  chat: { data: { _id: '', professional: '', patient: '', comments: [] }, loading: false, error: null },
};
