import { AxiosResponse } from 'axios';

import api from './axios';

export const getAllPredictions = (): Promise<AxiosResponse<unknown[]>> =>
  api.get('/Prediction/GetAllPredictions');
