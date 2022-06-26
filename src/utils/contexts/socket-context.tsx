import { createContext, MutableRefObject, useEffect, useRef } from 'react';
import { io, Socket } from 'socket.io-client';
import { DefaultEventsMap } from 'socket.io/dist/typed-events';
import EventEnum from '../enums/events';
import useAuth from '../hooks/use-auth';
import useUser from '../hooks/use-user';
import DirectMessageDto from '../types/dtos/direct-message';

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
  const { addDirectMessage } = useUser();
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

  useEffect(() => {
    if (
      socket == null ||
      socket.current.hasListeners(EventEnum.DIRECT_MESSAGE_CREATED)
    )
      return;

    const handler = (directMessage: DirectMessageDto) => {
      addDirectMessage(directMessage);
    };
    socket.current.on(EventEnum.DIRECT_MESSAGE_CREATED, handler);

    () => {
      socket.current.off(EventEnum.DIRECT_MESSAGE_CREATED, handler);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [socket]);

  return (
    <SocketContext.Provider value={{ socket }}>
      {children}
    </SocketContext.Provider>
  );
};
