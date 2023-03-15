import { gql } from 'apollo-boost';

export const SIGN_UP = gql`
  mutation _signUp($input: SignUpUserDto!) {
    signUp(input: $input) {
      _id
      professionalId
    }
  }
`;
