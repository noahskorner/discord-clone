import { createContext, Dispatch, SetStateAction, useState } from 'react';
import ChannelType from '../enums/channel-type';
import ChannelDto from '../types/dtos/channel';
import ServerDto from '../types/dtos/server';

interface ServerContextInterface {
  server: ServerDto | null;
  textChannels: ChannelDto[];
  voiceChannels: ChannelDto[];
  setServer: Dispatch<SetStateAction<ServerDto | null>>;
  // eslint-disable-next-line no-unused-vars
  setChannels: (channels: ChannelDto[]) => void;
}

const defaultValues = {
  server: null,
  textChannels: [],
  voiceChannels: [],
  setServer: () => {},
  setChannels: () => {},
};

export const ServerContext =
  createContext<ServerContextInterface>(defaultValues);

interface ServerProviderInterface {
  children: JSX.Element;
}

export const ServerProvider = ({ children }: ServerProviderInterface) => {
  const [server, setServer] = useState<ServerDto | null>(defaultValues.server);

  const textChannels =
    server == null
      ? []
      : server.channels.filter((channel) => channel.type === ChannelType.TEXT);
  const voiceChannels =
    server == null
      ? []
      : server.channels.filter((channel) => channel.type === ChannelType.VOICE);
  const setChannels = (channels: ChannelDto[]) => {
    setServer((prev) => {
      return prev != null
        ? {
            ...prev,
            channels,
          }
        : prev;
    });
  };

  return (
    <ServerContext.Provider
      value={{ server, textChannels, voiceChannels, setServer, setChannels }}
    >
      {children}
    </ServerContext.Provider>
  );
};
