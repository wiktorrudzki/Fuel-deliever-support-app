import { Station } from '@/types/station';

import api from './axios';

export const getAllStations = () =>
  api.get<Station[]>('/Station/GetAllStations');
