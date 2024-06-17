import { Driver } from '@/types/driver';

import api from './axios';

export const getAllDrivers = () => api.get<Driver[]>('/Driver');
