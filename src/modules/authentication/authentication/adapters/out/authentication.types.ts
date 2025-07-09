import { User } from 'src/modules/authentication/users/adapters/out/user';

export type CredentialsSignIn = {
  email: string;
  password: string;
};

export type JwtDto = {
  uuid: string;
  role: string;
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
  photo?: string;
  acceptedTerms?: boolean;
  countryCode?: string;
  country?: string;
  professionalInfo?: {
    company: string;
  };
  clientOffsetMinutes: number;
  detectedLanguage: 'es' | 'en';
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

export type ActivatePatientBody = {
  user: string;
  password: string;
};

export type ActivatePatientRequest = {
  input: ActivatePatientBody;
};

export type ActivatePatientResponse = {
  activatePatient: User;
};
