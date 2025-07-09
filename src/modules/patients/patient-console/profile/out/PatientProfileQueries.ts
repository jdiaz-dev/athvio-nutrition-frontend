import { gql } from '@apollo/client';

export const GET_PATIENT_FOR_WEB = gql`
  query _getPatientForWeb($patient: GetPatientForWebDto!) {
    getPatientForWeb(patient: $patient) {
      uuid
      user {
        uuid
        firstname
        lastname
        email
      }
      height
      weight
      birthday
      gender
    }
  }
`;
