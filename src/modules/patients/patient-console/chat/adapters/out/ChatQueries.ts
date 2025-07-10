import { gql } from '@apollo/client';

export const GET_CHAT_QUERY = gql`
  query _getChat($chat: GetChatDto!) {
    getChat(chat: $chat) {
      uuid
      patient
      comments {
        uuid
        commenter
        content
      }
    }
  }
`;

export const SAVE_CHAT_COMMENT = gql`
  mutation _saveChatCommentDto($input: SaveChatCommentDto!) {
    saveChatComment(input: $input) {
      uuid
      patient
      comments {
        uuid
        commenter
        content
      }
    }
  }
`;

export const PATIENT_MESSAGED_SUBSCRIPTION = gql`
  subscription _patientMessaged($input: SubscribePublishedMessageDto!) {
    patientMessaged(input: $input) {
      uuid
      patient
      comments {
        uuid
        commenter
        content
        createdAt
      }
    }
  }
`;
