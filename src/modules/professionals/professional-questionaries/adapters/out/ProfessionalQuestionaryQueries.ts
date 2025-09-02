import { gql } from '@apollo/client';

export const GET_QUESTIONARY = gql`
  query _getProfessionalQuestionary($input: GetProfessionalQuestionaryDto!) {
    getProfessionalQuestionary(input: $input) {
      uuid
      professional
      questionaryGroups {
        uuid
        title
        description
        questionaryDetails {
          fieldName
          isEnabled
          associatedQuestion
          uuid
        }
      }
    }
  }
`;

export const ENABLE_QUESTIONARY_DETAILS = gql`
  mutation _enableQuestionaryDetails($input: EnableQuestionaryDetailsDto!) {
    enableQuestionaryDetails(input: $input) {
      uuid
      createdAt
      professional
      questionaryGroups {
        uuid
        title
        description
        questionaryDetails {
          fieldName
          isEnabled
          associatedQuestion
          uuid
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
      uuid
      createdAt
      professional
      questionaryGroups {
        uuid
        title
        description
        questionaryDetails {
          fieldName
          isEnabled
          associatedQuestion
          uuid
        }
      }
    }
    updateCustomQuestionaryDetails(toUpdateInput: $toUpdateInput) @include(if: $shouldToUpdate) {
      uuid
      createdAt
      professional
      questionaryGroups {
        uuid
        title
        description
        questionaryDetails {
          fieldName
          isEnabled
          associatedQuestion
          uuid
        }
      }
    }
    deleteCustomQuestionaryDetails(toDeleteInput: $toDeleteInput) @include(if: $shouldToDelete) {
      uuid
      createdAt
      professional
      questionaryGroups {
        uuid
        title
        description
        questionaryDetails {
          fieldName
          isEnabled
          associatedQuestion
          uuid
        }
      }
    }
  }
`;