import { Login, UserCredentials } from '@/types/auth';

// import api from './axios';

export const login = ({ login, password }: UserCredentials): Promise<Login> =>
  Promise.resolve({
    isAuth: true,
    token: 'siemano tu token',
    user: {
      id: 1,
      login: 'JanKowalki@gmail.com',
      name: 'Jan',
      lastName: 'Kowalski',
    },
  });
// api.post('/login', { login, password });
