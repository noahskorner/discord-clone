import { createContext, Dispatch, SetStateAction, useState } from 'react';
import ServerDTO from '../types/dtos/server';

interface ServerContextInterface {
  server: ServerDTO | null;
  setServer: Dispatch<SetStateAction<ServerDTO | null>>;
}

const defaultValues = {
  server: null,
  setServer: () => {},
};

export const ServerContext =
  createContext<ServerContextInterface>(defaultValues);

interface ServerProviderInterface {
  children: JSX.Element;
}

export const ServerProvider = ({ children }: ServerProviderInterface) => {
  const [server, setServer] = useState<ServerDTO | null>(defaultValues.server);

  return (
    <ServerContext.Provider value={{ server, setServer }}>
      {children}
    </ServerContext.Provider>
  );
};
