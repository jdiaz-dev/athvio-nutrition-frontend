import { gql } from '@apollo/client';

export const CREATE_CLIENT_GROUP = gql`
  mutation _createPatientGroup($input: CreatePatientGroupDto!) {
    createPatientGroup(input: $input) {
      uuid
      groupName
    }
  }
`;

export const GET_CLIENT_GROUPS = gql`
  query _getPatientGroups($input: GetPatientGroupsDto!) {
    getPatientGroups(input: $input) {
      uuid
      groupName
    }
  }
`;

export const UPDATE_CLIENT_GROUP = gql`
  mutation _updatePatientGroup($input: UpdatePatientGroupDto!) {
    updatePatientGroup(input: $input) {
      uuid
      groupName
    }
  }
`;

export const DELETE_CLIENT_GROUP = gql`
  mutation _deletePatientGroup($input: DeletePatientGroupDto!) {
    deletePatientGroup(input: $input) {
      uuid
      groupName
    }
  }
`;
