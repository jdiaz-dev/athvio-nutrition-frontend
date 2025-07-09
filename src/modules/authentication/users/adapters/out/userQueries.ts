import { gql } from '@apollo/client';

export const GET_USER = gql`
  query _getUser($input: GetUserDto!) {
    getUser(input: $input) {
      uuid
      firstname
      lastname
      email
    }
  }
`;
