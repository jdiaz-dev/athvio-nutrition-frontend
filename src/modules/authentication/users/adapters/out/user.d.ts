export type User = {
  uuid: string;
  firstname: string;
  lastname: string;
  email: string;
};

export type GetUserInput = {
  user: string;
};

export type GetUserRequest = {
  input: GetUserInput;
};

export type GetUserResponse = {
  getUser: User;
};
