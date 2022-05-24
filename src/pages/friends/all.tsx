import { ReactElement } from 'react';
import AppLayout from '../../components/layouts/app-layout';
import AllFriends from '../../components/layouts/app-layout/friends/all-friends';
import FriendHeader from '../../components/layouts/app-layout/friends/friend-header';
import FriendSidebar from '../../components/layouts/app-layout/friends/friend-sidebar';
import { NextPageLayout } from '../../utils/types/next-page-layout';

const AllFriendsPage: NextPageLayout = () => {
  return <AllFriends />;
};

AllFriendsPage.getLayout = (page: ReactElement) => {
  return (
    <AppLayout header={<FriendHeader />} sidebar={<FriendSidebar />}>
      {page}
    </AppLayout>
  );
};

export default AllFriendsPage;
