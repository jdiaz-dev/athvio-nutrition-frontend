export type CredentialsSignIn = {
  email: string;
  password: string;
};

export type JwtDto = {
  _id: string;
  userType: string;
  token: string;
};

export type SignInResponse = {
  signIn: JwtDto;
};

export type SignInRequest = {
  input: CredentialsSignIn;
};

export type SignUpProfessionalModel = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  phone: string;
  acceptedTerms?: boolean;
  countryCode?: string;
  country?: string;
  professionalInfo?: {
    businessName: string;
  };
};

export type SetUserInfo = {
  businessName: string;
} & Omit<SignUpProfessionalModel, 'countryCode' | 'professionalInfo'>;

export type SignUpProfessionalRequest = {
  input: SignUpProfessionalModel;
};

export type SignUpProfessionalResponse = {
  signUpProfessional: JwtDto;
};
