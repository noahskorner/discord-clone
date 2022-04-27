import { createContext, MutableRefObject, useEffect, useRef } from 'react';
import { io, Socket } from 'socket.io-client';
import { DefaultEventsMap } from 'socket.io/dist/typed-events';

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
  const socket = useRef(io('http://localhost:3000'));

  useEffect(() => {
    socket.current.connect();
  }, []);
  return (
    <SocketContext.Provider value={{ socket }}>
      {children}
    </SocketContext.Provider>
  );
};
