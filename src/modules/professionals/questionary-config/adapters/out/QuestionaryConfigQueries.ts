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
          isEnabled
          associatedQuestion
          _id
        }
      }
    }
  }
`;

export const CUSTOM_QUESTIONARY_DETAILS_CRUD = gql`
  mutation _customQuestionDetailsCrud(
    $toAddInput: AddCustomQuestionaryDetailsDto!
    $toUpdateInput: UpdateCustomQuestionaryDetailsDto!
    $toDeleteInput: DeleteCustomQuestionaryDetailsDto!
    $shouldToAdd: Boolean!
    $shouldToUpdate: Boolean!
    $shouldToDelete: Boolean!
  ) {
    addCustomQuestionaryDetails(toAddInput: $toAddInput) @include(if: $shouldToAdd) {
      _id
      createdAt
      professional
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
    updateCustomQuestionaryDetails(toUpdateInput: $toUpdateInput) @include(if: $shouldToUpdate) {
      _id
      createdAt
      professional
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
    deleteCustomQuestionaryDetails(toDeleteInput: $toDeleteInput) @include(if: $shouldToDelete) {
      _id
      createdAt
      professional
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