export interface IUserSignUp {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  timezone: string;
  acceptedTerms: boolean;
  professionalInfo: {
    businessName: string;
    countryCode: string;
    phone: string;
    country: string;
  };
}

export type JwtDto = {
  token: string;
  userId: string;
};

export type LoginResponse = {
  signUP: JwtDto;
};

export type SignUpRequest = {
  input: IUserSignUp;
};
