import { gql } from '@apollo/client';

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
