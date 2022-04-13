import useModal from '../../../utils/hooks/use-modal';
import useWindowSize from '../../../utils/hooks/use-window-size';
import Tooltip from '../../feedback/tooltip';
import LogoIcon from '../../icons/logo.svg';
import PlusIconSm from '../../icons/sm/plus.svg';
import PlusIcon from '../../icons/plus.svg';
import IconButton from '../../inputs/icon-button';
import CloseIcon from '../../icons/close.svg';
import CameraIcon from '../../icons/camera.svg';
import Modal from '../../utils/modal';
import TextField from '../../inputs/text-field';
import { useState } from 'react';
import useUser from '../../../utils/hooks/use-user';

const Servers = () => {
  const { heightStyle } = useWindowSize();
  const { showModal, setShowModal } = useModal();
  const { user } = useUser();
  const [serverName, setServerName] = useState(
    `${user?.username}'s server` ?? '',
  );
  const handleAddServerButtonClick = () => {
    setShowModal(true);
  };
  const handleCloseModalButtonClick = () => {
    setShowModal(false);
  };

  return (
    <div
      style={{ height: heightStyle }}
      className="w-servers bg-slate-900 space-y-2 scrollbar-none px-2 py-3 flex flex-col items-center relative z-40"
    >
      <Tooltip text="Home" direction="left">
        <button className="w-12 h-12 rounded-2xl bg-indigo-600 text-white flex justify-center items-center">
          <LogoIcon />
        </button>
      </Tooltip>
      <div className="w-8 h-[2px] bg-slate-800"></div>
      <div>
        <Tooltip text="Add a Server" direction="left">
          <button
            onClick={handleAddServerButtonClick}
            className="w-12 h-12 rounded-full hover:rounded-2xl bg-slate-800 text-green-600 hover:bg-green-600 hover:text-white flex justify-center items-center"
          >
            <PlusIcon />
          </button>
        </Tooltip>
        <Modal showModal={showModal} setShowModal={setShowModal}>
          <div
            onClick={(event) => event.stopPropagation()}
            className="w-full max-w-md bg-slate-800 rounded-md flex flex-col justify-between"
          >
            <div className="flex justify-end relative z-10 pr-4 pt-4">
              <IconButton onClick={handleCloseModalButtonClick}>
                <CloseIcon />
              </IconButton>
            </div>
            <div className="space-y-4 px-4">
              <div className="text-center space-y-2 relative -top-4">
                <h2 className="text-2xl font-extrabold">
                  Customise your server
                </h2>
                <p className="text-slate-300 text-sm">
                  Give your new server a personality with a name and an icon.
                  You can always change it later.
                </p>
              </div>
              <div className="flex justify-center">
                <button className="w-20 h-20 border border-slate-300 border-dashed rounded-full flex flex-col items-center justify-center text-slate-300 space-y-1 relative">
                  <CameraIcon />
                  <h6 className="text-xs uppercase font-bold">Upload</h6>
                  <span className="w-6 h-6 bg-indigo-600 flex justify-center items-center text-white rounded-full absolute -right-1 -top-1">
                    <PlusIconSm />
                  </span>
                </button>
              </div>
              <TextField
                label="Server name"
                value={serverName}
                onInput={setServerName}
              />
            </div>
            <div className="w-full p-4 bg-slate-700 relative bottom-0 mt-8 rounded-b-md flex justify-between items-center">
              <button
                onClick={handleCloseModalButtonClick}
                className="text-sm font-medium text-slate-300 px-4 py-2"
              >
                Close
              </button>
              <button className="py-2 px-4 bg-indigo-500 hover:bg-indigo-700 rounded-md text-sm">
                Create
              </button>
            </div>
          </div>
        </Modal>
      </div>
    </div>
  );
};

export default Servers;
