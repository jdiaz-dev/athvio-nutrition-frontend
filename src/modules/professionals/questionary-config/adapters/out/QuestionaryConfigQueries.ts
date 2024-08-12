import { gql } from '@apollo/client';

export const GET_QUESTIONARY = gql`
  query _getQuestionary($input: GetQuestionaryConfigDto!) {
    getQuestionary(input: $input) {
      _id
      professional
      questionaryGroups {
        _id
        title
        description
        questionaryDetails {
          fieldName
          fieldOptions
          fieldType
          isEnabled
          associatedQuestion
          _id
        }
      }
    }
  }
`;

export const ENABLE_QUESTIONARY_DETAILS = gql`
  mutation _enableQuestionaryDetails($input: EnableQuestionaryDetailsDto!) {
    enableQuestionaryDetails(input: $input) {
      _id
      createdAt
      professional
      questionaryGroups {
        _id
        title
        description
        questionaryDetails {
          fieldName
          fieldOptions
          fieldType
          isEnabled
          associatedQuestion
          _id
        }
      }
    }
  }
`;
