import { createContext, Dispatch, SetStateAction, useState } from 'react';
import ChannelService from '../../services/channel-service';
import useToasts from '../hooks/use-toasts';
import handleServiceError from '../services/handle-service-error';
import ChannelDto from '../types/dtos/channel';

interface ChannelContextInterface {
  loading: boolean;
  channel: ChannelDto | null;
  setChannel: Dispatch<SetStateAction<ChannelDto | null>>;
  // eslint-disable-next-line no-unused-vars
  loadChannel: (serverId: number, channelId: number) => Promise<void>;
}

const defaultValues = {
  loading: false,
  channel: null,
  setChannel: () => {},
  loadChannel: async () => {},
};

export const ChannelContext =
  createContext<ChannelContextInterface>(defaultValues);

interface ChannelProviderInterface {
  children: JSX.Element;
}

export const ChannelProvider = ({ children }: ChannelProviderInterface) => {
  const [loading, setLoading] = useState<boolean>(defaultValues.loading);
  const [channel, setChannel] = useState<ChannelDto | null>(
    defaultValues.channel,
  );

  const { danger } = useToasts();

  const loadChannel = async (serverId: number, channelId: number) => {
    setLoading(true);
    try {
      const response = await ChannelService.get(serverId, channelId);
      setChannel(response.data);
    } catch (error) {
      setChannel(null);
      const { errors } = handleServiceError(error);
      errors.forEach((error) => {
        danger(error.message);
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <ChannelContext.Provider
      value={{
        loading,
        channel,
        setChannel,
        loadChannel,
      }}
    >
      {children}
    </ChannelContext.Provider>
  );
};
