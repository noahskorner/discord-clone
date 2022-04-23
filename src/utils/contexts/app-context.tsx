import { createContext, Dispatch, SetStateAction, useState } from 'react';

interface AppContextInterface {
  showSidebar: boolean;
  showCreateChannelModal: boolean;
  setShowSidebar: Dispatch<SetStateAction<boolean>>;
  setShowCreateChannelModal: Dispatch<SetStateAction<boolean>>;
}

const defaultValues = {
  showSidebar: false,
  showCreateChannelModal: false,
  setShowSidebar: () => {},
  setShowCreateChannelModal: () => {},
};

export const AppContext = createContext<AppContextInterface>(defaultValues);

interface AppProviderInterface {
  children: JSX.Element;
}

export const AppProvider = ({ children }: AppProviderInterface) => {
  const [showSidebar, setShowSidebar] = useState(defaultValues.showSidebar);
  const [showCreateChannelModal, setShowCreateChannelModal] = useState(
    defaultValues.showCreateChannelModal,
  );

  return (
    <AppContext.Provider
      value={{
        showSidebar,
        showCreateChannelModal,
        setShowSidebar,
        setShowCreateChannelModal,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
