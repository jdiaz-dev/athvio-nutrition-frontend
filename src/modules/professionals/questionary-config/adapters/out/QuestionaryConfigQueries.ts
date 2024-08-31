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

export const OTHER_QUESTIONARY_DETAILS_CRUD = gql`
  mutation _otherQuestionDetailsCrud(
    $toAdd: AddOtherQuestionaryDetailsDto!
    $toUpdate: UpdateOtherQuestionaryDetailsDto!
    $toDelete: DeleteOtherQuestionaryDetailsDto!
    $shouldToAdd: Boolean!
    $shouldToUpdate: Boolean!
    $shouldToDelete: Boolean!
  ) {
    addOtherQuestionaryDetails(toAdd: $toAdd) @include(if: $shouldToAdd) {
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
    updateOtherQuestionaryDetails(toUpdate: $toUpdate) @include(if: $shouldToUpdate) {
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
    deleteOtherQuestionaryDetails(toDelete: $toDelete) @include(if: $shouldToDelete) {
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