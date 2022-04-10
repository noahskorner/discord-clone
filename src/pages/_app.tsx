import type { AppProps } from 'next/app';
import GlobalLayout from '../components/layouts/global-layout';
import '../styles/globals.css';

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <GlobalLayout>
      <Component {...pageProps} />
    </GlobalLayout>
  );
};

export default App;
