import { ReactElement } from 'react';
import AppLayout from '../../components/layouts/app-layout';
import FriendHeader from '../../components/layouts/app-layout/friends/friend-header';
import FriendSidebar from '../../components/layouts/app-layout/friends/friend-sidebar';
import { NextPageLayout } from '../../utils/types/next-page-layout';

const OnlineFriendsPage: NextPageLayout = () => {
  return <></>;
};

OnlineFriendsPage.getLayout = (page: ReactElement) => {
  return (
    <AppLayout header={<FriendHeader />} sidebar={<FriendSidebar />}>
      {page}
    </AppLayout>
  );
};

export default OnlineFriendsPage;
