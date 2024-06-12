import { useContext } from 'react';

import { UserContext } from './UserProvider';

const useUser = () => {
  const context = useContext(UserContext);

  if (!context) {
    throw new Error('useUser cannot be used without provider');
  }

  return context;
};

export default useUser;
