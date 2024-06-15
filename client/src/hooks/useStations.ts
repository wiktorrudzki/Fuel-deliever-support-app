import { useContext } from 'react';

import { StationsContext } from './StationsProvider';

const useStations = () => {
  const context = useContext(StationsContext);

  if (!context) {
    throw new Error('cannot use useStations without provider');
  }

  return context;
};

export default useStations;
