import { ReactElement } from 'react';
import AppLayout from '../../components/layouts/app-layout';
import PendingFriends from '../../components/layouts/app-layout/friends/pending-friends';
import FriendHeader from '../../components/layouts/app-layout/friends/friend-header';
import { NextPageLayout } from '../../utils/types/next-page-layout';
import FriendSidebar from '../../components/layouts/app-layout/friends/friend-sidebar/friend-sidebar';

const PendingFriendsPage: NextPageLayout = () => {
  return <PendingFriends />;
};

PendingFriendsPage.getLayout = (page: ReactElement) => {
  return (
    <AppLayout header={<FriendHeader />} sidebar={<FriendSidebar />}>
      {page}
    </AppLayout>
  );
};

export default PendingFriendsPage;
