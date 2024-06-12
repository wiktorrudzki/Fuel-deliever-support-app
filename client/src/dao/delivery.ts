import { AxiosResponse } from 'axios';

import api from './axios';

export const getAllDeliveries = (): Promise<AxiosResponse<unknown[]>> =>
  api.get('/Delivery/GetAllDeliveries');

export const getDeliveryById = (id: string) =>
  api.get(`/Delivery/GetDeliveryById?id=${id}`);
