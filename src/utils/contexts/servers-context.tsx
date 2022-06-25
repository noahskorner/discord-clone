import {
  createContext,
  Dispatch,
  SetStateAction,
  useEffect,
  useState,
} from 'react';
import ServerService from '../../services/server-service';
import useAuth from '../hooks/use-auth';
import useToasts from '../hooks/use-toasts';
import handleServiceError from '../services/handle-service-error';
import ServerDto from '../types/dtos/server';

interface ServersContextInterface {
  servers: ServerDto[];
  loading: boolean;
  setServers: Dispatch<SetStateAction<ServerDto[]>>;
  // eslint-disable-next-line no-unused-vars
  addServer: (server: ServerDto) => void;
}

const defaultValues = {
  servers: [],
  setServers: () => {},
  loading: false,
  addServer: () => {},
};

export const ServersContext =
  createContext<ServersContextInterface>(defaultValues);

interface ServersProviderInterface {
  children: JSX.Element;
}

export const ServersProvider = ({ children }: ServersProviderInterface) => {
  const { loading: loadingAuth } = useAuth();
  const { danger } = useToasts();
  const [servers, setServers] = useState<ServerDto[]>(defaultValues.servers);
  const [loading, setLoading] = useState(defaultValues.loading);

  const addServer = (server: ServerDto) => {
    setServers((prev) => {
      return prev.some((e) => e.id === server.id) ? prev : [...prev, server];
    });
  };

  useEffect(() => {
    if (loadingAuth) return;

    const loadServers = async () => {
      setLoading(true);
      try {
        const response = await ServerService.list();
        setServers(response.data);
      } catch (error) {
        const { errors } = handleServiceError(error);
        if (errors != null) {
          errors.forEach((error) => {
            danger(error.message);
          });
        }
      } finally {
        setLoading(false);
      }
    };

    loadServers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loadingAuth]);

  return (
    <ServersContext.Provider
      value={{ servers, loading, setServers, addServer }}
    >
      {children}
    </ServersContext.Provider>
  );
};
