export interface UserSignUpModel {
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

export interface SetUserInfo extends Omit<UserSignUpModel, 'countryCode' | 'professionalInfo'> {
  businessName: string;
}

export type JwtDto = {
  token: string;
  userId: string;
};

export type LoginResponse = {
  signUP: JwtDto;
};

export type SignUpRequest = {
  input: UserSignUpModel;
};
