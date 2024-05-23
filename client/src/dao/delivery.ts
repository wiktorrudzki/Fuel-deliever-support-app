import api from './axios';

export const getAllDeliveries = (): Promise<{ id: string }[]> =>
  api.get('/Delivery/GetAllDeliveries').then((res) => res.data);
