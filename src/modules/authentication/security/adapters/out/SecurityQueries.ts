import { gql } from '@apollo/client';

export const SIGN_IN = gql`
  mutation signIn($input: SignInDto!) {
    signIn(input: $input) {
      _id
      userType
      token
    }
  }
`;
