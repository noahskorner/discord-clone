import { ReactElement } from 'react';
import AppLayout from '../../components/layouts/app-layout';
import AddFriends from '../../components/layouts/app-layout/friends/add-friends';
import { NextPageLayout } from '../../utils/types/next-page-layout';

const AddFriendsPage: NextPageLayout = () => {
  return <AddFriends />;
};

AddFriendsPage.getLayout = (page: ReactElement) => {
  return <AppLayout>{page}</AppLayout>;
};

export default AddFriendsPage;
