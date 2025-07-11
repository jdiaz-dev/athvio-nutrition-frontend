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

export const UPDATE_USER = gql`
  mutation _updateUser($input: UpdateUserDto!) {
    updateUser(input: $input) {
      uuid
      firstname
      lastname
      email
      phone
    }
  }
`;
