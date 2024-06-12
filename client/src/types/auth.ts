export type User = {
  id: number;
  login: string;
  name?: string;
  lastName?: string;
};

export type UserCredentials = {
  login: string;
  password: string;
};

export type LoginResponse = User & {
  token: string;
};
