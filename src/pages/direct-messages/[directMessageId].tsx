import { ReactElement } from 'react';
import AppLayout from '../../components/layouts/app-layout';
import FriendHeader from '../../components/layouts/app-layout/friends/friend-header/friend-header';
import FriendSidebar from '../../components/layouts/app-layout/friends/friend-sidebar/friend-sidebar';
import { NextPageLayout } from '../../utils/types/next-page-layout';

const DirectMessagePage: NextPageLayout = () => {
  return <>Direct message</>;
};

DirectMessagePage.getLayout = (page: ReactElement) => {
  return (
    <AppLayout header={<FriendHeader />} sidebar={<FriendSidebar />}>
      {page}
    </AppLayout>
  );
};

export default DirectMessagePage;
