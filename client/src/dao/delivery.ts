import { Delivery, DeliveryCreate } from '@/types/delivery';

import api from './axios';

export const getAllDeliveries = (stationId?: number) => {
  console.log(stationId);

  return stationId
    ? api.get<Delivery[]>(`/Delivery?stationId=${stationId}`)
    : api.get<Delivery[]>(`/Delivery`);
};

export const getDeliveryById = (id: string) =>
  api.get(`/Delivery/GetDeliveryById?id=${id}`);

export const createDelivery = (delivery: DeliveryCreate) =>
  api.post<Delivery>('/Delivery', delivery);
