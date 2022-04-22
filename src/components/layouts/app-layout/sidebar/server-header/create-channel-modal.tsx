import IconButton from '../../../../inputs/icon-button';
import Modal from '../../../../utils/modal';
import { ModalProps } from '../../../../utils/modal/modal';
import CloseIcon from '../../../../icons/close.svg';
import PoundIcon from '../../../../icons/pound.svg';
import React, { useState, KeyboardEvent } from 'react';
import Spinner from '../../../../inputs/spinner';
import TextField from '../../../../inputs/text-field';
import ChannelType from '../../../../../utils/enums/channel-type';
import ChannelTypeButtons from './channel-type-buttons';

interface CreateChannelModalProps extends ModalProps {}

const CreateChannelModal = ({
  showModal,
  setShowModal,
}: CreateChannelModalProps) => {
  const [channelName, setChannelName] = useState('new-channel');
  const [channelType, setChannelType] = useState(ChannelType.TEXT);
  const [loading, setLoading] = useState(false);

  const createChannel = async () => {};

  const handleChannelNameInput = (value: string) => {
    setChannelName(value);
  };
  const handleCloseModalButtonClick = () => {
    setShowModal(false);
  };
  const handleCreateChannelButtonClick = async () => {
    await createChannel();
  };
  const handleKeyDown = async (event: KeyboardEvent) => {
    if (event.key === 'Enter') await createChannel();
  };

  return (
    <Modal showModal={showModal} setShowModal={setShowModal}>
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
          <div className="relative -top-4 space-y-2 text-center">
            <h2 className="text-2xl font-extrabold capitalize">
              Create {channelType.toLowerCase()} Channel
            </h2>
          </div>
          <ChannelTypeButtons
            channelType={channelType}
            setChannelType={setChannelType}
          />
          <TextField
            label="Channel name"
            value={channelName}
            onInput={handleChannelNameInput}
            icon={<PoundIcon />}
          />
        </div>
        <div className="relative bottom-0 mt-8 flex w-full items-center justify-between rounded-b-md bg-slate-700 p-4">
          <button
            onClick={handleCloseModalButtonClick}
            className="px-4 py-2 text-sm font-medium text-slate-300"
          >
            Close
          </button>
          <button
            onClick={handleCreateChannelButtonClick}
            className="flex items-center justify-center rounded-md bg-indigo-500 py-2 px-4 text-sm hover:bg-indigo-700"
          >
            <span className={`${loading && 'opacity-0'}`}>Create</span>
            {loading && <Spinner size="sm" className="absolute" />}
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default CreateChannelModal;
