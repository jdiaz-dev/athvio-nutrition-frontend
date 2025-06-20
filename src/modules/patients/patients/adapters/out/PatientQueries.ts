import { gql } from '@apollo/client';

export const SIGN_UP_PATIENT = gql`
  mutation _signUpPatient($input: SignUpPatientDto!) {
    signUpPatient(input: $input) {
      _id
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
        _id
        user {
          _id
          firstname
          lastname
        }
        groups {
          _id
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
      _id
      groups {
        _id
        groupName
      }
    }
  }
`;

export const ARCHIVE_CLIENT = gql`
  mutation _managePatientState($input: ManagePatientStateDto!) {
    managePatientState(input: $input) {
      _id
      timezone
      groups {
        _id
        groupName
      }
    }
  }
`;
