import { gql } from '@apollo/client';

export const CREATE_CLIENT_GROUP = gql`
  mutation _createClientGroup($input: CreateClientGroupDto!) {
    createClientGroup(input: $input) {
      _id
      groupName
    }
  }
`;

export const GET_CLIENT_GROUPS = gql`
  query _getClientGroups($input: GetClientGroupsDto!) {
    getClientGroups(input: $input) {
      _id
      groupName
    }
  }
`;

export const UPDATE_CLIENT_GROUP = gql`
  mutation _updateClientGroup($input: UpdateClientGroupDto!) {
    updateClientGroup(input: $input) {
      _id
      groupName
    }
  }
`;

export const DELETE_CLIENT_GROUP = gql`
  mutation _deleteClientGroup($input: DeleteClientGroupDto!) {
    deleteClientGroup(input: $input) {
      _id
      groupName
    }
  }
`;
