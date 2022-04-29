import type { NextPage } from 'next';
import AppLayout from '../components/layouts/app-layout';
import useRTC from '../utils/hooks/use-rtc';

const IndexPage: NextPage = () => {
  const { startCall } = useRTC();
  return (
    <AppLayout>
      <div>
        <button onClick={() => startCall()}>Start call</button>
      </div>
    </AppLayout>
  );
};

export default IndexPage;
