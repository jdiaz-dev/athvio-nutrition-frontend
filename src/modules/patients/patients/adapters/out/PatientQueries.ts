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

export const GET_PATIENT_FOR_WEB = gql`
  query _getPatientForWeb($patient: GetPatientForWebDto!) {
    getPatientForWeb(patient: $patient) {
      uuid
      user {
        uuid
        firstname
        lastname
        email
        phone
        countryCode
      }
      height
      weight
      birthday
      gender
    }
  }
`;

export const UPDATE_PATIENT_FOR_WEB = gql`
  mutation _updatePatientForWeb($patient: UpdatePatientWebDto!) {
    updatePatientForWeb(patient: $patient) {
      uuid
      height
      weight
      birthday
      gender
    }
  }
`;

export const MANAGE_PATIENT_GROUP = gql`
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

export const ARCHIVE_PATIENT = gql`
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
