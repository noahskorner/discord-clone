import {
  createContext,
  Dispatch,
  SetStateAction,
  useCallback,
  useState,
} from 'react';
import DirectMessageService from '../../services/direct-message-service';
import useToasts from '../hooks/use-toasts';
import useUser from '../hooks/use-user';
import handleServiceError from '../services/handle-service-error';
import DirectMessageDto from '../types/dtos/direct-message';

interface DirectMessageContextInterface {
  loading: boolean;
  directMessage: DirectMessageDto | null;
  setDirectMessage: Dispatch<SetStateAction<DirectMessageDto | null>>;
  // eslint-disable-next-line no-unused-vars
  loadDirectMessage: (directMessageId: string | number) => Promise<void>;
}

const defaultValues = {
  loading: false,
  directMessage: null,
  setDirectMessage: () => {},
  loadDirectMessage: async () => {},
};

export const DirectMessageContext =
  createContext<DirectMessageContextInterface>(defaultValues);

interface DirectMessageProviderInterface {
  children: JSX.Element;
}

export const DirectMessageProvider = ({
  children,
}: DirectMessageProviderInterface) => {
  const { user } = useUser();
  const [loading, setLoading] = useState<boolean>(defaultValues.loading);
  const [directMessage, setDirectMessage] = useState<DirectMessageDto | null>(
    defaultValues.directMessage,
  );

  const { errorListToToasts } = useToasts();

  const loadDirectMessage = useCallback(
    async (directMessageId: string | number) => {
      if (directMessageId == null || user == null) return;

      setLoading(true);
      try {
        const response = await DirectMessageService.get({
          userId: user.id,
          directMessageId,
        });
        setDirectMessage(response.data);
      } catch (error) {
        setDirectMessage(null);
        const { errors } = handleServiceError(error);
        errorListToToasts(errors);
      } finally {
        setLoading(false);
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [user],
  );

  return (
    <DirectMessageContext.Provider
      value={{
        loading,
        directMessage,
        setDirectMessage,
        loadDirectMessage,
      }}
    >
      {children}
    </DirectMessageContext.Provider>
  );
};
