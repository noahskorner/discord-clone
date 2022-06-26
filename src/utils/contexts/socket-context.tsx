import { createContext, MutableRefObject, useEffect, useRef } from 'react';
import { io, Socket } from 'socket.io-client';
import { DefaultEventsMap } from 'socket.io/dist/typed-events';
import useAuth from '../hooks/use-auth';

const BASE_URL = process.env.HOST ?? '';

interface SocketContextInterface {
  socket: null | MutableRefObject<Socket<DefaultEventsMap, DefaultEventsMap>>;
}

const defaultValues = {
  socket: null,
};

export const SocketContext =
  createContext<SocketContextInterface>(defaultValues);

interface SocketProviderInterface {
  children: JSX.Element;
}

export const SocketProvider = ({ children }: SocketProviderInterface) => {
  const { accessToken } = useAuth();
  const socket = useRef(
    io(BASE_URL, {
      query: { accessToken },
    }),
  );

  useEffect(() => {
    socket.current.connect();

    () => {
      socket.current.disconnect();
    };
  }, []);
  return (
    <SocketContext.Provider value={{ socket }}>
      {children}
    </SocketContext.Provider>
  );
};
