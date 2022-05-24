import { ReactElement } from 'react';
import AppLayout from '../../components/layouts/app-layout';
import PendingFriends from '../../components/layouts/app-layout/friends/pending-friends';
import { NextPageLayout } from '../../utils/types/next-page-layout';

const PendingFriendsPage: NextPageLayout = () => {
  return <PendingFriends />;
};

PendingFriendsPage.getLayout = (page: ReactElement) => {
  return <AppLayout>{page}</AppLayout>;
};

export default PendingFriendsPage;
