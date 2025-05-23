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
          fieldName
          isEnabled
          associatedQuestion
          _id
        }
      }
    }
  }
`;
