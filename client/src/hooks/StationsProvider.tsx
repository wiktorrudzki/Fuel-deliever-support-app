import React, { useEffect, useState } from 'react';

import { getAllStations } from '@/dao/station';
import { Station } from '@/types/station';

import usePromise from './usePromise';

type StationContextType = {
  stations: Station[];
  isLoading: boolean;
};

export const StationsContext = React.createContext<StationContextType | null>(
  null
);

type Props = {
  children: React.ReactNode;
};

export const StationsProvider = ({ children }: Props) => {
  const [stations, setStations] = useState<Station[]>([]);

  const [getStations, isLoading] = usePromise(
    getAllStations,
    ({ status, data }) => {
      if (status === 200 && data.length) {
        setStations(data);
      } else {
        console.log('no stations in db');
      }
    },
    (e) => {
      console.error(e);
    }
  );

  useEffect(() => {
    getStations();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <StationsContext.Provider value={{ stations, isLoading }}>
      {children}
    </StationsContext.Provider>
  );
};
