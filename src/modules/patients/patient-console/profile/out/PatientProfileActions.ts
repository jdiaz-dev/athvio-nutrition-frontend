import { ApolloError } from '@apollo/client';
import { useDispatch } from 'react-redux';
import { apolloClient } from 'src/graphql/ApolloClient';
import * as PatientSlice from 'src/modules/patients/patient-console/profile/in/slicers/PatientSlice';

import { GET_PATIENT_FOR_WEB } from 'src/modules/patients/patient-console/profile/out/PatientProfileQueries';
import { GetPatientForConsoleRequest, GetPatientForConsoleResponse } from 'src/modules/patients/patient-console/profile/out/PatientProfile';

export function usePatientProfile() {
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

  return { getPatientForWeb };
}
