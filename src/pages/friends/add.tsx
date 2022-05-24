import { ReactElement } from 'react';
import AppLayout from '../../components/layouts/app-layout';
import AddFriends from '../../components/layouts/app-layout/friends/add-friends';
import FriendHeader from '../../components/layouts/app-layout/friends/friend-header';
import FriendSidebar from '../../components/layouts/app-layout/friends/friend-sidebar';
import { NextPageLayout } from '../../utils/types/next-page-layout';

const AddFriendsPage: NextPageLayout = () => {
  return <AddFriends />;
};

AddFriendsPage.getLayout = (page: ReactElement) => {
  return (
    <AppLayout header={<FriendHeader />} sidebar={<FriendSidebar />}>
      {page}
    </AppLayout>
  );
};

export default AddFriendsPage;
