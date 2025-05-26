import { gql } from '@apollo/client';

export const GET_PATIENT_QUESTIONARY = gql`
  query _getPatientQuestionary($input: GetPatientQuestionaryDto!) {
    getPatientQuestionary(input: $input) {
      _id
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
        questionaryDetails {
          _id
          fieldName
          associatedQuestion
          answer
          additionalNotes
        }
      }
    }
  }
`;
