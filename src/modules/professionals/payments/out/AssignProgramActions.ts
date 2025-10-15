import { ApolloError, FetchResult } from '@apollo/client';
import { apolloClient } from 'src/graphql/ApolloClient';
import { VERIFY_PAYMENT } from 'src/modules/professionals/payments/out/AssignProgramQueries';
import { VerifyPaymentBody, VerifyPaymentRequest, VerifyPaymentResponse } from 'src/modules/professionals/payments/out/AssignProgram.types';

export function usePayments() {
  const verifyPayment = async (body: VerifyPaymentBody): Promise<FetchResult<VerifyPaymentResponse>> => {
    try {
      const response = await apolloClient.mutate<VerifyPaymentResponse, VerifyPaymentRequest>({
        mutation: VERIFY_PAYMENT,
        variables: {
          input: {
            ...body,
          },
        },
      });
      return response;
    } catch (error) {
      console.log('-------------error graphQLErrors', (error as ApolloError).graphQLErrors);
      throw error;
    }
  };

  return { verifyPayment };
}
