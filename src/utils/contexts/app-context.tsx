import { createContext, Dispatch, SetStateAction, useState } from 'react';

interface AppContextInterface {
  showSidebar: boolean;
  setShowSidebar: Dispatch<SetStateAction<boolean>>;
}

const defaultValues = {
  showSidebar: false,
  setShowSidebar: () => {},
};

export const AppContext = createContext<AppContextInterface>(defaultValues);

interface AppProviderInterface {
  children: JSX.Element;
}

export const AppProvider = ({ children }: AppProviderInterface) => {
  const [showSidebar, setShowSidebar] = useState(false);

  return (
    <AppContext.Provider value={{ showSidebar, setShowSidebar }}>
      {children}
    </AppContext.Provider>
  );
};
