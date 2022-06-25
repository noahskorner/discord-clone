import { useRouter } from 'next/router';
import { ReactElement, useEffect } from 'react';
import Spinner from '../../../components/inputs/spinner';
import AppLayout from '../../../components/layouts/app-layout';
import ChannelHeader from '../../../components/layouts/app-layout/channels/channel-header/channel-header';
import ChannelSidebar from '../../../components/layouts/app-layout/channels/channel-sidebar';
import useServer from '../../../utils/hooks/use-server';

const ServerHomePage = () => {
  const router = useRouter();
  const { serverId } = router.query as {
    serverId: string;
  };
  const { server, loadServer } = useServer();

  useEffect(() => {
    loadServer(parseInt(serverId));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [serverId]);

  return server == null ? <Spinner size="lg" /> : <>{server.name}s Home page</>;
};

ServerHomePage.getLayout = (page: ReactElement) => {
  return (
    <AppLayout header={<ChannelHeader />} sidebar={<ChannelSidebar />}>
      {page}
    </AppLayout>
  );
};

export default ServerHomePage;
