import { gql } from '@apollo/client';

export const LOG_IN = gql`
  mutation doLogin($input: LoginDto!) {
    logIn(input: $input) {
      _id
      userType
      token
    }
  }
`;
