import { AppProps } from 'next/app';
import { NextPageLayout } from './next-page-layout';

export type AppPropsLayout = AppProps & {
  Component: NextPageLayout;
};
