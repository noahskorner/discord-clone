import useServer from '../../../../utils/hooks/use-server';

const ServerHome = () => {
  const { server } = useServer();
  if (server == null) return null;

  return <>{server.name}s Home page</>;
};

export default ServerHome;
