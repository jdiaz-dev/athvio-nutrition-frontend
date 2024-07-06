import { Commenter } from './chat.enum';

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

export type CommendAddedSubscriptionInput = GetChatInput;
export type CommendAddedSubscriptionRequest = {
  input: CommendAddedSubscriptionInput;
};

export type CommentAddedResponse = {
  commentAddedByPatient: Omit<ChatBody, 'professional'>;
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

export type SaveChatInput = {
  professional: string;
  patient: string;
  comment: Pick<CommentBody, 'commenter' | 'content'>;
};

export type SaveChatRequest = {
  input: SaveChatInput;
};

export type SaveChatResponse = {
  saveChatComment: ChatBody;
};
