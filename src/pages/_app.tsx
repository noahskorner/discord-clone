import GlobalLayout from '../components/layouts/global-layout';
import '../styles/globals.css';
import { AppPropsLayout } from '../utils/types/app-props-layout';

const App = ({ Component, pageProps }: AppPropsLayout) => {
  const getLayout = Component.getLayout ?? ((page) => page);

  return <GlobalLayout>{getLayout(<Component {...pageProps} />)}</GlobalLayout>;
};

export default App;
