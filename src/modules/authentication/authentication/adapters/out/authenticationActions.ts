import { FetchResult } from '@apollo/client';
import { apolloClient } from 'src/graphql/ApolloClient';
import {
  SignUpProfessionalModel,
  SignUpProfessionalResponse,
  SignUpProfessionalRequest,
  SignInResponse,
  SignInRequest,
  CredentialsSignIn,
  ActivatePatientRequest,
  ActivatePatientResponse,
  ActivatePatientBody,
} from './authentication.types';
import { ACTIVATE_PATIENT, SIGN_IN, SIGN_UP_PROFESSIONAL } from './authenticationQueries';

export function useAuthentication() {
  const signIn = async (credentials: CredentialsSignIn): Promise<FetchResult<SignInResponse>> => {
    const res = await apolloClient.mutate<SignInResponse, SignInRequest>({
      mutation: SIGN_IN,
      variables: {
        input: {
          ...credentials,
        },
      },
    });

    return res;
  };
  const signUpProfessional = async (body: SignUpProfessionalModel): Promise<FetchResult<SignUpProfessionalResponse>> => {
    const res = await apolloClient.mutate<SignUpProfessionalResponse, SignUpProfessionalRequest>({
      mutation: SIGN_UP_PROFESSIONAL,
      variables: {
        input: body,
      },
    });
    return res;
  };
  const activatePatient = async (body: ActivatePatientBody): Promise<FetchResult<ActivatePatientResponse>> => {
    const res = await apolloClient.mutate<ActivatePatientResponse, ActivatePatientRequest>({
      mutation: ACTIVATE_PATIENT,
      variables: {
        input: body,
      },
    });
    return res;
  };
  return { signIn, signUpProfessional, activatePatient };
}
