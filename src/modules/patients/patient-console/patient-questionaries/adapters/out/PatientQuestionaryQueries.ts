import { gql } from '@apollo/client';

export const GET_PATIENT_QUESTIONARY = gql`
  query _getPatientQuestionary($input: GetPatientQuestionaryDto!) {
    getPatientQuestionary(input: $input) {
      uuid
      patient
      professional
      questionaryGroups {
        uuid
        title
        description
        questionaryDetails {
          uuid
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

export const UPDATE_ANSWERS = gql`
  mutation _updatePatientQuestionaryAnswers($input: UpdateAnswersDto!) {
    updatePatientQuestionaryAnswers(input: $input) {
      uuid
      patient
      professional
      questionaryGroups {
        uuid
        questionaryDetails {
          uuid
          fieldName
          associatedQuestion
          answer
          additionalNotes
        }
      }
    }
  }
`;

export const UPDATE_ANSWERS_AND_ADDITIONAL_NOTES = gql`
  mutation _updateAnswersAndAdditionalNotes($input: UpdateAnswersAndAdditionalNotesDto!) {
    updateAnswersAndAdditionalNotes(input: $input) {
      uuid
      patient
      professional
      questionaryGroups {
        uuid
        title
        description
        questionaryDetails {
          uuid
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
