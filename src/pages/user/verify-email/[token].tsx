import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import UserService from '../../../services/user-service';
import useToasts from '../../../utils/hooks/use-toasts';
import handleServiceError from '../../../utils/services/handle-service-error';

const VerifyEmailPage: NextPage = () => {
  const router = useRouter();
  const { token } = router.query as { token?: string };
  const { success, danger } = useToasts();

  useEffect(() => {
    const verifyEmail = async () => {
      if (token == null) return;

      try {
        await UserService.verifyEmail(token);
        success('Email verified!', 'You can login now, champ.');
        return router.push('/login');
      } catch (error) {
        const response = handleServiceError(error);
        response.errors.forEach((error) => {
          danger('Uh oh!', error.message);
        });
        return router.push('/login');
      }
    };

    verifyEmail();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  return <></>;
};

export default VerifyEmailPage;
