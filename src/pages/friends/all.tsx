import { ReactElement } from 'react';
import AppLayout from '../../components/layouts/app-layout';
import AllFriends from '../../components/layouts/app-layout/friends/all-friends';
import { NextPageLayout } from '../../utils/types/next-page-layout';

const AllFriendsPage: NextPageLayout = () => {
  return <AllFriends />;
};

AllFriendsPage.getLayout = (page: ReactElement) => {
  return <AppLayout>{page}</AppLayout>;
};

export default AllFriendsPage;
