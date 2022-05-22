import useApp from '../../../../../utils/hooks/use-app';
import Modal from '../../../../utils/modal';
import { KeyboardEvent, useState } from 'react';
import IconButton from '../../../../inputs/icon-button';
import { CloseIcon, IconSize, SearchIcon } from '../../../../icons';
import useServer from '../../../../../utils/hooks/use-server';
import TextField from '../../../../inputs/text-field';
import useUser from '../../../../../utils/hooks/use-user';

const InvitePeopleModal = () => {
  const { showInvitePeopleModal, setShowInvitePeopleModal } = useApp();
  const { server } = useServer();
  const [searchText, setSearchText] = useState('');
  const { friends } = useUser();
  const filteredFriends = friends.filter((f) =>
    f.username.includes(searchText),
  );

  const handleCloseModalBtnClick = () => {
    setShowInvitePeopleModal(false);
  };
  const handleKeyDown = async (event: KeyboardEvent) => {
    // if (event.key === 'Enter') await createChannel();
  };

  return (
    <Modal
      showModal={showInvitePeopleModal}
      setShowModal={setShowInvitePeopleModal}
    >
      <div
        onClick={(event) => event.stopPropagation()}
        onKeyDown={handleKeyDown}
        className="flex w-full max-w-md flex-col justify-between rounded-md bg-slate-800"
      >
        <div className="relative z-10 flex justify-end pt-2 pr-2">
          <IconButton onClick={handleCloseModalBtnClick}>
            <CloseIcon />
          </IconButton>
        </div>
        <div className="h-full space-y-4 px-4 pb-6 shadow">
          <h2 className="font-bold">Invite friends to {server?.name} server</h2>
          <TextField
            value={searchText}
            onInput={setSearchText}
            placeholder="Search for friends"
            trailingIcon={<SearchIcon size={IconSize.sm} />}
          />
        </div>
        <div className="p-2">
          {filteredFriends.map((friend) => {
            return (
              <div
                key={friend.id}
                className="invite-btn flex items-center justify-between rounded-md py-2 px-4 hover:bg-slate-700"
              >
                <div className="flex items-center space-x-2">
                  <div className="h-8 w-8 rounded-full bg-red-600"></div>
                  <p>{friend.username}</p>
                </div>
                <button className="rounded border border-green-600 px-5 py-[0.35rem] text-xs font-medium text-white hover:bg-green-600">
                  Invite
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </Modal>
  );
};

export default InvitePeopleModal;
