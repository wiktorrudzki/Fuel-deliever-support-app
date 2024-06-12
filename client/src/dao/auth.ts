import { AxiosResponse } from 'axios';

import { LoginResponse, UserCredentials } from '@/types/auth';

import api from './axios';

export const login = ({
  login,
  password,
}: UserCredentials): Promise<AxiosResponse<LoginResponse>> =>
  api.post('/login', { login, password });
