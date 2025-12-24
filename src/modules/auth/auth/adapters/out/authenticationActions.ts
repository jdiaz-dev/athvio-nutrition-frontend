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
  SignUpProfessionalWithGoogleResponse,
  SignUpProfessionalWithGoogleRequest,
  SignUpProfessionalWithGoogleInput,
  SignInProfessionalWithGoogleInput,
  SignInProfessionalWithGoogleResponse,
  SignInProfessionalWithGoogleRequest,
} from './authentication.types';
import {
  ACTIVATE_PATIENT,
  SIGN_IN,
  SIGN_IN_PROFESSIONAL_WITH_GOOGLE,
  SIGN_UP_PROFESSIONAL,
  SIGN_UP_PROFESSIONAL_WITH_GOOGLE,
} from './authenticationQueries';

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
    try {
      const res = await apolloClient.mutate<SignUpProfessionalResponse, SignUpProfessionalRequest>({
        mutation: SIGN_UP_PROFESSIONAL,
        variables: {
          input: body,
        },
      });
      return res;
    } catch (error) {
      throw error;
    }
  };
  const signInProfessionalWithGoogle = async (
    body: SignInProfessionalWithGoogleInput,
  ): Promise<FetchResult<SignInProfessionalWithGoogleResponse>> => {
    const res = await apolloClient.mutate<SignInProfessionalWithGoogleResponse, SignInProfessionalWithGoogleRequest>({
      mutation: SIGN_IN_PROFESSIONAL_WITH_GOOGLE,
      variables: {
        input: body,
      },
    });
    return res;
  };
  const signUpProfessionalWithGoogle = async (
    body: SignUpProfessionalWithGoogleInput,
  ): Promise<FetchResult<SignUpProfessionalWithGoogleResponse>> => {
    const res = await apolloClient.mutate<SignUpProfessionalWithGoogleResponse, SignUpProfessionalWithGoogleRequest>({
      mutation: SIGN_UP_PROFESSIONAL_WITH_GOOGLE,
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
  return { signIn, signUpProfessional, signInProfessionalWithGoogle, signUpProfessionalWithGoogle, activatePatient };
}
