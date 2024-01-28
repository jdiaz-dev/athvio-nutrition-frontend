export type CredentialsSignIn = {
  email: string;
  password: string;
};

export type JwtDto = {
  _id: string;
  userType: string;
  token: string;
};

export type SignInMutation = {
  signIn: JwtDto;
};

export type SignInRequest = {
  input: CredentialsSignIn;
};
