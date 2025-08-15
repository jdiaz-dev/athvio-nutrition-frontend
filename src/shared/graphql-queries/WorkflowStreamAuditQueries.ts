// gql/signUpProfessionalScreen.gql.ts
import { gql } from '@apollo/client';

export const LANDING_SCREEN = gql`
  mutation _landingScreen {
    landingScreen
  }
`;

export const SIGN_UP_PROFESSIONAL_SCREEN = gql`
  mutation _signUpProfessionalScreen {
    signUpProfessionalScreen
  }
`;
