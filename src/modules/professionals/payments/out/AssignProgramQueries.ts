import { gql } from '@apollo/client';

export const VERIFY_PAYMENT = gql`
  mutation _verifyPayment($input: VerifyPaymentDto!) {
    verifyPayment(input: $input) {
      isSucceded
    }
  }
`;
