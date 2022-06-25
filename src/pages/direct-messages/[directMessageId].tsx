import { useRouter } from 'next/router';
import { ReactElement, useEffect, KeyboardEvent, useState } from 'react';
import Spinner from '../../components/inputs/spinner';
import AppLayout from '../../components/layouts/app-layout';
import ChannelTextArea from '../../components/layouts/app-layout/channels/text-channel/channel-text-area';
import DirectMessages from '../../components/layouts/app-layout/direct-messages';
import FriendHeader from '../../components/layouts/app-layout/friends/friend-header/friend-header';
import FriendSidebar from '../../components/layouts/app-layout/friends/friend-sidebar/friend-sidebar';
import { DirectMessageProvider } from '../../utils/contexts/direct-message-context';
import useDirectMessage from '../../utils/hooks/use-direct-message';
import useUser from '../../utils/hooks/use-user';
import { getLabel } from '../../utils/types/dtos/direct-message';
import { NextPageLayout } from '../../utils/types/next-page-layout';

const DEFAULT_MESSAGE_TAKE = 50;

const DirectMessagePage: NextPageLayout = () => {
  const router = useRouter();
  const {
    directMessage,
    loading,
    loadingMessages,
    loadDirectMessage,
    sendDirectMessage,
    loadMessages,
  } = useDirectMessage();
  const { directMessageId } = router.query as {
    directMessageId: string;
  };
  const { user } = useUser();
  const [body, setBody] = useState('');

  useEffect(() => {
    if (directMessageId == null) return;
    loadDirectMessage(directMessageId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [directMessageId, loadDirectMessage]);

  useEffect(() => {
    if (directMessageId == null) return;
    loadMessages(directMessageId, 0, DEFAULT_MESSAGE_TAKE);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [directMessageId]);

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      const validationErrors = sendDirectMessage(body);
      console.log(validationErrors);
      setBody('');
    }
  };

  return (
    <div className="relative z-0 flex h-full max-h-full w-full flex-col justify-between pr-1">
      {!loading ? (
        <div className="flex h-full w-full flex-col-reverse overflow-y-scroll">
          {loadingMessages && (
            <div className="center w-full">
              <Spinner size="lg" />
            </div>
          )}
          <DirectMessages />
        </div>
      ) : (
        <>Loading</>
      )}
      <ChannelTextArea
        value={body}
        onInput={setBody}
        onKeyDown={handleKeyDown}
        placeholder={`Message ${
          directMessage != null ? getLabel(user!.id, directMessage) : ''
        }`}
      />
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
