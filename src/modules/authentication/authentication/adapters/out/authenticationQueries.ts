import { gql } from '@apollo/client';

export const SIGN_IN = gql`
  mutation signIn($input: SignInDto!) {
    signIn(input: $input) {
      _id
      role
      token
    }
  }
`;

export const SIGN_UP_PROFESSIONAL = gql`
  mutation _signUpProfessional($input: SignUpProfessionalDto!) {
    signUpProfessional(input: $input) {
      _id
      role
      token
    }
  }
`;

export const ACTIVATE_PATIENT = gql`
  mutation _activatePatient($input: ActivatePatientDto!) {
    activatePatient(input: $input) {
      _id
    }
  }
`;
