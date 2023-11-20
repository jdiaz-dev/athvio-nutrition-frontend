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
      data {
        _id
        user {
          _id
          firstName
          lastName
        }
        groups {
          _id
          groupName
        }
        state
      }
      meta {
        total
        limit
        offset
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

export const ARCHIVE_CLIENT = gql`
  mutation _manageClientState($input: ManageClientStateDto!) {
    manageClientState(input: $input) {
      _id
      timezone
      groups {
        _id
        groupName
      }
    }
  }
`;
