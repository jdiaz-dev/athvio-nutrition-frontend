import { gql } from '@apollo/client';

export const CREATE_CLIENT = gql`
  mutation _createClient($input: CreateClientDto!) {
    createClient(input: $input) {
      _id
    }
  }
`;
