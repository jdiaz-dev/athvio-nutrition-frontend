export interface SignUpProfessionalModel {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  countryCode: string;
  phone: string;
  acceptedTerms: boolean;
  country: string;
  professionalInfo: {
    businessName: string;
  };
}

export interface SetUserInfo extends Omit<SignUpProfessionalModel, 'countryCode' | 'professionalInfo'> {
  businessName: string;
}

export type SignUpRequest = {
  input: SignUpProfessionalModel;
};
