import { useRouter } from 'next/router';
import ServerBody from './server-body';

const SidebarBody = () => {
  const router = useRouter();
  const isServerPage = router.pathname.toLowerCase().includes('server');

  return isServerPage ? <ServerBody /> : <></>;
};

export default SidebarBody;
