import { gql } from '@apollo/client';

export const SIGN_UP_PROFESSIONAL = gql`
  mutation _signUpProfessional($input: SignUpProfessionalDto!) {
    signUpProfessional(input: $input) {
      _id
      professional
    }
  }
`;
