import { NextPage } from 'next';
import { ReactElement, ReactNode } from 'react';

export type NextPageLayout = NextPage & {
  // eslint-disable-next-line no-unused-vars
  getLayout?: (page: ReactElement) => ReactNode;
};
