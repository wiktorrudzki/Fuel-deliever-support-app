export type Delivery = {
  id: number;
  pb95: number;
  pb98: number;
  stationId: number;
  turboDiesel: number;
  departureTime: string;
  diesel: number;
  driverId?: number;
};

export type DeliveryCreate = {
  pb95: number;
  pb98: number;
  stationId: number;
  turboDiesel: number;
  departureTime: string;
  diesel: number;
  driverId?: number;
};
