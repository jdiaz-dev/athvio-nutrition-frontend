export type VerifyPaymentBody = {
  externalId: string;
};

export interface VerifyPaymentRequest {
  input: VerifyPaymentBody;
}

export interface VerifyPaymentResponse {
  verifyPayment: {
    isSucceded: boolean;
  };
}
