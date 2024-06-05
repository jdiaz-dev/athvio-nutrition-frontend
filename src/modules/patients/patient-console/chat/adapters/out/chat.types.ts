interface CommentBody {
  _id: string;
  commenter: string;
  content: string;
}

export interface CommentAddedBody {
  _id: string;
  patient: string;
  comments: CommentBody;
}

export interface CommentAddedResponse {
  commentAdded: CommentAddedResponse;
}
