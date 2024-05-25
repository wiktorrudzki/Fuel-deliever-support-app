import { Login, UserCredentials } from '@/types/auth';

import api from './axios';

export const login = ({ login, password }: UserCredentials): Promise<Login> =>
  api.post('/Login', { login, password });
