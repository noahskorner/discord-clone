import useServer from '../../../../utils/hooks/use-server';
import ServerHeader from './server-header';

const SidebarHeader = () => {
  const { server } = useServer();
  const isServerPage = server != null;

  return isServerPage ? <ServerHeader /> : <></>;
};

export default SidebarHeader;
