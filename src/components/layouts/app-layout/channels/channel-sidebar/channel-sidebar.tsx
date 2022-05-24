import Sidebar from '../../sidebar';
import ServerBody from '../server-body';
import ServerHeader from '../server-header';

const ChannelSidebar = () => {
  return <Sidebar header={<ServerHeader />} body={<ServerBody />} />;
};

export default ChannelSidebar;
