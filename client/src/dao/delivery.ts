import { AxiosResponse } from 'axios';

import { Delivery } from '@/types/delivery';

import api from './axios';

export const getAllDeliveries = (): Promise<AxiosResponse<unknown[]>> =>
  api.get('/Delivery/GetAllDeliveries');

export const getDeliveryById = (id: string) =>
  api.get(`/Delivery/GetDeliveryById?id=${id}`);

export const createDelivery = (delivery: Delivery) =>
  api.post('/Delivery', delivery);
