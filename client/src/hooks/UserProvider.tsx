import { createContext, useState } from 'react';

import { User } from '@/types/auth';

type UserContextType = {
  isLogged: boolean;
  user: User | null;
  setUser: (user: User | null) => void;
};

export const UserContext = createContext<UserContextType | null>(null);

type Props = {
  children: React.ReactNode;
};

export const UserProvider = ({ children }: Props) => {
  const storedUser = localStorage.getItem('User');
  const token = localStorage.getItem('Authorization');

  const [user, setUser] = useState<User | null>(
    storedUser && token ? JSON.parse(storedUser) : null
  );

  return (
    <UserContext.Provider value={{ isLogged: user !== null, user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};
