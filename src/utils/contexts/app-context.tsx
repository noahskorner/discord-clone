import { createContext, Dispatch, SetStateAction, useState } from 'react';

interface AppContextInterface {
  showSidebar: boolean;
  showCreateChannelModal: boolean;
  showInvitePeopleModal: boolean;
  setShowSidebar: Dispatch<SetStateAction<boolean>>;
  setShowCreateChannelModal: Dispatch<SetStateAction<boolean>>;
  setShowInvitePeopleModal: Dispatch<SetStateAction<boolean>>;
}

const defaultValues = {
  showSidebar: false,
  showCreateChannelModal: false,
  showInvitePeopleModal: false,
  setShowSidebar: () => {},
  setShowCreateChannelModal: () => {},
  setShowInvitePeopleModal: () => {},
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
  const [showInvitePeopleModal, setShowInvitePeopleModal] = useState(
    defaultValues.showInvitePeopleModal,
  );

  return (
    <AppContext.Provider
      value={{
        showSidebar,
        showCreateChannelModal,
        showInvitePeopleModal,
        setShowSidebar,
        setShowCreateChannelModal,
        setShowInvitePeopleModal,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
