import { useRouter } from 'next/router';
import ServerHeader from './server-header';

const SidebarHeader = () => {
  const router = useRouter();
  const isServerPage = router.pathname.toLowerCase().includes('server');

  return isServerPage ? <ServerHeader /> : <></>;
};

export default SidebarHeader;
