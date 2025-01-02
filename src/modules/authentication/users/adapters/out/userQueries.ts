import { gql } from '@apollo/client';

export const GET_USER = gql`
  query _getUser($input: GetUserDto!) {
    getUser(input: $input) {
      _id
      firstname
      lastname
      email
    }
  }
`;
