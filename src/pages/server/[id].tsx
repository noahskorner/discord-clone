import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import AppLayout from '../../components/layouts/app-layout';
import ServerService from '../../services/server-service';
import useAuth from '../../utils/hooks/use-auth';
import useServer from '../../utils/hooks/use-server';
import useToasts from '../../utils/hooks/use-toasts';
import handleServiceError from '../../utils/services/handle-service-error';

const ServerPage: NextPage = () => {
  const router = useRouter();
  const { danger } = useToasts();
  const { setServer } = useServer();
  const { id } = router.query as { id: string };
  const { loading: loadingAuth } = useAuth();

  useEffect(() => {
    if (loadingAuth || id == null) return;

    const loadServer = async () => {
      try {
        const response = await ServerService.get(id);
        const server = response.data;
        setServer(server);
      } catch (error) {
        const { errors } = handleServiceError(error);
        errors.forEach((error) => {
          danger(error.message);
        });
        router.push('/');
      }
    };

    loadServer();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, loadingAuth]);

  return (
    <AppLayout>
      <div>{id}</div>
    </AppLayout>
  );
};

export default ServerPage;
