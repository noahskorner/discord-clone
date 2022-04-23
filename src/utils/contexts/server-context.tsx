import { createContext, Dispatch, SetStateAction, useState } from 'react';
import ServerService from '../../services/server-service';
import ChannelType from '../enums/channel-type';
import useToasts from '../hooks/use-toasts';
import handleServiceError from '../services/handle-service-error';
import ChannelDto from '../types/dtos/channel';
import ServerDto from '../types/dtos/server';

interface ServerContextInterface {
  loading: boolean;
  isHomePage: boolean;
  server: ServerDto | null;
  textChannels: ChannelDto[];
  voiceChannels: ChannelDto[];
  setServer: Dispatch<SetStateAction<ServerDto | null>>;
  // eslint-disable-next-line no-unused-vars
  setChannels: (channels: ChannelDto[]) => void;
  // eslint-disable-next-line no-unused-vars
  loadServer: (serverId: number | null) => Promise<void>;
}

const defaultValues = {
  loading: false,
  isHomePage: true,
  server: null,
  textChannels: [],
  voiceChannels: [],
  setServer: () => {},
  setChannels: () => {},
  loadServer: async () => {},
};

export const ServerContext =
  createContext<ServerContextInterface>(defaultValues);

interface ServerProviderInterface {
  children: JSX.Element;
}

export const ServerProvider = ({ children }: ServerProviderInterface) => {
  const [loading, setLoading] = useState<boolean>(defaultValues.loading);
  const [server, setServer] = useState<ServerDto | null>(defaultValues.server);
  const isHomePage = server == null;

  const { danger } = useToasts();

  const textChannels =
    server == null
      ? []
      : server.channels.filter((channel) => channel.type === ChannelType.TEXT);
  const voiceChannels =
    server == null
      ? []
      : server.channels.filter((channel) => channel.type === ChannelType.VOICE);
  const loadServer = async (serverId: number | null) => {
    if (serverId == null) {
      setServer(null);
      return;
    }

    setLoading(true);
    try {
      const response = await ServerService.get(serverId);
      setServer(response.data);
    } catch (error) {
      setServer(null);
      const { errors } = handleServiceError(error);
      errors.forEach((error) => {
        danger(error.message);
      });
    } finally {
      setLoading(false);
    }
  };
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
      value={{
        loading,
        isHomePage,
        server,
        textChannels,
        voiceChannels,
        setServer,
        setChannels,
        loadServer,
      }}
    >
      {children}
    </ServerContext.Provider>
  );
};
