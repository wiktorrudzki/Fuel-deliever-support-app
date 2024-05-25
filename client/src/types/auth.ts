export type User = {
  id: number;
  login: string;
  name: string;
  lastName: string;
};

export type UserCredentials = {
  login: string;
  password: string;
};

export type Login = {
  isAuth: boolean;
  user: User;
};
