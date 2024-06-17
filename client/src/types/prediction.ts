export type Prediction = {
  id: number;
  pb95: number;
  pb98: number;
  stationId: number;
  turboDiesel: number;
  departureTime: string;
  diesel: number;
  driverId: number;
};

export type PredictionCreate = Partial<
  Pick<
    Prediction,
    'departureTime' | 'diesel' | 'pb95' | 'pb98' | 'turboDiesel' | 'driverId'
  >
>;
