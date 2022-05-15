import { ReactElement } from 'react';
import AppLayout from '../components/layouts/app-layout';
import TextChannel from '../components/layouts/app-layout/channels/text-channel';
import VoiceChannel from '../components/layouts/app-layout/channels/voice-channel';
import Home from '../components/layouts/app-layout/home';
import ServerHome from '../components/layouts/app-layout/server-home';
import ChannelType from '../utils/enums/channel-type';
import useChannel from '../utils/hooks/use-channel';
import useServer from '../utils/hooks/use-server';
import { NextPageLayout } from '../utils/types/next-page-layout';

const IndexPage: NextPageLayout = () => {
  const { server } = useServer();
  const { channel } = useChannel();

  return server == null ? (
    <Home />
  ) : channel == null ? (
    <ServerHome />
  ) : channel.type === ChannelType.TEXT ? (
    <TextChannel />
  ) : channel.type === ChannelType.VOICE ? (
    <VoiceChannel />
  ) : (
    <>Something went wrong :( Please try again.</>
  );
};

IndexPage.getLayout = (page: ReactElement) => {
  return <AppLayout>{page}</AppLayout>;
};

export default IndexPage;
