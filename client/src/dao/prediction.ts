import { Prediction } from '@/types/prediction';

import api from './axios';

export const getPredictionById = (id: number) =>
  api.get<Prediction>(`/Prediction/${id}`);
