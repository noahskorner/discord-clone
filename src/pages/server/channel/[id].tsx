import { NextPage } from 'next';
import { useRouter } from 'next/router';
import AppLayout from '../../../components/layouts/app-layout';

const ChannelPage: NextPage = () => {
  return (
    <AppLayout>
      <ChannelPageContent />
    </AppLayout>
  );
};

const ChannelPageContent = () => {
  const router = useRouter();
  const { id } = router.query as { id: string };

  return <div>{id}</div>;
};

export default ChannelPage;
