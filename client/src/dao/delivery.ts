import api from './axios';

export const getAllDeliveries = () =>
  api.get('/Delivery/GetAllDeliveries').then((res) => res.data);
