import { gql } from '@apollo/client';

export const SIGN_UP_PATIENT = gql`
  mutation _signUpPatient($input: SignUpPatientDto!) {
    signUpPatient(input: $input) {
      uuid
      userInfo {
        firstname
        lastname
      }
    }
  }
`;

export const GET_PATIENTS = gql`
  query _getPatients($input: GetPatientsDto!) {
    getPatients(input: $input) {
      data {
        uuid
        user {
          uuid
          firstname
          lastname
        }
        groups {
          uuid
          groupName
        }
        state
      }
      meta {
        total
        limit
        offset
      }
    }
  }
`;

export const MANAGE_CLIENT_GROUP = gql`
  mutation _managePatientGroup($input: ManagePatientGroupDto!) {
    managePatientGroup(input: $input) {
      uuid
      groups {
        uuid
        groupName
      }
    }
  }
`;

export const ARCHIVE_CLIENT = gql`
  mutation _managePatientState($input: ManagePatientStateDto!) {
    managePatientState(input: $input) {
      uuid
      timezone
      groups {
        uuid
        groupName
      }
    }
  }
`;
