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

export const GET_PATIENT_QUESTIONARY_BY_ID = gql`
  query _getPatientQuestionaryById($input: GetPatientQuestionaryByIdDto!) {
    getPatientQuestionaryById(input: $input) {
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

export const UPDATE_ANSWERS = gql`
  mutation _updatePatientQuestionaryAnswers($input: UpdateAnswersDto!) {
    updatePatientQuestionaryAnswers(input: $input) {
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

export const UPDATE_ANSWERS_AND_ADDITIONAL_NOTES = gql`
  mutation _updateAnswersAndAdditionalNotes($input: UpdateAnswersAndAdditionalNotesDto!) {
    updateAnswersAndAdditionalNotes(input: $input) {
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
