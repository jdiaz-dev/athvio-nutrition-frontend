import { Commenter } from "src/modules/patients/patient-console/chat/adapters/out/chat";

export type CommentBody = {
  _id: string;
  commenter: Commenter;
  content: string;
  createdAt: string;
};

export type ChatBody = {
  _id: string;
  professional: string;
  patient: string;
  comments: CommentBody[];
};

export type ChatInitialState = ChatBody;

export type CommentAddedResponse = {
  commentAdded: CommentAddedResponse;
};

export type GetChatInput = {
  professional: string;
  patient: string;
};

export type GetChatRequest = {
  chat: GetChatInput;
};

export type GetChatResponse = {
  getChat: ChatBody;
};
