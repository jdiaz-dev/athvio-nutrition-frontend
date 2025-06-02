import { gql } from '@apollo/client';

export const GET_PATIENT_QUESTIONARY = gql`
  query _getPatientQuestionary($input: GetPatientQuestionaryDto!) {
    getPatientQuestionary(input: $input) {
      _id
      patient
      professional
      questionaryGroups {
        _id
        title
        description
        questionaryDetails {
          _id
          fieldName
          isEnabled
          associatedQuestion
          answer
          additionalNotes
        }
      }
    }
  }
`;

export const UPDATE_ANSWER_AND_ADDITIONAL_NOTES = gql`
  mutation _updateAnswerAndAdditionalNotes($input: UpdateAnswerAndAdditionalNotesDto!) {
    updateAnswerAndAdditionalNotes(input: $input) {
      _id
      patient
      professional
      questionaryGroups {
        _id
        title
        description
        questionaryDetails {
          _id
          fieldName
          isEnabled
          associatedQuestion
          answer
          additionalNotes
        }
      }
    }
  }
`;

export const SEND_PATIENT_QUESTIONARY = gql`
  mutation _sendPatientQuestionary($input: SendPatientQuestionaryDto!) {
    sendPatientQuestionary(input: $input)
  }
`;
