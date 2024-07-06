import { gql } from '@apollo/client';

export const GET_CHAT_QUERY = gql`
  query _getChat($input: GetChatDto!) {
    getChat(input: $input) {
      _id
      patient
      comments {
        _id
        commenter
        content
      }
    }
  }
`;

export const SAVE_CHAT_COMMENT = gql`
  mutation _saveChatCommentDto($input: SaveChatCommentDto!) {
    saveChatComment(input: $input) {
      _id
      patient
      comments {
        _id
        commenter
        content
        createdAt
      }
    }
  }
`;

export const COMMENT_ADDED_SUBSCRIPTION = gql`
  subscription _commentAddedByPatient($input: SubscribeCommentAddedDto!) {
    commentAddedByPatient(input: $input) {
      _id
      patient
      comments {
        _id
        commenter
        content
        createdAt
      }
    }
  }
`;
