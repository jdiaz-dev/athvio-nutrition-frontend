export type CredentialsLogIn = {
  email: string;
  password: string;
};

export type JwtDto = {
  _id: string;
  userType: string;
  token: string;
};

export type LoginMutation = {
  logIn: JwtDto;
};

export type LoginRequest = {
  input: CredentialsLogIn;
};
