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
    }
  }
`;
