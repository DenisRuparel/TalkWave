import React, { createContext, useContext, useMemo, useState } from 'react';

interface UserContextValue {
  displayName: string;
  photoUri: string | null;
  setDisplayName: (name: string) => void;
  setPhotoUri: (uri: string | null) => void;
}

const UserContext = createContext<UserContextValue | undefined>(undefined);

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [displayName, setDisplayName] = useState<string>('');
  const [photoUri, setPhotoUri] = useState<string | null>(null);

  const value = useMemo(
    () => ({ displayName, photoUri, setDisplayName, setPhotoUri }),
    [displayName, photoUri]
  );

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export const useUser = (): UserContextValue => {
  const ctx = useContext(UserContext);
  if (!ctx) throw new Error('useUser must be used within UserProvider');
  return ctx;
};


