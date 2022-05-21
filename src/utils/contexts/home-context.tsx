import { createContext, Dispatch, SetStateAction, useState } from 'react';
import HomeState from '../enums/home-state';

interface HomeContextInterface {
  state: HomeState;
  setState: Dispatch<SetStateAction<HomeState>>;
}

const defaultValues = {
  state: HomeState.ONLINE,
  setState: () => {},
};

export const HomeContext = createContext<HomeContextInterface>(defaultValues);

interface HomeProviderInterface {
  children: JSX.Element;
}

export const HomeProvider = ({ children }: HomeProviderInterface) => {
  const [state, setState] = useState(defaultValues.state);

  return (
    <HomeContext.Provider
      value={{
        state,
        setState,
      }}
    >
      {children}
    </HomeContext.Provider>
  );
};
