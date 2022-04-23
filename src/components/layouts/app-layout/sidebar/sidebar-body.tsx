import useServer from '../../../../utils/hooks/use-server';
import ServerBody from './server-body';

const SidebarBody = () => {
  const { server } = useServer();
  const isServerPage = server != null;

  return isServerPage ? <ServerBody /> : <></>;
};

export default SidebarBody;
