import {
  createContext,
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useState,
} from 'react';
import ChannelService from '../../services/channel-service';
import useServer from '../hooks/use-server';
import useToasts from '../hooks/use-toasts';
import handleServiceError from '../services/handle-service-error';
import ChannelDto from '../types/dtos/channel';

interface ChannelContextInterface {
  loading: boolean;
  channel: ChannelDto | null;
  setChannel: Dispatch<SetStateAction<ChannelDto | null>>;
  // eslint-disable-next-line no-unused-vars
  loadChannel: (channelId: number | null) => Promise<void>;
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

  const { server, textChannels } = useServer();
  const { danger } = useToasts();

  const loadChannel = useCallback(
    async (channelId: number | null) => {
      if (channelId == null) {
        setChannel(null);
        return;
      }

      setLoading(true);
      try {
        const response = await ChannelService.get(server!.id, channelId);
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
    },
    [danger, server],
  );

  useEffect(() => {
    if (textChannels.length > 0) {
      loadChannel(textChannels[0].id);
    }
  }, [loadChannel, textChannels]);

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
