export interface FuelVolume {
  id: number;
  pb95: number;
  pb98: number;
  diesel: number;
  turboDiesel: number;
  stationId: number;
}

export type Station = {
  id: number;
  name: string;
  stationCapacity: FuelVolume;
  currentFuelVolume: FuelVolume;
};
