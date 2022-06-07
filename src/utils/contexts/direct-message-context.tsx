import {
  createContext,
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useState,
} from 'react';
import MessageValidator from '../../server/validators/message';
import DirectMessageService from '../../services/direct-message-service';
import MessageService from '../../services/message-service';
import EventEnum from '../enums/events';
import MessageType from '../enums/message-type';
import useSocket from '../hooks/use-socket';
import useToasts from '../hooks/use-toasts';
import useUser from '../hooks/use-user';
import handleServiceError from '../services/handle-service-error';
import DirectMessageDto from '../types/dtos/direct-message';
import MessageDto from '../types/dtos/message';
import ErrorInterface from '../types/interfaces/error';
import CreateMessageRequest from '../types/requests/message/create-message';

interface DirectMessageContextInterface {
  loading: boolean;
  loadingMessages: boolean;
  messages: MessageDto[];
  directMessage: DirectMessageDto | null;
  setDirectMessage: Dispatch<SetStateAction<DirectMessageDto | null>>;
  // eslint-disable-next-line no-unused-vars
  loadDirectMessage: (directMessageId: string | number) => Promise<void>;
  // eslint-disable-next-line no-unused-vars
  sendDirectMessage: (body: string) => ErrorInterface[];
  // eslint-disable-next-line no-unused-vars
  loadMessages: (
    // eslint-disable-next-line no-unused-vars
    directMessageId: string | number,
    // eslint-disable-next-line no-unused-vars
    skip: number,
    // eslint-disable-next-line no-unused-vars
    take: number,
  ) => Promise<void>;
}

const defaultValues = {
  loading: false,
  loadingMessages: false,
  messages: [],
  directMessage: null,
  setDirectMessage: () => {},
  loadDirectMessage: async () => {},
  sendDirectMessage: () => [],
  loadMessages: async () => {},
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
  const { socket } = useSocket();
  const [loading, setLoading] = useState<boolean>(defaultValues.loading);
  const [messages, setMessages] = useState<MessageDto[]>(
    defaultValues.messages,
  );
  const [loadingMessages, setLoadingMessages] = useState<boolean>(
    defaultValues.loadingMessages,
  );
  const [directMessage, setDirectMessage] = useState<DirectMessageDto | null>(
    defaultValues.directMessage,
  );
  const { errorListToToasts, danger } = useToasts();

  const loadDirectMessage = useCallback(
    async (directMessageId: string | number) => {
      if (user == null || socket == null) return;

      setLoading(true);
      try {
        socket.current.emit(EventEnum.JOIN_DIRECT_MESSAGE, directMessageId);
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
    [socket, user],
  );

  const loadMessages = async (
    directMessageId: string | number,
    skip: number,
    take: number,
  ) => {
    setLoadingMessages(true);
    try {
      const response = await MessageService.list({
        directMessageId,
        skip,
        take,
      });
      setMessages((prev) => [...prev, ...response.data]);
    } catch (error) {
      setDirectMessage(null);
      const { errors } = handleServiceError(error);
      errorListToToasts(errors);
    } finally {
      setLoadingMessages(false);
    }
  };

  const sendDirectMessage = (body: string) => {
    if (
      socket == null ||
      socket.current.connected === false ||
      directMessage == null
    ) {
      danger('Uh oh!', 'Something went wrong. Please try again.');
      return [];
    }

    const payload: CreateMessageRequest = {
      type: MessageType.DIRECT,
      body: body,
      directMessageId: directMessage.id,
    };

    const validationErrors = MessageValidator.create(payload);
    if (validationErrors.length > 0) return validationErrors;

    socket.current.emit(EventEnum.SEND_DIRECT_MESSAGE, payload);
    return [];
  };

  const addMessage = (message: MessageDto) => {
    setMessages((prev) => {
      return [message, ...prev];
    });
  };

  useEffect(() => {
    if (
      socket == null ||
      socket.current.hasListeners(EventEnum.RECEIVE_DIRECT_MESSAGE)
    )
      return;

    const handler = (message: MessageDto) => {
      addMessage(message);
    };
    socket.current.on(EventEnum.RECEIVE_DIRECT_MESSAGE, handler);
    () => {
      socket.current.off(EventEnum.RECEIVE_DIRECT_MESSAGE, handler);
    };
  }, [socket]);

  return (
    <DirectMessageContext.Provider
      value={{
        loading,
        loadingMessages,
        directMessage,
        messages,
        setDirectMessage,
        loadDirectMessage,
        sendDirectMessage,
        loadMessages,
      }}
    >
      {children}
    </DirectMessageContext.Provider>
  );
};
