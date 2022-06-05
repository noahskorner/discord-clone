import { useRouter } from 'next/router';
import { ReactElement, useEffect } from 'react';
import AppLayout from '../../components/layouts/app-layout';
import ChannelTextArea from '../../components/layouts/app-layout/channels/text-channel/channel-text-area';
import FriendHeader from '../../components/layouts/app-layout/friends/friend-header/friend-header';
import FriendSidebar from '../../components/layouts/app-layout/friends/friend-sidebar/friend-sidebar';
import { DirectMessageProvider } from '../../utils/contexts/direct-message-context';
import useDirectMessage from '../../utils/hooks/use-direct-message';
import { NextPageLayout } from '../../utils/types/next-page-layout';

const DirectMessagePage: NextPageLayout = () => {
  const router = useRouter();
  const { loadDirectMessage } = useDirectMessage();
  const { directMessageId } = router.query as {
    directMessageId: string;
  };

  useEffect(() => {
    loadDirectMessage(directMessageId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [directMessageId]);

  return (
    <div className="relative z-0 flex h-full max-h-full w-full flex-col justify-between pr-1">
      <div className="flex h-full w-full flex-col-reverse overflow-y-scroll p-4">
        {directMessageId}
      </div>
      <ChannelTextArea placeholder="PLACEHOLDER" />
    </div>
  );
};

DirectMessagePage.getLayout = (page: ReactElement) => {
  return (
    <AppLayout header={<FriendHeader />} sidebar={<FriendSidebar />}>
      <DirectMessageProvider>{page}</DirectMessageProvider>
    </AppLayout>
  );
};

export default DirectMessagePage;
