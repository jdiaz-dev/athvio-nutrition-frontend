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
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  phone: string;
  acceptedTerms?: boolean;
  countryCode?: string;
  country?: string;
  professionalInfo?: {
    company: string;
  };
};

export type SetUserInfo = {
  company: string;
} & Omit<SignUpProfessionalModel, 'countryCode' | 'professionalInfo'>;

export type SignUpProfessionalRequest = {
  input: SignUpProfessionalModel;
};

export type SignUpProfessionalResponse = {
  signUpProfessional: JwtDto;
};
