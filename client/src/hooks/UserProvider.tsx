import { createContext, useEffect, useState } from 'react';

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
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    if (user) {
      return;
    }

    const storedUser = localStorage.getItem('User');
    const token = localStorage.getItem('Authorization');

    if (!user && storedUser && token) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  return (
    <UserContext.Provider value={{ isLogged: user !== null, user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};
