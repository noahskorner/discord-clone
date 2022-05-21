import useApp from '../../../../../utils/hooks/use-app';
import Modal from '../../../../utils/modal';
import { KeyboardEvent, useState } from 'react';
import IconButton from '../../../../inputs/icon-button';
import { CloseIcon, IconSize, SearchIcon } from '../../../../icons';
import Spinner from '../../../../inputs/spinner';
import useServer from '../../../../../utils/hooks/use-server';
import TextField from '../../../../inputs/text-field';

const InvitePeopleModal = () => {
  const { showInvitePeopleModal, setShowInvitePeopleModal } = useApp();
  const { server } = useServer();
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');

  const handleCloseModalButtonClick = () => {
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
        <div className="relative z-10 flex justify-end pr-4 pt-4">
          <IconButton onClick={handleCloseModalButtonClick}>
            <CloseIcon />
          </IconButton>
        </div>
        <div className="space-y-4 px-4">
          <h2 className="font-bold">Invite friends to {server?.name} server</h2>
          <TextField
            placeholder="Search for friends"
            trailingIcon={<SearchIcon size={IconSize.sm} />}
          />
        </div>
        <div className="relative bottom-0 mt-8 flex w-full items-center justify-between rounded-b-md bg-slate-700 p-4">
          <button
            onClick={handleCloseModalButtonClick}
            className="px-4 py-2 text-sm font-medium text-slate-300 hover:text-white"
          >
            Close
          </button>
          <button className="flex items-center justify-center rounded-md bg-indigo-500 py-2 px-4 text-sm hover:bg-indigo-700">
            <span className={`${loading && 'opacity-0'}`}>Create</span>
            {loading && <Spinner size="sm" className="absolute" />}
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default InvitePeopleModal;
