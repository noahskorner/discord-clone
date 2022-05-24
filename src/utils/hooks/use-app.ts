import { useRouter } from 'next/router';
import { useContext } from 'react';
import { AppContext } from '../contexts/app-context';

const useApp = () => {
  const router = useRouter();

  const isHomePage =
    router.pathname === '/' || router.pathname.includes('friend');

  return { isHomePage, ...useContext(AppContext) };
};

export default useApp;
