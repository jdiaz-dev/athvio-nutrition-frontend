import { ApolloError } from '@apollo/client';
import { useDispatch } from 'react-redux';
import { apolloClient } from 'src/graphql/ApolloClient';
import * as PatientSlice from 'src/modules/patients/patients/adapters/in/slicers/PatientSlice';
import {
  GetPatientForConsoleRequest,
  GetPatientForConsoleResponse,
  UpdatePatientForWebInput,
  UpdatePatientForWebRequest,
  UpdatePatientForWebResponse,
} from 'src/modules/patients/patients/adapters/out/patient.types';

import { GET_PATIENT_FOR_WEB, UPDATE_PATIENT_FOR_WEB } from 'src/modules/patients/patients/adapters/out/PatientQueries';

export function usePatient() {
  const dispatch = useDispatch();

  const getPatientForWeb = async (body: GetPatientForConsoleRequest) => {
    try {
      const response = await apolloClient.query<GetPatientForConsoleResponse, GetPatientForConsoleRequest>({
        query: GET_PATIENT_FOR_WEB,
        variables: body,
        fetchPolicy: 'network-only',
      });
      if (response) {
        dispatch(PatientSlice.acceptNewPatient(response.data.getPatientForWeb));
      }
    } catch (error) {
      console.log('-------------error graphQLErrors', (error as ApolloError).graphQLErrors);
      throw error;
    }
  };

  const updatePatientForWeb = async (body: UpdatePatientForWebInput) => {
    try {
      const response = await apolloClient.mutate<UpdatePatientForWebResponse, UpdatePatientForWebRequest>({
        mutation: UPDATE_PATIENT_FOR_WEB,
        variables: {
          patient: { ...body },
        },
        fetchPolicy: 'network-only',
      });
    } catch (error) {
      console.log('-------------error graphQLErrors', (error as ApolloError).graphQLErrors);
      throw error;
    }
  };

  return { getPatientForWeb, updatePatientForWeb };
}
