import { gql } from '@apollo/client';

export const CREATE_CLIENT = gql`
  mutation _createClient($input: CreateClientDto!) {
    createClient(input: $input) {
      _id
      userInfo {
        firstName
        lastName
        email
      }
    }
  }
`;

export const GET_CLIENTS = gql`
  query _getClients($input: GetClientsDto!) {
    getClients(input: $input) {
      _id
      user {
        firstName
        lastName
        email
      }
      groups {
        _id
        groupName
      }
    }
  }
`;

export const MANAGE_CLIENT_GROUP = gql`
  mutation _manageClientGroup($input: ManageClientGroupDto!) {
    manageClientGroup(input: $input) {
      _id
      groups {
        _id
        groupName
      }
    }
  }
`;
