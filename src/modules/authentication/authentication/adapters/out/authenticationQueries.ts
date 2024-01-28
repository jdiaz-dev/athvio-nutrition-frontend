import { gql } from '@apollo/client';

export const SIGN_UP = gql`
  mutation _signUp($input: SignUpUserDto!) {
    signUp(input: $input) {
      _id
      professional
    }
  }
`;
