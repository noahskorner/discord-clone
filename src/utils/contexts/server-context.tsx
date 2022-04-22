import { createContext, Dispatch, SetStateAction, useState } from 'react';
import ServerDto from '../types/dtos/server';

interface ServerContextInterface {
  server: ServerDto | null;
  setServer: Dispatch<SetStateAction<ServerDto | null>>;
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
  const [server, setServer] = useState<ServerDto | null>(defaultValues.server);

  return (
    <ServerContext.Provider value={{ server, setServer }}>
      {children}
    </ServerContext.Provider>
  );
};
