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

export type UpdateUserInput = {
  user: string;
  firstname: string;
  lastname: string;
  email: string;
  phone: string;
};

export type UpdateUserRequest = {
  input: UpdateUserInput;
};

export type UpdateUserResponse = {
  getUser: User;
};
