import { gql } from '@apollo/client';

export const GET_PATIENT_FOR_WEB = gql`
  query _getPatientForWeb($patient: GetPatientForWebDto!) {
    getPatientForWeb(patient: $patient) {
      _id
      user {
        _id
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
