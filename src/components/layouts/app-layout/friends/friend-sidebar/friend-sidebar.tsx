import Sidebar from '../../sidebar';
import FriendSidebarBody from './friend-sidebar-body';
import FriendSidebarHeader from './friend-sidebar-header';

const FriendSidebar = () => {
  return (
    <Sidebar header={<FriendSidebarHeader />} body={<FriendSidebarBody />} />
  );
};

export default FriendSidebar;
