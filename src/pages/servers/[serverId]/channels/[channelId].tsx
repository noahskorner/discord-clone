import { useRouter } from 'next/router';
import { ReactElement, useEffect } from 'react';
import AppLayout from '../../../../components/layouts/app-layout';
import ChannelHeader from '../../../../components/layouts/app-layout/channels/channel-header/channel-header';
import ChannelSidebar from '../../../../components/layouts/app-layout/channels/channel-sidebar/channel-sidebar';
import TextChannel from '../../../../components/layouts/app-layout/channels/text-channel';
import VoiceChannel from '../../../../components/layouts/app-layout/channels/voice-channel';
import ChannelType from '../../../../utils/enums/channel-type';
import useChannel from '../../../../utils/hooks/use-channel';
import useServer from '../../../../utils/hooks/use-server';
import { NextPageLayout } from '../../../../utils/types/next-page-layout';

const Channel = () => {
  const { channel } = useChannel();
  return channel == null ? (
    <></>
  ) : channel.type === ChannelType.TEXT ? (
    <TextChannel />
  ) : channel.type === ChannelType.VOICE ? (
    <VoiceChannel />
  ) : (
    <></>
  );
};

const ChannelPage: NextPageLayout = () => {
  const router = useRouter();
  const { serverId, channelId } = router.query as {
    serverId: string;
    channelId: string;
  };
  const { loadServer } = useServer();
  const { loadChannel } = useChannel();

  useEffect(() => {
    const loadServerAndChannel = async (
      serverId: string,
      channelId: string,
    ) => {
      const newServerId = parseInt(serverId);
      const newChannelId = parseInt(channelId);

      if (isNaN(newServerId) || isNaN(newChannelId)) return;

      await loadServer(newServerId);
      await loadChannel(newChannelId);
    };

    loadServerAndChannel(serverId, channelId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [channelId, serverId]);

  return <Channel />;
};

ChannelPage.getLayout = (page: ReactElement) => {
  return (
    <AppLayout header={<ChannelHeader />} sidebar={<ChannelSidebar />}>
      {page}
    </AppLayout>
  );
};

export default ChannelPage;
